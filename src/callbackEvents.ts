import { EventSubscribeOptions, hexToString } from "@alephium/web3";
import {
  ForwardNameResolverTypes,
  ReverseNameResolverTypes,
} from "../artifacts/ts";
import { Op, Sequelize, where } from "sequelize";
import { Address, DbName } from "./models";
import { Name, createEntry, isValidName } from "./utils";
import { mutex } from "./eventsListener";

export const optionsMintActions: EventSubscribeOptions<
  ForwardNameResolverTypes.NameCreatedEvent &
    ForwardNameResolverTypes.NameDeletedEvent &
    ForwardNameResolverTypes.NameRenewedEvent
> = {
  // We specify the pollingInterval as 4 seconds, which will query the contract for new events every 4 seconds
  pollingInterval: 30,
  // The `messageCallback` will be called every time we recive a new event
  messageCallback: async (
    event: ForwardNameResolverTypes.NameCreatedEvent &
      ForwardNameResolverTypes.NameDeletedEvent &
      ForwardNameResolverTypes.NameRenewedEvent
  ): Promise<void> => {
    let creator;
    let expires;
    let capitalisation;

    let deleter;

    let renewer;
    let name = hexToString(event.fields.name);

    let nftIndex = event.fields.nftIndex;

    switch (event.name) {
      case "NameCreated":
        console.log(`New name minted ${name}`);

        creator = event.fields.creator;
        expires = event.fields.expires;
        capitalisation = hexToString(event.fields.capitalisation);

        const nameObject: Name = {
          name: name,
          address: creator,
          capitalisation: capitalisation,
          expires: expires,
        };

        if (!isValidName(nameObject)) return;

        await mutex.runExclusive(async () => {
          const [creatorId] = await Address.findOrCreate({
            where: { address: creator },
            defaults: { address: creator },
          });

          const defaultData = {
            nftIndex: nftIndex,
            name: name,
            capitalisation: capitalisation,
            creatorAddressId: creatorId.id,
            expires: Number(expires),
          };

          const [dbNameCreated, isCreated] = await createEntry(
            name,
            defaultData,
            nftIndex
          );
          if (!isCreated) {
              if(dbNameCreated.dataValues['expires'] < expires)
                delete defaultData['expires']

            dbNameCreated.update({
              defaultData,
            });
          }
        });

        break;
      case "NameDeleted":
        deleter = event.fields.deleter;
        console.log(`Name deleted ${name}`);
        const [deletorId] = await Address.findOrCreate({
          where: { address: deleter },
          defaults: { address: deleter },
        });

        const defaultDataDeleter = {
          nftIndex: nftIndex,
          name: name,
          deletetorAddressId: deletorId.id,
          isDeleted: true,
        };

        const [createDelete, isDeleteCreated] = await createEntry(
          name,
          defaultDataDeleter,
          nftIndex
        );

        if (!isDeleteCreated)
          createDelete.update({
            isDeleted: true,
            deletetorAddressId: deletorId.id,
          });

        break;

      case "NameRenewed":
        renewer = event.fields.renewer;
        expires = event.fields.expires;

        const [renewerId] = await Address.findOrCreate({
          where: { address: renewer },
          defaults: { address: renewer },
        });

        const defaultDataRenew = {
          nftIndex: nftIndex,
          name: name,
          expires: expires,
          renewerAddressId: renewerId.id,
        };

        const [nameIdRenew, isCreatedRenewAddr] = await createEntry(
          name,
          defaultDataRenew,
          nftIndex
        );

        if (!isCreatedRenewAddr)
          nameIdRenew.update({
            expires: expires,
            renewerAddressId: renewerId.id,
          });

        break;
      default:
        console.log(`event ${event.name} unknown`);
        break;
    }

    return Promise.resolve();
  },
  // The `errorCallback` will be called when an error occurs, here we unsubscribe the subscription and log the error
  errorCallback: (error, subscription): Promise<void> => {
    console.error(error);
    process.kill(process.pid);

    return Promise.resolve();
  },
};

export const optionsActionsAddress: EventSubscribeOptions<
  ForwardNameResolverTypes.CapitalisationSetEvent &
    ForwardNameResolverTypes.AddressSetEvent
> = {
  // We specify the pollingInterval as 4 seconds, which will query the contract for new events every 4 seconds
  pollingInterval: 30,
  // The `messageCallback` will be called every time we recive a new event
  messageCallback: async (
    event: ForwardNameResolverTypes.CapitalisationSetEvent &
      ForwardNameResolverTypes.AddressSetEvent
  ): Promise<void> => {
    let newCapitalisation;
    let newAddress;

    let name = hexToString(event.fields.name);

    let nftIndex = event.fields.nftIndex;
    let nameObject: Name;
    switch (event.name) {
      case "CapitalisationSet":
        newCapitalisation = hexToString(event.fields.newCapitalisation);
        console.log(`new capitalisation set: ${newCapitalisation} for ${name}`);

        nameObject = {
          name: name,
          address: "",
          capitalisation: newCapitalisation,
          expires: 0n,
        };
        if (!isValidName(nameObject)) return;

        const defaultDataCapitalisation = {
          nftIndex: nftIndex,
          name: name,
          capitalisation: newCapitalisation,
        };

        await mutex.runExclusive(async () => {
          const [nameCapitalisation, isCreatedCapitalisation] =
            await createEntry(name, defaultDataCapitalisation, nftIndex);

          if (!isCreatedCapitalisation)
            nameCapitalisation.update({ capitalisation: newCapitalisation });
        });
        break;

      case "AddressSet":
        newAddress = event.fields.newAddress;

        console.log(`new address set: ${newAddress} for ${name}`);

        await mutex.runExclusive(async () => {
          const [addrId] = await Address.findOrCreate({
            where: { address: newAddress },
            defaults: { address: newAddress },
          });

          const defaultDataSet = {
            nftIndex: nftIndex,
            name: name,
            linkedAddressId: addrId.id,
          };

          const [newAddressSet, created] = await createEntry(
            name,
            defaultDataSet,
            nftIndex
          );

          if (!created) newAddressSet.update({ linkedAddressId: addrId.id });
        });
        break;

      default:
        console.log(`event ${event.name} unknown`);
        break;
    }

    return Promise.resolve();
  },
  // The `errorCallback` will be called when an error occurs, here we unsubscribe the subscription and log the error
  errorCallback: (error, subscription): Promise<void> => {
    console.error(error);
    process.kill(process.pid);

    return Promise.resolve();
  },
};

export const optionsReverse: EventSubscribeOptions<
  ReverseNameResolverTypes.ReverseAddressSetEvent &
    ReverseNameResolverTypes.ReverseAddressDeletedEvent
> = {
  // We specify the pollingInterval as 4 seconds, which will query the contract for new events every 4 seconds
  pollingInterval: 30,
  // The `messageCallback` will be called every time we recive a new event
  messageCallback: async (
    event: ReverseNameResolverTypes.ReverseAddressSetEvent &
      ReverseNameResolverTypes.ReverseAddressDeletedEvent
  ): Promise<void> => {
    let newName: string;
    let name: string;

    let address = event.fields.address;

    switch (event.name) {
      case "ReverseAddressSet":
        newName = hexToString(event.fields.newName);
        console.log(`Reverse Address Set ${newName} for ${address}`);

        await mutex.runExclusive(async () => {
          const [addrId] = await Address.findOrCreate({
            where: { address: address },
            defaults: { address: address },
          });

          const defaultDataReverse = {
            name: newName,
            reverseLinkedAddressId: addrId.id,
          };
          const [reverseSet, isCreatedReverseSet] = await createEntry(
            newName,
            defaultDataReverse
          );
          if (!isCreatedReverseSet)
            reverseSet.update({ reverseLinkedAddressId: addrId.id });
        });

        break;

      case "ReverseAddressDeleted":
        name = hexToString(event.fields.name);
        await mutex.runExclusive(async () => {
          const [addrIdDeleted] = await Address.findOrCreate({
            where: { address: address },
            defaults: { address: address },
          });

          const defaultDataReverseDeleted = {
            name: name,
            reverseLinkedAddressId: null,
          };

          const [reverseDelete, isCreatedDelete] = await createEntry(
            name,
            defaultDataReverseDeleted
          );

          if (!isCreatedDelete)
            reverseDelete.update({ reverseLinkedAddressId: null });
        });
        break;

      default:
        console.log(`event ${event.name} unknown`);
        break;
    }

    return Promise.resolve();
  },
  // The `errorCallback` will be called when an error occurs, here we unsubscribe the subscription and log the error
  errorCallback: (error, subscription): Promise<void> => {
    console.error(error);
    process.kill(process.pid);

    return Promise.resolve();
  },
};
