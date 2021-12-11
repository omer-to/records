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
