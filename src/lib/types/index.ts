/**
 * Schema describing a single document in `records` collection
 */
export type RecordSchema = {
      key: string
      counts: number[]
      createdAt: Date
      value: string
}

/**
 * Type alias describing the shape of the document as they come out of aggregation
 */
export type AggregationDoc = {
      /**
       * @example 'wtSjVcpg'
       */
      key: string

      /**
       * @example 2016-02-22T11:13:43.165Z
       */
      createdAt: Date

      /**
       * The sum of all elements in `counts` field
       */
      totalCount: number
}