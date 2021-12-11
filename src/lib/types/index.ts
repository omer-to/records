/**
 * Schema describing a single document in `records` collection
 */
export type RecordSchema = {
      key: string
      counts: number[]
      createdAt: Date
      value: string
}