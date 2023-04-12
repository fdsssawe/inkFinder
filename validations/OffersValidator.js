import {body} from 'express-validator'

export  const addPostValidation = [
    body('name').isLength({ min: 4}),
    body('author').isLength({ min: 4}),
    body('photo').optional().isURL({ min: 1}),
    body('prompt').isLength({ min: 2}),
] 