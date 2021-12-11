import type { Filter } from 'mongodb'

import type { RecordSchema } from '../../types'

/**
 * @description Creates a `$match` stage to be used in an aggregation pipeline to match documents that specifies the `query` conditions.
 * 
 * @param query Identical to read operation query syntax, i.e., db.coll.find()
 * @returns `$match` stage
 */
export function matchStageFrom(query: Filter<RecordSchema>) {
      return {
            $match: query
      }
}