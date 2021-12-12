import { Router } from 'express'
import { validationResult } from 'express-validator'

import { validations } from './validations'
import * as response from './response'
import { fetchRecords } from './fetchRecords'

const recordsRouter = Router()

recordsRouter.post(
      /** path */
      '/records',
      /** validation middlewares */
      ...validations,
      /** request handler */
      async (req, res) => {
            /////////////////////////////////////////////////////
            // Validation Errors
            /////////////////////////////////////////////////////
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                  const errMessages = errors.array().map(error => ({ [error.param]: error.msg }))
                  return res.status(400).json(response.createErrorResponseFrom(errMessages));
            }

            /////////////////////////////////////////////////////
            // Fetching records and returning successful response
            /////////////////////////////////////////////////////
            const { minCount, maxCount, startDate, endDate } = req.body
            const records = await fetchRecords({
                  minCount,
                  maxCount,
                  startDate: new Date(startDate),
                  endDate: new Date(endDate)
            })
            res.status(200).json(response.createSuccessResponseFrom(records))
      }
)

export { recordsRouter }