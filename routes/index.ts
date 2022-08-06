import Router from 'express'
import pizzaRouter from './pizzaRouter'

const router = new (Router as any)()
router.use('/pizza', pizzaRouter)

export default router