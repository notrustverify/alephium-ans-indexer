/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Address,
  Contract,
  ContractState,
  TestContractResult,
  HexString,
  ContractFactory,
  EventSubscribeOptions,
  EventSubscription,
  CallContractParams,
  CallContractResult,
  TestContractParams,
  ContractEvent,
  subscribeContractEvent,
  subscribeContractEvents,
  testMethod,
  callMethod,
  multicallMethods,
  fetchContractState,
  ContractInstance,
  getContractEventsCurrentCount,
  TestContractParamsWithoutMaps,
  TestContractResultWithoutMaps,
  SignExecuteContractMethodParams,
  SignExecuteScriptTxResult,
  signExecuteMethod,
  addStdIdToFields,
  encodeContractFields,
} from "@alephium/web3";
import { default as RewardTokenContractJson } from "../forward_name_resolver/RewardToken.ral.json";
import { getContractByCodeHash } from "./contracts";
import { Trait, AllStructs } from "./types";

// Custom types for the contract
export namespace RewardTokenTypes {
  export type Fields = {
    parentId: HexString;
    symbol: HexString;
    name: HexString;
    decimals: bigint;
    totalSupply: bigint;
  };

  export type State = ContractState<Fields>;

  export interface CallMethodTable {
    getSymbol: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    getName: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    getDecimals: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getTotalSupply: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    mintTokens: {
      params: CallContractParams<{ to: Address; amount: bigint }>;
      result: CallContractResult<null>;
    };
    burnTokens: {
      params: CallContractParams<{ from: Address; amount: bigint }>;
      result: CallContractResult<null>;
    };
  }
  export type CallMethodParams<T extends keyof CallMethodTable> =
    CallMethodTable[T]["params"];
  export type CallMethodResult<T extends keyof CallMethodTable> =
    CallMethodTable[T]["result"];
  export type MultiCallParams = Partial<{
    [Name in keyof CallMethodTable]: CallMethodTable[Name]["params"];
  }>;
  export type MultiCallResults<T extends MultiCallParams> = {
    [MaybeName in keyof T]: MaybeName extends keyof CallMethodTable
      ? CallMethodTable[MaybeName]["result"]
      : undefined;
  };

  export interface SignExecuteMethodTable {
    getSymbol: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getName: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getDecimals: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getTotalSupply: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    mintTokens: {
      params: SignExecuteContractMethodParams<{ to: Address; amount: bigint }>;
      result: SignExecuteScriptTxResult;
    };
    burnTokens: {
      params: SignExecuteContractMethodParams<{
        from: Address;
        amount: bigint;
      }>;
      result: SignExecuteScriptTxResult;
    };
  }
  export type SignExecuteMethodParams<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["params"];
  export type SignExecuteMethodResult<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["result"];
}

class Factory extends ContractFactory<
  RewardTokenInstance,
  RewardTokenTypes.Fields
> {
  encodeFields(fields: RewardTokenTypes.Fields) {
    return encodeContractFields(
      addStdIdToFields(this.contract, fields),
      this.contract.fieldsSig,
      AllStructs
    );
  }

  getInitialFieldsWithDefaultValues() {
    return this.contract.getInitialFieldsWithDefaultValues() as RewardTokenTypes.Fields;
  }

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

  at(address: string): RewardTokenInstance {
    return new RewardTokenInstance(address);
  }

  tests = {
    getSymbol: async (
      params: Omit<
        TestContractParamsWithoutMaps<RewardTokenTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(this, "getSymbol", params, getContractByCodeHash);
    },
    getName: async (
      params: Omit<
        TestContractParamsWithoutMaps<RewardTokenTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(this, "getName", params, getContractByCodeHash);
    },
    getDecimals: async (
      params: Omit<
        TestContractParamsWithoutMaps<RewardTokenTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "getDecimals", params, getContractByCodeHash);
    },
    getTotalSupply: async (
      params: Omit<
        TestContractParamsWithoutMaps<RewardTokenTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "getTotalSupply", params, getContractByCodeHash);
    },
    mintTokens: async (
      params: TestContractParamsWithoutMaps<
        RewardTokenTypes.Fields,
        { to: Address; amount: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "mintTokens", params, getContractByCodeHash);
    },
    burnTokens: async (
      params: TestContractParamsWithoutMaps<
        RewardTokenTypes.Fields,
        { from: Address; amount: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "burnTokens", params, getContractByCodeHash);
    },
  };
}

// Use this object to test and deploy the contract
export const RewardToken = new Factory(
  Contract.fromJson(
    RewardTokenContractJson,
    "",
    "77c9f625f0fbe2d9ba253e4b445b828fc44b74dc40bcd03e601cae6d81c0425f",
    AllStructs
  )
);

// Use this class to interact with the blockchain
export class RewardTokenInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<RewardTokenTypes.State> {
    return fetchContractState(RewardToken, this);
  }

  view = {
    getSymbol: async (
      params?: RewardTokenTypes.CallMethodParams<"getSymbol">
    ): Promise<RewardTokenTypes.CallMethodResult<"getSymbol">> => {
      return callMethod(
        RewardToken,
        this,
        "getSymbol",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getName: async (
      params?: RewardTokenTypes.CallMethodParams<"getName">
    ): Promise<RewardTokenTypes.CallMethodResult<"getName">> => {
      return callMethod(
        RewardToken,
        this,
        "getName",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getDecimals: async (
      params?: RewardTokenTypes.CallMethodParams<"getDecimals">
    ): Promise<RewardTokenTypes.CallMethodResult<"getDecimals">> => {
      return callMethod(
        RewardToken,
        this,
        "getDecimals",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getTotalSupply: async (
      params?: RewardTokenTypes.CallMethodParams<"getTotalSupply">
    ): Promise<RewardTokenTypes.CallMethodResult<"getTotalSupply">> => {
      return callMethod(
        RewardToken,
        this,
        "getTotalSupply",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    mintTokens: async (
      params: RewardTokenTypes.CallMethodParams<"mintTokens">
    ): Promise<RewardTokenTypes.CallMethodResult<"mintTokens">> => {
      return callMethod(
        RewardToken,
        this,
        "mintTokens",
        params,
        getContractByCodeHash
      );
    },
    burnTokens: async (
      params: RewardTokenTypes.CallMethodParams<"burnTokens">
    ): Promise<RewardTokenTypes.CallMethodResult<"burnTokens">> => {
      return callMethod(
        RewardToken,
        this,
        "burnTokens",
        params,
        getContractByCodeHash
      );
    },
  };

  transact = {
    getSymbol: async (
      params: RewardTokenTypes.SignExecuteMethodParams<"getSymbol">
    ): Promise<RewardTokenTypes.SignExecuteMethodResult<"getSymbol">> => {
      return signExecuteMethod(RewardToken, this, "getSymbol", params);
    },
    getName: async (
      params: RewardTokenTypes.SignExecuteMethodParams<"getName">
    ): Promise<RewardTokenTypes.SignExecuteMethodResult<"getName">> => {
      return signExecuteMethod(RewardToken, this, "getName", params);
    },
    getDecimals: async (
      params: RewardTokenTypes.SignExecuteMethodParams<"getDecimals">
    ): Promise<RewardTokenTypes.SignExecuteMethodResult<"getDecimals">> => {
      return signExecuteMethod(RewardToken, this, "getDecimals", params);
    },
    getTotalSupply: async (
      params: RewardTokenTypes.SignExecuteMethodParams<"getTotalSupply">
    ): Promise<RewardTokenTypes.SignExecuteMethodResult<"getTotalSupply">> => {
      return signExecuteMethod(RewardToken, this, "getTotalSupply", params);
    },
    mintTokens: async (
      params: RewardTokenTypes.SignExecuteMethodParams<"mintTokens">
    ): Promise<RewardTokenTypes.SignExecuteMethodResult<"mintTokens">> => {
      return signExecuteMethod(RewardToken, this, "mintTokens", params);
    },
    burnTokens: async (
      params: RewardTokenTypes.SignExecuteMethodParams<"burnTokens">
    ): Promise<RewardTokenTypes.SignExecuteMethodResult<"burnTokens">> => {
      return signExecuteMethod(RewardToken, this, "burnTokens", params);
    },
  };

  async multicall<Calls extends RewardTokenTypes.MultiCallParams>(
    calls: Calls
  ): Promise<RewardTokenTypes.MultiCallResults<Calls>> {
    return (await multicallMethods(
      RewardToken,
      this,
      calls,
      getContractByCodeHash
    )) as RewardTokenTypes.MultiCallResults<Calls>;
  }
}