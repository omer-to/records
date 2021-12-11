import * as stages from '../stages'

/////////////////////////////////////////////////////////////////
// Utility functions to create stages for the fields of interest
/////////////////////////////////////////////////////////////////

/**
 * @description Creates a `$match` stage for `createdAt` field to match only the documents
 * that fall into the specified date range.
 * 
 * It is intended to be used as the first stage in the pipeline,
 * so as to be able to use the index on `createdAt` field.
 *
 * @param startDate The start date to be used in `$gt` operator
 * @param endDate The end date to be used in `$lt` operator
 */
export function matchStageForCreatedDate(startDate: Date, endDate: Date) {
      return stages.matchStageFrom({
            createdAt: {
                  $gt: startDate,
                  $lt: endDate
            }
      })
}


/**
 * @description Creates a `$match` stage for `totalCount` field that specifies a range
 * to be used only after `totalCount` field is added using @see {addTotalCountField}
 * 
 * It is inteded to be used just after @see {addTotalCountField} stage.
 * 
 * @param minCount The minimum count number to be used as the value of `$gt` operator
 * @param maxCount The maximum count to be used as the value of `$lt` operator
 */
export function matchStageForCounts(minCount: number, maxCount: number) {
      return stages.matchStageFrom({
            totalCount: {
                  $gt: minCount,
                  $lt: maxCount
            }
      })
}
