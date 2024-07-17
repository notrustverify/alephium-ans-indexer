"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReverseNameResolverInstance = exports.ReverseNameResolver = void 0;
const web3_1 = require("@alephium/web3");
const ReverseNameResolver_ral_json_1 = __importDefault(require("../reverse_name_resolver/ReverseNameResolver.ral.json"));
const contracts_1 = require("./contracts");
const types_1 = require("./types");
const web3_2 = require("@alephium/web3");
class Factory extends web3_1.ContractFactory {
    encodeFields() {
        return (0, web3_1.encodeContractFields)({}, this.contract.fieldsSig, types_1.AllStructs);
    }
    eventIndex = {
        NameCreated: 0,
        NameRenewed: 1,
        AddressSet: 2,
        CapitalisationSet: 3,
        NameDeleted: 4,
        ReverseAddressSet: 5,
        ReverseAddressDeleted: 6,
        CropCreated: 7,
        CropDeleted: 8,
    };
    consts = {
        ErrorCodes: {
            OnlyParentAllowed: BigInt("0"),
            NFTNotFound: BigInt("1"),
            NFTNotPartOfCollection: BigInt("2"),
            OnlyNftOwnerAllowed: BigInt("3"),
            NameHasNotExpired: BigInt("4"),
            CannotRenewName: BigInt("5"),
            TokenAlreadyGenerated: BigInt("6"),
            ReverseAddressNotFound: BigInt("7"),
            OnlyNftOwnerOrHolderAllowed: BigInt("8"),
            IncorrectFarmInputAmount: BigInt("9"),
            CropHasNotExpired: BigInt("10"),
            FarmInputAmountNotConsumed: BigInt("11"),
            FarmAlreadyGenerated: BigInt("12"),
        },
        Keys: { Names: "01", Token: "02", Farm: "03" },
    };
    at(address) {
        return new ReverseNameResolverInstance(address);
    }
    tests = {
        getNameByAddress: async (params) => {
            return (0, web3_1.testMethod)(this, "getNameByAddress", params, contracts_1.getContractByCodeHash);
        },
        containsNameByAddress: async (params) => {
            return (0, web3_1.testMethod)(this, "containsNameByAddress", params, contracts_1.getContractByCodeHash);
        },
        setAddressName: async (params) => {
            return (0, web3_1.testMethod)(this, "setAddressName", params, contracts_1.getContractByCodeHash);
        },
        removeAddress: async (params) => {
            return (0, web3_1.testMethod)(this, "removeAddress", params === undefined ? {} : params, contracts_1.getContractByCodeHash);
        },
    };
}
// Use this object to test and deploy the contract
exports.ReverseNameResolver = new Factory(web3_1.Contract.fromJson(ReverseNameResolver_ral_json_1.default, "=14-2+b6=1-3+129=141-1+5=107-1+c=40+7a7e0214696e73657274206174206d617020706174683a2000=37-1+4=146+7a7e021472656d6f7665206174206d617020706174683a2000=20", "57983c35b982d4623e6ac3dd4406f25e4c4e3f20715733488625a08d47f22fd5", types_1.AllStructs));
// Use this class to interact with the blockchain
class ReverseNameResolverInstance extends web3_1.ContractInstance {
    constructor(address) {
        super(address);
    }
    maps = {
        addressNames: new web3_2.RalphMap(exports.ReverseNameResolver.contract, this.contractId, "addressNames"),
    };
    async fetchState() {
        return (0, web3_1.fetchContractState)(exports.ReverseNameResolver, this);
    }
    async getContractEventsCurrentCount() {
        return (0, web3_1.getContractEventsCurrentCount)(this.address);
    }
    subscribeNameCreatedEvent(options, fromCount) {
        return (0, web3_1.subscribeContractEvent)(exports.ReverseNameResolver.contract, this, options, "NameCreated", fromCount);
    }
    subscribeNameRenewedEvent(options, fromCount) {
        return (0, web3_1.subscribeContractEvent)(exports.ReverseNameResolver.contract, this, options, "NameRenewed", fromCount);
    }
    subscribeAddressSetEvent(options, fromCount) {
        return (0, web3_1.subscribeContractEvent)(exports.ReverseNameResolver.contract, this, options, "AddressSet", fromCount);
    }
    subscribeCapitalisationSetEvent(options, fromCount) {
        return (0, web3_1.subscribeContractEvent)(exports.ReverseNameResolver.contract, this, options, "CapitalisationSet", fromCount);
    }
    subscribeNameDeletedEvent(options, fromCount) {
        return (0, web3_1.subscribeContractEvent)(exports.ReverseNameResolver.contract, this, options, "NameDeleted", fromCount);
    }
    subscribeReverseAddressSetEvent(options, fromCount) {
        return (0, web3_1.subscribeContractEvent)(exports.ReverseNameResolver.contract, this, options, "ReverseAddressSet", fromCount);
    }
    subscribeReverseAddressDeletedEvent(options, fromCount) {
        return (0, web3_1.subscribeContractEvent)(exports.ReverseNameResolver.contract, this, options, "ReverseAddressDeleted", fromCount);
    }
    subscribeCropCreatedEvent(options, fromCount) {
        return (0, web3_1.subscribeContractEvent)(exports.ReverseNameResolver.contract, this, options, "CropCreated", fromCount);
    }
    subscribeCropDeletedEvent(options, fromCount) {
        return (0, web3_1.subscribeContractEvent)(exports.ReverseNameResolver.contract, this, options, "CropDeleted", fromCount);
    }
    subscribeAllEvents(options, fromCount) {
        return (0, web3_1.subscribeContractEvents)(exports.ReverseNameResolver.contract, this, options, fromCount);
    }
    view = {
        getNameByAddress: async (params) => {
            return (0, web3_1.callMethod)(exports.ReverseNameResolver, this, "getNameByAddress", params, contracts_1.getContractByCodeHash);
        },
        containsNameByAddress: async (params) => {
            return (0, web3_1.callMethod)(exports.ReverseNameResolver, this, "containsNameByAddress", params, contracts_1.getContractByCodeHash);
        },
        setAddressName: async (params) => {
            return (0, web3_1.callMethod)(exports.ReverseNameResolver, this, "setAddressName", params, contracts_1.getContractByCodeHash);
        },
        removeAddress: async (params) => {
            return (0, web3_1.callMethod)(exports.ReverseNameResolver, this, "removeAddress", params === undefined ? {} : params, contracts_1.getContractByCodeHash);
        },
    };
    transact = {
        getNameByAddress: async (params) => {
            return (0, web3_1.signExecuteMethod)(exports.ReverseNameResolver, this, "getNameByAddress", params);
        },
        containsNameByAddress: async (params) => {
            return (0, web3_1.signExecuteMethod)(exports.ReverseNameResolver, this, "containsNameByAddress", params);
        },
        setAddressName: async (params) => {
            return (0, web3_1.signExecuteMethod)(exports.ReverseNameResolver, this, "setAddressName", params);
        },
        removeAddress: async (params) => {
            return (0, web3_1.signExecuteMethod)(exports.ReverseNameResolver, this, "removeAddress", params);
        },
    };
    async multicall(calls) {
        return (await (0, web3_1.multicallMethods)(exports.ReverseNameResolver, this, calls, contracts_1.getContractByCodeHash));
    }
}
exports.ReverseNameResolverInstance = ReverseNameResolverInstance;