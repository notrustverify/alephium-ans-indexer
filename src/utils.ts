import { validateAddress } from "@alephium/web3";
import { DbName, Address, Event } from "./models";
import { Op } from "sequelize";

export type Name = {
  name: string;
  address: string;
  capitalisation: string;
  expires: bigint;
}

export enum contractType {
    forwardName = "forwardName",
    reverseName = "reverseName"
}

export const isValidAddress = (address: string): boolean => {
  try {
    validateAddress(address);
    return true;
  } catch {
    return false;
  }
};

export const isValidName = (name: Name): boolean => {
  if (isValidAddress(name.name)) {
    return false;
  }

  const cleanName = name.name.replace(/[^a-zA-Z0-9_]/g, "").toLowerCase();

  if (name.name !== cleanName) {
    return false;
  }

  const cleanCapitalisation = name.capitalisation.toLowerCase();

  if (cleanCapitalisation !== cleanName) {
    return false;
  }

  const ONE_HOUR = 60 * 60 * 1000;
  const now = Date.now() - ONE_HOUR;
  // Minus 1 hour to pretect from expiry attack
  if (Number(name.expires) < now) {
    return false;
  }

  return true;
};

export async function createEntry(
  name: string,
  defaultData: any,
  nftIndex?: bigint
): Promise<[DbName, boolean]> {

    let whereOperators = [{ name: name }, { nftIndex: nftIndex }];
    if (nftIndex === undefined) whereOperators = [{ name: name }];

    return await DbName.findOrCreate({
      where: { [Op.or]: whereOperators },
      defaults: defaultData,
    });
  
}

export async function getAndUpdateCounterEvent(contractType, group, totalInContract): Promise<number>{
    let getForwardDb = await Event.findOne({where: {contractType: contractType, group: group }})
    let getForwardSaveCount = 0
  
    if (getForwardDb !== null){
      getForwardSaveCount = getForwardDb.total

      getForwardDb.update({total: totalInContract })

      return getForwardSaveCount
    }
    
    await Event.create({total: totalInContract, contractType: contractType, group: group });
  
    
    return getForwardSaveCount
}
