import { body } from 'express-validator'

export const pizzaValidation = [
  body('title', 'title must be minimum 5 symbols').isLength({ min: 5 }),
  body('description', 'description must be minimum 10 symbols').isLength({ min: 10 }),
  body('price', 'price is required').isNumeric(),
  body('rating', 'rating is required').isNumeric(),
  body('category', 'category is required').isArray({ min: 1 }),
  body('prices', 'prices must have minimum one value').isArray({ min: 1 }),
  body('sizes', 'sizes must have minimum one value').isArray({ min: 1 }),
  body('types', 'types must have minimum one value').isArray({ min: 1 }),
  body('weights', 'weights must have minimum one value').isArray({ min: 1 }),
  body('imageURL', 'incorrect image URL').isURL(),
]
