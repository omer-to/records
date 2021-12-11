type Specifications = {
      [fieldName: string]: unknown
}

/**
 * @description Creates a `$project` stage to be used in an aggregation pipeline that
 * passes along the documents with the requested fields to the next stage in the pipeline
 * 
 * @example projectStageFrom({ fieldA: 0, fieldB: 0 }) // Return all but the `fieldA`, and `fieldB` fields"
 * 
 * @param specifications The fields to remove or add
 * @returns `$project` stage
 */
export function projectStageFrom(specifications: Specifications) {
      return {
            $project: specifications
      }
}
