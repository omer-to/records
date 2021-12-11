import { body } from 'express-validator'

/** The regular expression to validate for YYYY-MM-DD format */
const date = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/

/** Validation message for numeric fields: `minCount` and `maxCount` */
const validationMessageNumeric = (field: string) => `${field} must be a number`

/** Validation message for date fields: `startDate` and `endDate` */
const validationMessageForDate = (field: string) => `${field} must be in YYYY-MM-DD format`

export const validations = [
      /** Validate `minCount` to be a number */
      body('minCount').isNumeric().withMessage(validationMessageNumeric('minCount')),

      /** Validate `maxCount` to be a number */
      body('maxCount').isNumeric().withMessage(validationMessageNumeric('minCount')),

      /** Validate `startDate` to be properly formatted */
      body('startDate').matches(date).withMessage(validationMessageForDate('startDate')),

      /** Validate `endDate` to be properly formatted */
      body('endDate').matches(date).withMessage(validationMessageForDate('endDate')),
]
