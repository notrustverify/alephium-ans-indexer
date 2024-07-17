"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutex = void 0;
const web3_1 = require("@alephium/web3");
const config_1 = __importDefault(require("../config"));
const ts_1 = require("../artifacts/ts");
const callbackEvents_1 = require("./callbackEvents");
const database_1 = require("./database");
const models_1 = require("./models");
const async_mutex_1 = require("async-mutex");
const utils_1 = require("./utils");
const config = (0, config_1.default)();
web3_1.web3.setCurrentNodeProvider(config.NODE_URL);
console.log(config.NODE_URL);
const nodeProvider = web3_1.web3.getCurrentNodeProvider();
exports.mutex = new async_mutex_1.Mutex();
function loadForwardResolver() {
    return ts_1.ForwardNameResolver.at((0, web3_1.addressFromContractId)(config.FORWARD_NAME_RESOLVER_ID));
}
function loadReverseResolvers() {
    let reverseResolvers = new Array(4);
    reverseResolvers[0] =
        config.REVERSE_NAME_RESOLVER_ID_0 === ""
            ? undefined
            : ts_1.ReverseNameResolver.at((0, web3_1.addressFromContractId)(config.REVERSE_NAME_RESOLVER_ID_0));
    reverseResolvers[1] =
        config.REVERSE_NAME_RESOLVER_ID_1 === ""
            ? undefined
            : ts_1.ReverseNameResolver.at((0, web3_1.addressFromContractId)(config.REVERSE_NAME_RESOLVER_ID_1));
    reverseResolvers[2] =
        config.REVERSE_NAME_RESOLVER_ID_2 === ""
            ? undefined
            : ts_1.ReverseNameResolver.at((0, web3_1.addressFromContractId)(config.REVERSE_NAME_RESOLVER_ID_2));
    reverseResolvers[3] =
        config.REVERSE_NAME_RESOLVER_ID_3 === ""
            ? undefined
            : ts_1.ReverseNameResolver.at((0, web3_1.addressFromContractId)(config.REVERSE_NAME_RESOLVER_ID_3));
    return reverseResolvers;
}
async function listenerManager(sequelize) {
    console.log("Start event listener");
    let forwardNameResolver = loadForwardResolver();
    let reverseResolvers = loadReverseResolvers();
    const forwardNameCount = await forwardNameResolver.getContractEventsCurrentCount();
    console.log(`Events from contract ${forwardNameCount}`);
    const numEventTotal = await (0, utils_1.getAndUpdateCounterEvent)(utils_1.contractType.forwardName, forwardNameResolver.groupIndex, forwardNameCount);
    forwardNameResolver.subscribeNameCreatedEvent(callbackEvents_1.optionsMintActions, numEventTotal);
    forwardNameResolver.subscribeNameDeletedEvent(callbackEvents_1.optionsMintActions, numEventTotal);
    forwardNameResolver.subscribeNameRenewedEvent(callbackEvents_1.optionsMintActions, numEventTotal);
    if (numEventTotal <= 0)
        await (0, web3_1.sleep)(30 * 1000);
    forwardNameResolver.subscribeAddressSetEvent(callbackEvents_1.optionsActionsAddress, numEventTotal);
    forwardNameResolver.subscribeCapitalisationSetEvent(callbackEvents_1.optionsActionsAddress, numEventTotal);
    if (numEventTotal <= 0)
        await (0, web3_1.sleep)(30 * 1000);
    reverseResolvers.forEach(async (element) => {
        `Events from contract ${await element.getContractEventsCurrentCount()}`;
        const reverseNameCount = await element.getContractEventsCurrentCount();
        const numEventTotal = await (0, utils_1.getAndUpdateCounterEvent)(utils_1.contractType.reverseName, element.groupIndex, reverseNameCount);
        element.subscribeReverseAddressDeletedEvent(callbackEvents_1.optionsReverse, numEventTotal);
        element.subscribeReverseAddressSetEvent(callbackEvents_1.optionsReverse, numEventTotal);
    });
}
async function startDb() {
    const sequelize = await (0, database_1.connection)();
    (0, models_1.initDb)(sequelize, process.env.FORCE_REINIT === 'true' ?? false);
    return sequelize;
}
startDb().then((sequelize) => listenerManager(sequelize));
