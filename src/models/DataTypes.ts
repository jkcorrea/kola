import { DialectType } from 'lib/types'

import { BaseDataTypes } from './dialects/BaseDataTypes'
import { PostgresDataTypes } from './dialects/postgres/DataTypes'

export const DataTypes: { [P in DialectType]: typeof BaseDataTypes } = {
  base: BaseDataTypes,
  postgres: PostgresDataTypes,
}
