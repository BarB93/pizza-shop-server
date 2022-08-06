import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

import PizzaModel from '../models/Pizza'

type PizzaGetOptions = {
  title?: { $regex: RegExp }
  category?: number
}

export const addPizza = async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array())
  }

  const pizza = await PizzaModel.find().where({ title: req.body.title })

  if (pizza) {
    return res.status(400).json({
      message: `title: "${req.body.title}", pizza with this title already exist`,
    })
  }

  try {
    const doc = new PizzaModel({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      prices: req.body.prices,
      imageURL: req.body.imageURL,
      rating: req.body.rating,
      sizes: req.body.sizes,
      types: req.body.types,
      weights: req.body.weights,
    })

    await doc.save()

    res.json({
      succsess: true,
      item: doc.toObject(),
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error in pizzaController',
      error,
    })
  }
}

export const getPizzas = async (req: Request, res: Response) => {
  let { limit, page, title, category, sort } = req.query
  page = page || '0'
  limit = limit || '8'
  const options: PizzaGetOptions = {}

  if (title) {
    if (typeof title === 'string') {
      const regex = new RegExp(title, 'i')
      options.title = { $regex: regex }
    }
  }

  if (category) {
    options.category = Number(category)
  }

  try {
    PizzaModel.find(options)
      .sort(`${sort} _id`)
      .skip(Number(page) * Number(limit))
      .limit(Number(limit))
      .exec((err, doc) => {
        if (err) {
          return res.json(err)
        }

        PizzaModel.countDocuments(options).exec((count_error, count) => {
          if (err) {
            return res.json(count_error)
          }
          return res.json({
            count,
            page: page,
            pageSize: doc.length,
            items: doc,
          })
        })
      })
  } catch (error) {
    res.status(500).json({
      message: 'Error while get pizzas',
      error,
    })
  }
}
