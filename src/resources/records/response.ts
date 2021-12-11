import { AggregationDoc } from '../../lib/types'

/**
 * Type alias for successful response
 */
type SuccessfulResponseBody = {
      code: 0,
      msg: 'Success',
      records: AggregationDoc[]
}

/**
 * Type alias for unsucessful response in the case of validation errors
 */
type UnsuccessfulResponseBody = {
      code: -1
      msg: { [fieldName: string]: string }[]
}

/**
 * @description Creates a success response from the provided records
 * 
 */
export const createSuccessResponseFrom = (records: SuccessfulResponseBody['records']): SuccessfulResponseBody => {
      return {
            code: 0,
            msg: 'Success',
            records
      }
}

/**
 * @description Creates an error response from validation messages
 * 
 */
export const createErrorResponseFrom = (errorMessages: UnsuccessfulResponseBody['msg']): UnsuccessfulResponseBody => {
      return {
            code: -1,
            msg: errorMessages
      }
}