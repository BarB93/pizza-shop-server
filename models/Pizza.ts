import mongoose from 'mongoose'

const PizzaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    prices: {
      type: [Number],
      required: true,
    },
    category: {
      type: [Number],
      required: true,
    },
    weights: {
      type: [Number],
      required: true,
    },
    types: {
      type: [Number],
      required: true,
    },
    sizes: {
      type: [Number],
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('Pizza', PizzaSchema)
