import Router from 'express'

import { pizzaValidation } from './../validations/pizza'
import * as pizzaController from '../controllers/pizzaController'

const router = new (Router as any)()

router.get('/', pizzaController.getPizzas)
router.post('/', pizzaValidation, pizzaController.addPizza)

export default router
