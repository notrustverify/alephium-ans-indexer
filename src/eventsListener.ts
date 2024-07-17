import { addressFromContractId, node, sleep, web3 } from "@alephium/web3";
import { PrivateKeyWallet } from "@alephium/web3-wallet";
import getConfig from "../config";
import {
  ForwardNameResolver,
  ForwardNameResolverInstance,
  ReverseNameResolver,
  ReverseNameResolverInstance,
} from "../artifacts/ts";
import {
  optionsActionsAddress,
  optionsMintActions,
  optionsReverse,
} from "./callbackEvents";
import { connection } from "./database";
import { DbName, Event, initDb } from "./models";
import { Sequelize } from "sequelize";
import { Mutex } from "async-mutex";
import { contractType, getAndUpdateCounterEvent } from "./utils";

const config = getConfig();
web3.setCurrentNodeProvider(config.NODE_URL);
console.log(config.NODE_URL);
const nodeProvider = web3.getCurrentNodeProvider();
export const mutex = new Mutex();

function loadForwardResolver(): ForwardNameResolverInstance {
  return ForwardNameResolver.at(
    addressFromContractId(config.FORWARD_NAME_RESOLVER_ID)
  );
}

function loadReverseResolvers(): ReverseNameResolverInstance[] {
  let reverseResolvers: ReverseNameResolverInstance[] = new Array(4);
  reverseResolvers[0] =
    config.REVERSE_NAME_RESOLVER_ID_0 === ""
      ? undefined
      : ReverseNameResolver.at(
          addressFromContractId(config.REVERSE_NAME_RESOLVER_ID_0)
        );
  reverseResolvers[1] =
    config.REVERSE_NAME_RESOLVER_ID_1 === ""
      ? undefined
      : ReverseNameResolver.at(
          addressFromContractId(config.REVERSE_NAME_RESOLVER_ID_1)
        );
  reverseResolvers[2] =
    config.REVERSE_NAME_RESOLVER_ID_2 === ""
      ? undefined
      : ReverseNameResolver.at(
          addressFromContractId(config.REVERSE_NAME_RESOLVER_ID_2)
        );
  reverseResolvers[3] =
    config.REVERSE_NAME_RESOLVER_ID_3 === ""
      ? undefined
      : ReverseNameResolver.at(
          addressFromContractId(config.REVERSE_NAME_RESOLVER_ID_3)
        );

  return reverseResolvers;
}

async function listenerManager(sequelize: Sequelize) {
  console.log("Start event listener");

  let forwardNameResolver = loadForwardResolver();
  let reverseResolvers = loadReverseResolvers();

  const forwardNameCount =
    await forwardNameResolver.getContractEventsCurrentCount();
  console.log(`Events from contract ${forwardNameCount}`);

  const numEventTotal = await getAndUpdateCounterEvent(contractType.forwardName, forwardNameResolver.groupIndex, forwardNameCount)


  forwardNameResolver.subscribeNameCreatedEvent(optionsMintActions, numEventTotal);
  forwardNameResolver.subscribeNameDeletedEvent(optionsMintActions, numEventTotal);
  forwardNameResolver.subscribeNameRenewedEvent(optionsMintActions, numEventTotal);
  
  if(numEventTotal <= 0)
    await sleep(30 * 1000);

  forwardNameResolver.subscribeAddressSetEvent(optionsActionsAddress, numEventTotal);
  forwardNameResolver.subscribeCapitalisationSetEvent(optionsActionsAddress, numEventTotal);

  if(numEventTotal <= 0)
    await sleep(30 * 1000);
  
  reverseResolvers.forEach(async (element) => {
    `Events from contract ${await element.getContractEventsCurrentCount()}`;

    const reverseNameCount = await element.getContractEventsCurrentCount()

    const numEventTotal = await getAndUpdateCounterEvent(contractType.reverseName, element.groupIndex, reverseNameCount)
    element.subscribeReverseAddressDeletedEvent(optionsReverse, numEventTotal);
    element.subscribeReverseAddressSetEvent(optionsReverse, numEventTotal);
  });
}

async function startDb() {
  const sequelize = await connection();
  initDb(sequelize, process.env.FORCE_REINIT === 'true' ?? false);

  return sequelize
}

startDb().then((sequelize) => listenerManager(sequelize))
