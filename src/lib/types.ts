import { BaseDataTypes } from 'models/dialects/BaseDataTypes'

export type DialectType = 'default' | 'postgres'

export type DataTypesKey = keyof typeof BaseDataTypes
