
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// Open SQLite database connection
export async function openDB() {
  return open({
    filename: './gamedb.db',
    driver: sqlite3.Database
  })  
}