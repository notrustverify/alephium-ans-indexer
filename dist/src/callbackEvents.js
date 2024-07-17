"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionsReverse = exports.optionsActionsAddress = exports.optionsMintActions = void 0;
const web3_1 = require("@alephium/web3");
const models_1 = require("./models");
const utils_1 = require("./utils");
const eventsListener_1 = require("./eventsListener");
exports.optionsMintActions = {
    // We specify the pollingInterval as 4 seconds, which will query the contract for new events every 4 seconds
    pollingInterval: 30,
    // The `messageCallback` will be called every time we recive a new event
    messageCallback: async (event) => {
        let creator;
        let expires;
        let capitalisation;
        let deleter;
        let renewer;
        let name = (0, web3_1.hexToString)(event.fields.name);
        let nftIndex = event.fields.nftIndex;
        switch (event.name) {
            case "NameCreated":
                console.log(`New name minted ${name}`);
                creator = event.fields.creator;
                expires = event.fields.expires;
                capitalisation = (0, web3_1.hexToString)(event.fields.capitalisation);
                const nameObject = {
                    name: name,
                    address: creator,
                    capitalisation: capitalisation,
                    expires: expires,
                };
                if (!(0, utils_1.isValidName)(nameObject))
                    return;
                await eventsListener_1.mutex.runExclusive(async () => {
                    const [creatorId] = await models_1.Address.findOrCreate({
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
                    const [dbNameCreated, isCreated] = await (0, utils_1.createEntry)(name, defaultData, nftIndex);
                    if (!isCreated) {
                        if (dbNameCreated.dataValues['expires'] < expires)
                            delete defaultData['expires'];
                        dbNameCreated.update({
                            defaultData,
                        });
                    }
                });
                break;
            case "NameDeleted":
                deleter = event.fields.deleter;
                console.log(`Name deleted ${name}`);
                const [deletorId] = await models_1.Address.findOrCreate({
                    where: { address: deleter },
                    defaults: { address: deleter },
                });
                const defaultDataDeleter = {
                    nftIndex: nftIndex,
                    name: name,
                    deletetorAddressId: deletorId.id,
                    isDeleted: true,
                };
                const [createDelete, isDeleteCreated] = await (0, utils_1.createEntry)(name, defaultDataDeleter, nftIndex);
                if (!isDeleteCreated)
                    createDelete.update({
                        isDeleted: true,
                        deletetorAddressId: deletorId.id,
                    });
                break;
            case "NameRenewed":
                renewer = event.fields.renewer;
                expires = event.fields.expires;
                const [renewerId] = await models_1.Address.findOrCreate({
                    where: { address: renewer },
                    defaults: { address: renewer },
                });
                const defaultDataRenew = {
                    nftIndex: nftIndex,
                    name: name,
                    expires: expires,
                    renewerAddressId: renewerId.id,
                };
                const [nameIdRenew, isCreatedRenewAddr] = await (0, utils_1.createEntry)(name, defaultDataRenew, nftIndex);
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
    errorCallback: (error, subscription) => {
        console.error(error);
        process.kill(process.pid);
        return Promise.resolve();
    },
};
exports.optionsActionsAddress = {
    // We specify the pollingInterval as 4 seconds, which will query the contract for new events every 4 seconds
    pollingInterval: 30,
    // The `messageCallback` will be called every time we recive a new event
    messageCallback: async (event) => {
        let newCapitalisation;
        let newAddress;
        let name = (0, web3_1.hexToString)(event.fields.name);
        let nftIndex = event.fields.nftIndex;
        let nameObject;
        switch (event.name) {
            case "CapitalisationSet":
                newCapitalisation = (0, web3_1.hexToString)(event.fields.newCapitalisation);
                console.log(`new capitalisation set: ${newCapitalisation} for ${name}`);
                nameObject = {
                    name: name,
                    address: "",
                    capitalisation: newCapitalisation,
                    expires: 0n,
                };
                if (!(0, utils_1.isValidName)(nameObject))
                    return;
                const defaultDataCapitalisation = {
                    nftIndex: nftIndex,
                    name: name,
                    capitalisation: newCapitalisation,
                };
                await eventsListener_1.mutex.runExclusive(async () => {
                    const [nameCapitalisation, isCreatedCapitalisation] = await (0, utils_1.createEntry)(name, defaultDataCapitalisation, nftIndex);
                    if (!isCreatedCapitalisation)
                        nameCapitalisation.update({ capitalisation: newCapitalisation });
                });
                break;
            case "AddressSet":
                newAddress = event.fields.newAddress;
                console.log(`new address set: ${newAddress} for ${name}`);
                await eventsListener_1.mutex.runExclusive(async () => {
                    const [addrId] = await models_1.Address.findOrCreate({
                        where: { address: newAddress },
                        defaults: { address: newAddress },
                    });
                    const defaultDataSet = {
                        nftIndex: nftIndex,
                        name: name,
                        linkedAddressId: addrId.id,
                    };
                    const [newAddressSet, created] = await (0, utils_1.createEntry)(name, defaultDataSet, nftIndex);
                    if (!created)
                        newAddressSet.update({ linkedAddressId: addrId.id });
                });
                break;
            default:
                console.log(`event ${event.name} unknown`);
                break;
        }
        return Promise.resolve();
    },
    // The `errorCallback` will be called when an error occurs, here we unsubscribe the subscription and log the error
    errorCallback: (error, subscription) => {
        console.error(error);
        process.kill(process.pid);
        return Promise.resolve();
    },
};
exports.optionsReverse = {
    // We specify the pollingInterval as 4 seconds, which will query the contract for new events every 4 seconds
    pollingInterval: 30,
    // The `messageCallback` will be called every time we recive a new event
    messageCallback: async (event) => {
        let newName;
        let name;
        let address = event.fields.address;
        switch (event.name) {
            case "ReverseAddressSet":
                newName = (0, web3_1.hexToString)(event.fields.newName);
                console.log(`Reverse Address Set ${newName} for ${address}`);
                await eventsListener_1.mutex.runExclusive(async () => {
                    const [addrId] = await models_1.Address.findOrCreate({
                        where: { address: address },
                        defaults: { address: address },
                    });
                    const defaultDataReverse = {
                        name: newName,
                        reverseLinkedAddressId: addrId.id,
                    };
                    const [reverseSet, isCreatedReverseSet] = await (0, utils_1.createEntry)(newName, defaultDataReverse);
                    if (!isCreatedReverseSet)
                        reverseSet.update({ reverseLinkedAddressId: addrId.id });
                });
                break;
            case "ReverseAddressDeleted":
                name = (0, web3_1.hexToString)(event.fields.name);
                await eventsListener_1.mutex.runExclusive(async () => {
                    const [addrIdDeleted] = await models_1.Address.findOrCreate({
                        where: { address: address },
                        defaults: { address: address },
                    });
                    const defaultDataReverseDeleted = {
                        name: name,
                        reverseLinkedAddressId: null,
                    };
                    const [reverseDelete, isCreatedDelete] = await (0, utils_1.createEntry)(name, defaultDataReverseDeleted);
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
    errorCallback: (error, subscription) => {
        console.error(error);
        process.kill(process.pid);
        return Promise.resolve();
    },
};
