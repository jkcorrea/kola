import { BaseDataTypes } from './dialects/BaseDataTypes'
import { PostgresDataTypes } from './dialects/postgres/DataTypes'

export type DialectType = 'base' | 'postgres'

export const DataTypes: { [P in DialectType]: typeof BaseDataTypes } = {
  base: BaseDataTypes,
  postgres: PostgresDataTypes,
}

// HACK-y: https://stackoverflow.com/a/54598743
// type DataTypeFactoryType = (dialect: DialectType) => AbstractDataType
// const asDataTypeFactoryType = <T>(
//   dtf: { [K in keyof T]: DataTypeFactoryType },
// ) => dtf
// const dataTypeFactories = asDataTypeFactoryType({
//   text: (dialect) => new DataTypes[dialect].TextDataType(),
// })
// export const dataTypeHelpers = (type: keyof typeof dataTypeFactories) => (
//   dialect: DialectType,
// ) => dataTypeFactories[type](dialect)

// TODO for now just assuming postgres
export const dataTypeHelpers = {
  text: new DataTypes.postgres.TextDataType(),
  integer: new DataTypes.postgres.IntegerDataType(),
  float: new DataTypes.postgres.FloatDataType(),
  uuid: new DataTypes.postgres.UUIDDataType(),
}

export type ValidDataType = keyof typeof dataTypeHelpers
