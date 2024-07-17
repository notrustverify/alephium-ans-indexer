import { Sequelize, DataTypes, Model } from "sequelize";


export class DbName extends Model {
}
export class Event extends Model {
  declare total: any
  declare type: any
  declare seen: any
  declare group: any
}
export class Address extends Model {
  declare id: any
  declare address: any
}




export function initDb(sequelize: Sequelize, sync: boolean) {

   DbName.init(
  {
    nftIndex: {
      type: DataTypes.BIGINT,
      allowNull: true,
      unique: false
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    capitalisation: {
      type: DataTypes.TEXT,
    },
    expires: {
      type: DataTypes.DATE,
    },
    renewerAddressId: {
      type: DataTypes.INTEGER
    },
    deleterAddressId: {
      type: DataTypes.INTEGER
    },
    creatorAddressId: {
      type: DataTypes.INTEGER
    },
    linkedAddressId: {
      type: DataTypes.INTEGER
    },
    reverseLinkedAddressId: {
      type: DataTypes.INTEGER
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize: sequelize, 
    modelName: 'Name',
  },
)

Address.init(
  {
    address: {
      type: DataTypes.TEXT,
      unique: true
    }
  },
  {
    sequelize: sequelize, 
    modelName: 'Address',
  },
);

Event.init({
  total: {
    type: DataTypes.BIGINT
  },
  seen: {
    type: DataTypes.BIGINT
  },
  group: {
    type: DataTypes.BIGINT
  },
  contractType: {
    type: DataTypes.STRING
  }
},
{
  sequelize: sequelize, 
  modelName: 'Event',
},)

//Address.hasMany(DbName)
//DbName.belongsTo(Address)

DbName.sync({ force: sync }).then(() => {
  sync && console.log('Database & tables created!')
 }).catch((err) => {
  console.log(err);
})

Address.sync({ force: sync }).then(() => {
  sync && console.log('Database & tables created!')
}).catch((err) => {
 console.log(err);
})

Event.sync({ force: sync }).then(() => {
  sync && console.log('Database & tables created!')
}).catch((err) => {
 console.log(err);
})


}