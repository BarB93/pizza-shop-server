import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'

import router from './routes/index'

dotenv.config()

mongoose
  .connect('mongodb+srv://admin:090b514222@cluster0.y2gjitm.mongodb.net/pizza?retryWrites=true&w=majority')
  .then(() => console.log('Succsess conecting to DB. OK!'))
  .catch((error) => console.log('Error conecting to DB', error))

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

const port = process.env.PORT || 5000

app.get('/*', (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, '..', '..', 'client', 'build', 'index.html')),
)

app.listen(port, () => {
  console.log(`Server have started on port ${port}`)
})
