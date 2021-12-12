import express from 'express'
import bodyParser from 'body-parser'

import { createConnection } from './lib/db'
import { recordsRouter } from './resources/records'


export const app = express()
app.use(bodyParser.json())
/** /records */
app.use(recordsRouter)

async function main() {
      try {
            await createConnection()

            app.listen(8000, () => {
                  console.log('Listening on port 8000')
            })

      } catch (error) {
            console.error('connection error', error)
      }
}

main()