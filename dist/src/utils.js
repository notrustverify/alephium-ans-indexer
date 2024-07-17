"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAndUpdateCounterEvent = exports.createEntry = exports.isValidName = exports.isValidAddress = exports.contractType = void 0;
const web3_1 = require("@alephium/web3");
const models_1 = require("./models");
const sequelize_1 = require("sequelize");
var contractType;
(function (contractType) {
    contractType["forwardName"] = "forwardName";
    contractType["reverseName"] = "reverseName";
})(contractType = exports.contractType || (exports.contractType = {}));
const isValidAddress = (address) => {
    try {
        (0, web3_1.validateAddress)(address);
        return true;
    }
    catch {
        return false;
    }
};
exports.isValidAddress = isValidAddress;
const isValidName = (name) => {
    if ((0, exports.isValidAddress)(name.name)) {
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
exports.isValidName = isValidName;
async function createEntry(name, defaultData, nftIndex) {
    let whereOperators = [{ name: name }, { nftIndex: nftIndex }];
    if (nftIndex === undefined)
        whereOperators = [{ name: name }];
    return await models_1.DbName.findOrCreate({
        where: { [sequelize_1.Op.or]: whereOperators },
        defaults: defaultData,
    });
}
exports.createEntry = createEntry;
async function getAndUpdateCounterEvent(contractType, group, totalInContract) {
    let getForwardDb = await models_1.Event.findOne({ where: { contractType: contractType, group: group } });
    let getForwardSaveCount = 0;
    if (getForwardDb !== null) {
        getForwardSaveCount = getForwardDb.total;
        getForwardDb.update({ total: totalInContract });
        return getForwardSaveCount;
    }
    await models_1.Event.create({ total: totalInContract, contractType: contractType, group: group });
    return getForwardSaveCount;
}
exports.getAndUpdateCounterEvent = getAndUpdateCounterEvent;
