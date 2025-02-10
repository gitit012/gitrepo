const { body, validationResult } = require('express-validator');

const validateUser = [
    body('id').isInt().withMessage('ID must be an integer'),
    body('firstname').isString().isLength({ min: 2 }).withMessage('atleast 2 characters'),
    body('lastname').isString().isLength({ min: 2 }).withMessage('atleast 2 characters'),
    body('location').isString().notEmpty().withMessage('Location is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
];

module.exports = validateUser;
