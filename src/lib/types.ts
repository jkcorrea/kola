import { BaseDataTypes } from 'models/dialects/BaseDataTypes'

export type DialectType = 'base' | 'postgres'

export type DataTypesKey = keyof typeof BaseDataTypes
