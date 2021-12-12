import { createConnection } from '../../lib/db'
import * as recordsStages from '../../lib/aggregation/records-stages'
import type { AggregationDoc } from '../../lib/types'

type Params = {
      minCount: number
      maxCount: number
      startDate: Date
      endDate: Date
}


export async function fetchRecords({ minCount, maxCount, startDate, endDate }: Params) {

      /** The aggregation pipeline */
      const pipeline = [
            recordsStages.matchStageForCreatedDate(startDate, endDate),
            recordsStages.addTotalCountField(),
            recordsStages.matchStageForCounts(minCount, maxCount),
            recordsStages.excludeFields()
      ]

      const mongoClient = await createConnection()
      /** The `records` collection in `getir-case-study` database */
      const coll = mongoClient.db('getir-case-study').collection('records')

      const aggregationCursor = coll.aggregate<AggregationDoc>(pipeline, { hint: 'createdAt_-1' })

      const records: AggregationDoc[] = []
      await aggregationCursor.forEach(doc => {
            records.push(doc)
      })

      return records
}