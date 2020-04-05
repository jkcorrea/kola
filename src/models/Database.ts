import { Table } from './Table'

export class Database {
  name: string

  tables: Table[] = []

  constructor(name: string) {
    this.name = name
  }
}
