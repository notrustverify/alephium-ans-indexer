"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CropInstance = exports.Crop = void 0;
const web3_1 = require("@alephium/web3");
const Crop_ral_json_1 = __importDefault(require("../farm/Crop.ral.json"));
const contracts_1 = require("./contracts");
const types_1 = require("./types");
class Factory extends web3_1.ContractFactory {
    encodeFields(fields) {
        return (0, web3_1.encodeContractFields)((0, web3_1.addStdIdToFields)(this.contract, fields), this.contract.fieldsSig, types_1.AllStructs);
    }
    getInitialFieldsWithDefaultValues() {
        return this.contract.getInitialFieldsWithDefaultValues();
    }
    eventIndex = { MetadataUpdated: 0 };
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
        return new CropInstance(address);
    }
    tests = {
        getTokenUri: async (params) => {
            return (0, web3_1.testMethod)(this, "getTokenUri", params, contracts_1.getContractByCodeHash);
        },
        getCollectionIndex: async (params) => {
            return (0, web3_1.testMethod)(this, "getCollectionIndex", params, contracts_1.getContractByCodeHash);
        },
        getName: async (params) => {
            return (0, web3_1.testMethod)(this, "getName", params, contracts_1.getContractByCodeHash);
        },
        getDescription: async (params) => {
            return (0, web3_1.testMethod)(this, "getDescription", params, contracts_1.getContractByCodeHash);
        },
        getImage: async (params) => {
            return (0, web3_1.testMethod)(this, "getImage", params, contracts_1.getContractByCodeHash);
        },
        getTraitCount: async (params) => {
            return (0, web3_1.testMethod)(this, "getTraitCount", params, contracts_1.getContractByCodeHash);
        },
        getTraitAtIndex: async (params) => {
            return (0, web3_1.testMethod)(this, "getTraitAtIndex", params, contracts_1.getContractByCodeHash);
        },
        getNFTIndex: async (params) => {
            return (0, web3_1.testMethod)(this, "getNFTIndex", params, contracts_1.getContractByCodeHash);
        },
        getExpires: async (params) => {
            return (0, web3_1.testMethod)(this, "getExpires", params, contracts_1.getContractByCodeHash);
        },
        getAlphAmount: async (params) => {
            return (0, web3_1.testMethod)(this, "getAlphAmount", params, contracts_1.getContractByCodeHash);
        },
        setExpires: async (params) => {
            return (0, web3_1.testMethod)(this, "setExpires", params, contracts_1.getContractByCodeHash);
        },
        delete: async (params) => {
            return (0, web3_1.testMethod)(this, "delete", params, contracts_1.getContractByCodeHash);
        },
        getTraits: async (params) => {
            return (0, web3_1.testMethod)(this, "getTraits", params, contracts_1.getContractByCodeHash);
        },
    };
}
// Use this object to test and deploy the contract
exports.Crop = new Factory(web3_1.Contract.fromJson(Crop_ral_json_1.default, "", "1b2f163495ed25072e283e298f15097b0299fd16e910722521cda99deeb877a0", types_1.AllStructs));
// Use this class to interact with the blockchain
class CropInstance extends web3_1.ContractInstance {
    constructor(address) {
        super(address);
    }
    async fetchState() {
        return (0, web3_1.fetchContractState)(exports.Crop, this);
    }
    async getContractEventsCurrentCount() {
        return (0, web3_1.getContractEventsCurrentCount)(this.address);
    }
    subscribeMetadataUpdatedEvent(options, fromCount) {
        return (0, web3_1.subscribeContractEvent)(exports.Crop.contract, this, options, "MetadataUpdated", fromCount);
    }
    view = {
        getTokenUri: async (params) => {
            return (0, web3_1.callMethod)(exports.Crop, this, "getTokenUri", params === undefined ? {} : params, contracts_1.getContractByCodeHash);
        },
        getCollectionIndex: async (params) => {
            return (0, web3_1.callMethod)(exports.Crop, this, "getCollectionIndex", params === undefined ? {} : params, contracts_1.getContractByCodeHash);
        },
        getName: async (params) => {
            return (0, web3_1.callMethod)(exports.Crop, this, "getName", params === undefined ? {} : params, contracts_1.getContractByCodeHash);
        },
        getDescription: async (params) => {
            return (0, web3_1.callMethod)(exports.Crop, this, "getDescription", params === undefined ? {} : params, contracts_1.getContractByCodeHash);
        },
        getImage: async (params) => {
            return (0, web3_1.callMethod)(exports.Crop, this, "getImage", params === undefined ? {} : params, contracts_1.getContractByCodeHash);
        },
        getTraitCount: async (params) => {
            return (0, web3_1.callMethod)(exports.Crop, this, "getTraitCount", params === undefined ? {} : params, contracts_1.getContractByCodeHash);
        },
        getTraitAtIndex: async (params) => {
            return (0, web3_1.callMethod)(exports.Crop, this, "getTraitAtIndex", params, contracts_1.getContractByCodeHash);
        },
        getNFTIndex: async (params) => {
            return (0, web3_1.callMethod)(exports.Crop, this, "getNFTIndex", params === undefined ? {} : params, contracts_1.getContractByCodeHash);
        },
        getExpires: async (params) => {
            return (0, web3_1.callMethod)(exports.Crop, this, "getExpires", params === undefined ? {} : params, contracts_1.getContractByCodeHash);
        },
        getAlphAmount: async (params) => {
            return (0, web3_1.callMethod)(exports.Crop, this, "getAlphAmount", params === undefined ? {} : params, contracts_1.getContractByCodeHash);
        },
        setExpires: async (params) => {
            return (0, web3_1.callMethod)(exports.Crop, this, "setExpires", params, contracts_1.getContractByCodeHash);
        },
        delete: async (params) => {
            return (0, web3_1.callMethod)(exports.Crop, this, "delete", params, contracts_1.getContractByCodeHash);
        },
        getTraits: async (params) => {
            return (0, web3_1.callMethod)(exports.Crop, this, "getTraits", params === undefined ? {} : params, contracts_1.getContractByCodeHash);
        },
    };
    transact = {
        getTokenUri: async (params) => {
            return (0, web3_1.signExecuteMethod)(exports.Crop, this, "getTokenUri", params);
        },
        getCollectionIndex: async (params) => {
            return (0, web3_1.signExecuteMethod)(exports.Crop, this, "getCollectionIndex", params);
        },
        getName: async (params) => {
            return (0, web3_1.signExecuteMethod)(exports.Crop, this, "getName", params);
        },
        getDescription: async (params) => {
            return (0, web3_1.signExecuteMethod)(exports.Crop, this, "getDescription", params);
        },
        getImage: async (params) => {
            return (0, web3_1.signExecuteMethod)(exports.Crop, this, "getImage", params);
        },
        getTraitCount: async (params) => {
            return (0, web3_1.signExecuteMethod)(exports.Crop, this, "getTraitCount", params);
        },
        getTraitAtIndex: async (params) => {
            return (0, web3_1.signExecuteMethod)(exports.Crop, this, "getTraitAtIndex", params);
        },
        getNFTIndex: async (params) => {
            return (0, web3_1.signExecuteMethod)(exports.Crop, this, "getNFTIndex", params);
        },
        getExpires: async (params) => {
            return (0, web3_1.signExecuteMethod)(exports.Crop, this, "getExpires", params);
        },
        getAlphAmount: async (params) => {
            return (0, web3_1.signExecuteMethod)(exports.Crop, this, "getAlphAmount", params);
        },
        setExpires: async (params) => {
            return (0, web3_1.signExecuteMethod)(exports.Crop, this, "setExpires", params);
        },
        delete: async (params) => {
            return (0, web3_1.signExecuteMethod)(exports.Crop, this, "delete", params);
        },
        getTraits: async (params) => {
            return (0, web3_1.signExecuteMethod)(exports.Crop, this, "getTraits", params);
        },
    };
    async multicall(calls) {
        return (await (0, web3_1.multicallMethods)(exports.Crop, this, calls, contracts_1.getContractByCodeHash));
    }
}
exports.CropInstance = CropInstance;
