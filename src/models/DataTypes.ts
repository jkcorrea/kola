import { BaseDataTypes } from './dialects/BaseDataTypes'
import { PostgresDataTypes } from './dialects/postgres/DataTypes'

export const DataTypes = {
  base: BaseDataTypes,
  postgres: PostgresDataTypes,
}
