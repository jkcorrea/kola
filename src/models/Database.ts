import { Table, TableSerialized } from './Table'

type DatabaseSerialized = {
  name: string
  tables: TableSerialized[]
}

export class Database {
  name: string

  tables = new Map<string, Table>()

  constructor(name: string) {
    this.name = name
  }

  toJSON() {
    return JSON.stringify({
      name: this.name,
      tables: this.tables,
    })
  }

  static fromJSON(data: DatabaseSerialized): Database {
    const database = new Database(data.name)

    data.tables.forEach((t) => {
      const table = Table.fromJSON(t)
      database.tables.set(table.name, table)
    })

    return database
  }
}
