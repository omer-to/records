type Fields = {
      [fieldName: string]: unknown
}

/**
 * @description Creates a `$addFields` stage to be used in an aggregation pipeline to output documents
 * that contain all existing fields from previous stage's documents and newly added fields.
 * 
 * @example addFieldsFor({totalCount: 'constantValue'})
 * 
 * @param fields The fields to add 
 * @returns `$addFields` stage
 */
export function addFieldsFor(fields: Fields) {
      return {
            $addFields: fields
      }
}