import { openDB } from 'idb'

/**
 * Name of the IndexedDB database used for offline storage.
 * @constant {string}
 */
const DB_NAME = 'vibrand-offline-db'

/**
 * Version of the IndexedDB database.
 * @constant {number}
 */
const DB_VERSION = 1

/**
 * Name of the object store for cached queries.
 * @constant {string}
 */
const QUERIES_STORE = 'queries'

/**
 * Name of the object store for queued mutations.
 * @constant {string}
 */
const MUTATIONS_STORE = 'mutations'

/**
 * Promise that resolves to the opened IndexedDB database.
 * Creates object stores for queries and mutations if they don't exist.
 * @type {Promise<IDBPDatabase>}
 */
export const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(QUERIES_STORE)) {
      db.createObjectStore(QUERIES_STORE)
    }
    if (!db.objectStoreNames.contains(MUTATIONS_STORE)) {
      db.createObjectStore(MUTATIONS_STORE, { autoIncrement: true })
    }
  },
})

/**
 * Saves a query response in the queries object store.
 *
 * @param {string} key - The key to associate with the cached query.
 * @param {*} data - The data to store (query response).
 * @returns {Promise<void>}
 */
export async function saveQuery(key: string, data: any) {
  const db = await dbPromise
  await db.put(QUERIES_STORE, data, key)
}

/**
 * Retrieves a cached query by its key.
 *
 * @param {string} key - The key of the cached query.
 * @returns {Promise<*>} - The cached query data, or undefined if not found.
 */
export async function getQuery(key: string) {
  const db = await dbPromise
  return db.get(QUERIES_STORE, key)
}

/**
 * Queues a mutation in the mutations object store for later processing.
 *
 * @param {*} mutation - The mutation data to queue.
 * @returns {Promise<void>}
 */
export async function queueMutation(mutation: any) {
  const db = await dbPromise
  await db.add(MUTATIONS_STORE, mutation)
}

/**
 * Retrieves all queued mutations from the mutations object store.
 *
 * @returns {Promise<Array<*>>} - An array of queued mutations.
 */
export async function getQueuedMutations() {
  const db = await dbPromise
  return db.getAll(MUTATIONS_STORE)
}

/**
 * Clears all queued mutations from the mutations object store.
 *
 * @returns {Promise<void>}
 */
export async function clearQueuedMutations() {
  const db = await dbPromise
  const tx = db.transaction(MUTATIONS_STORE, 'readwrite')
  await tx.objectStore(MUTATIONS_STORE).clear()
  await tx.done
}
