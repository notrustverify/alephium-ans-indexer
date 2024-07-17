"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDb = exports.Address = exports.Event = exports.DbName = void 0;
const sequelize_1 = require("sequelize");
class DbName extends sequelize_1.Model {
}
exports.DbName = DbName;
class Event extends sequelize_1.Model {
}
exports.Event = Event;
class Address extends sequelize_1.Model {
}
exports.Address = Address;
function initDb(sequelize, sync) {
    DbName.init({
        nftIndex: {
            type: sequelize_1.DataTypes.BIGINT,
            allowNull: true,
            unique: false
        },
        name: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        capitalisation: {
            type: sequelize_1.DataTypes.TEXT,
        },
        expires: {
            type: sequelize_1.DataTypes.DATE,
        },
        renewerAddressId: {
            type: sequelize_1.DataTypes.INTEGER
        },
        deleterAddressId: {
            type: sequelize_1.DataTypes.INTEGER
        },
        creatorAddressId: {
            type: sequelize_1.DataTypes.INTEGER
        },
        linkedAddressId: {
            type: sequelize_1.DataTypes.INTEGER
        },
        reverseLinkedAddressId: {
            type: sequelize_1.DataTypes.INTEGER
        },
        isDeleted: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize: sequelize,
        modelName: 'Name',
    });
    Address.init({
        address: {
            type: sequelize_1.DataTypes.TEXT,
            unique: true
        }
    }, {
        sequelize: sequelize,
        modelName: 'Address',
    });
    Event.init({
        total: {
            type: sequelize_1.DataTypes.BIGINT
        },
        seen: {
            type: sequelize_1.DataTypes.BIGINT
        },
        group: {
            type: sequelize_1.DataTypes.BIGINT
        },
        contractType: {
            type: sequelize_1.DataTypes.STRING
        }
    }, {
        sequelize: sequelize,
        modelName: 'Event',
    });
    //Address.hasMany(DbName)
    //DbName.belongsTo(Address)
    DbName.sync({ force: sync }).then(() => {
        sync && console.log('Database & tables created!');
    }).catch((err) => {
        console.log(err);
    });
    Address.sync({ force: sync }).then(() => {
        sync && console.log('Database & tables created!');
    }).catch((err) => {
        console.log(err);
    });
    Event.sync({ force: sync }).then(() => {
        sync && console.log('Database & tables created!');
    }).catch((err) => {
        console.log(err);
    });
}
exports.initDb = initDb;
