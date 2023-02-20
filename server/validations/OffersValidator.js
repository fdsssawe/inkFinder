import {body} from 'express-validator'

export  const addPostValidation = [
    body('name').isLength({ min: 5}),
    body('description').isLength({ min: 10}),
    body('exchange').isLength({ min: 1}),
    body('mail').optional().isEmail(),
]