# Quick Analysis of the MongoDB Database and the `records` Collection

## Database Version
The database version is `4.4.10`.
```sh
db.version()
```

## Estimated Document Count
The collection `records`, at the moment, has **4004** documents as returned by the following command (executed in `mongosh` environment)

```js
db.records.countDocuments()
```

## Indexes

The collection `records` has two indexes both of which are single field index, one of which is the automatically created unique index on `_id` field, and the other one is on `createdAt` field in the descending order.

After connecting to the database using `mongosh`, the following command reveals the available indexes:
```js
db.records.getIndexes()
```

And here is the output it produces:

```js
[
      {
            v: 2,
            key: { _id: 1 },
            name: '_id_',
            ns: 'getir-case-study.records'
      },
      {
            v: 2,
            key: { createdAt: -1 },
            name: 'createdAt_-1',
            ns: 'getir-case-study.records',
            background: true
      }
]
```

## Schema

Here is a table showing a quick analysis of the fields with respect to index, type, and whether or not the field is missing in any documents:

|         | `_id`     | `key`  | `createdAt` | `counts` | `value` |
| ------- | --------- | ------ | ----------- | -------- | ------- |
| index   | ascending | none   | descending  | none     | none    |
| type    | ObjectId  | string | Date (ISO)  | number[] | string  |
| missing | none      | none   | none        | none     | none    |


## Querying Options
We have two options for getting the documents from MongoDB. The first one is using MQL, and the other one is using Aggregation Framework.

Although MQL is easier to use, it seems to me that summing the elements in `counts` field cannot be handled on the MongoDB side using MQL, and hence in-memory filtering will be required on the HTTP server.

On the other hand, we can get the documents completely ready to be sent to the client as they come from the MongoDB if we use aggregation framework with the following stages: `$match`, `$addFields`, `$match`, `$project`.

### Using MQL (`db.collection.find`)

#### Projection
Since it is expected to return only `key`, `createdAt`, and `totalCounts` (as the sum of elements in `counts` field), we can safely exclude other fields using the following projection:

```js
{ _id: false, value: false }
```

#### Range Operation for `createdAt`
Since we are looking for documents with `createdAt` in specific range, we can use the following expression:

```js
{
      createdAt:
      {
            $gt: new Date('YYYY-MM-DD'), // The `startDate`
            $lt: new Date('YYYY-MM-DD') // The `endDate`
      }
}
```

### Aggregation (`db.collection.aggregate`)

#### `$match` stage
The first stage in the aggregation pipeline to utilize the index on `createdAt` in order to filter out documents that are not in the date range.

```js
{
      $match:
      { 
            createdAt:
            {
                  $gt: new Date('YYYY-MM-DD'), // The `startDate`
                  $lt: new Date('YYYY-MM-DD') // The `endDate`
            }
      }
}
```

#### `$addFields` stage

Adds a new field of `totalCount` as the sum of all elements in `counts` array field to the documents coming from the previous stage.

```js
{
      $addFields:
      {
            totalCount: { $sum: "$counts"},
      }
}
```

#### `$match` stage

Filters out the documents coming out of the previous aggregation stage, i.e., `$addFields`, based on the `totalCount` field.

```js
{
      $match:
      {
            totalCount:
            {
                  $gt: minCount,
                  $lt: maxCount
            }
      }
}
```

#### `$project` stage

The last stage in the aggregation pipeline to remove the fields that are not required in the actual HTTP response.

```js
{
      $project:
      {
            _id: false,
            counts: false,
            value: false
      }
}
```