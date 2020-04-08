import localforage from 'localforage'
import { Database } from 'models/Database'
import { DialectType, ValidDataType } from 'models/DataTypes'
import { useEffect, useState } from 'react'
import { createContainer } from 'unstated-next'

type UiState = {
  showSchema: boolean
  databases: Database[]
  currentDatabase: number
  currentTable: string
}

const defaultDbJSON = {
  name: 'My Fancy Database',
  tables: [
    {
      dialect: 'postgres' as DialectType,
      name: 'signups',
      columns: [
        {
          name: 'email',
          type: 'text' as ValidDataType,
        },
      ],
    },
  ],
}

const initialState: UiState = {
  showSchema: false,
  databases: [Database.fromJSON(defaultDbJSON)],
  currentDatabase: 0,
  currentTable: defaultDbJSON.tables[0].name,
}

const useUi = () => {
  const [ui, _setUi] = useState<UiState>(initialState)

  const setUi = (newState: Partial<UiState>) => {
    _setUi({ ...ui, ...newState })
  }

  // Check for data from a previous session...
  useEffect(() => {
    const hydrateDatabases = async () => {
      try {
        const databases = await localforage.getItem<Database[]>('databases')
        if (databases) setUi({ databases })
      } catch (error) {
        console.error(`Trouble hydrating app: ${error}`)
      }
    }

    hydrateDatabases()
  })

  return {
    ui,
    setUi,
    addDatabase: (database: Database) => {
      setUi({ databases: [...ui.databases, database] })
    },
    removeDatabase: (index: number) => {
      setUi({
        databases: [
          ...ui.databases.slice(0, index),
          ...ui.databases.slice(index + 1),
        ],
      })
    },
    setCurrentDatabase: (index: number) => {
      setUi({ currentDatabase: index })
    },
    updateDatabase: (index: number, database: Database) => {
      setUi({
        databases: [
          ...ui.databases.slice(0, index),
          database,
          ...ui.databases.slice(index + 1),
        ],
      })
    },
    setCurrentTable: (name: string) => {
      const db = ui.databases[ui.currentDatabase]
      if (db && db.tables.has(name)) {
        setUi({ currentTable: name })
      } else {
        throw new Error('table does not exist on selected database')
      }
    },
  }
}

export const UiContainer = createContainer(useUi)
