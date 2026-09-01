//require express validator and set up validation rules for the shop
const { body, validationResult } = require("express-validator")
const shopValidation = {}

// Rules for POST /api/shops (creating a new shop)
shopValidation.createShops = () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("name is required")
      .isLength({ min: 2, max: 100 })
      .withMessage("name must be between 2 and 100 characters"),

    body("category").notEmpty().withMessage("category is required"),
    // .isIn(VALID_CATEGORIES),
    // .withMessage(`category must be one of: ${VALID_CATEGORIES.join(", ")}`),

    body("description")
      .optional({ nullable: true })
      .trim()
      .isLength({ max: 500 })
      .withMessage("description must be under 500 characters"),

    body("location")
      .optional({ nullable: true })
      .trim()
      .isLength({ max: 150 })
      .withMessage("location must be under 150 characters"),

    body("phone")
      .optional({ nullable: true })
      .trim()
      .matches(/^\+233[0-9]{9}$/)
      .withMessage(
        "phone must be a valid Ghana number in the format +233XXXXXXXXX",
      ),
  ]
}

//update shop information
shopValidation.updateShop = () => {
  return [
    body("slug")
      .optional()
      .trim()
      .matches(/^[a-z0-9]+(-[a-z0-9]+)*$/)
      .withMessage("slug must be lowercase letters, numbers, and hyphens only"),

    body("name")
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage("name must be between 2 and 100 characters"),

    body("category")
      .optional()
      .isIn(VALID_CATEGORIES)
      .withMessage(`category must be one of: ${VALID_CATEGORIES.join(", ")}`),

    body("description")
      .optional({ nullable: true })
      .trim()
      .isLength({ max: 500 })
      .withMessage("description must be under 500 characters"),

    body("location")
      .optional({ nullable: true })
      .trim()
      .isLength({ max: 150 })
      .withMessage("location must be under 150 characters"),

    body("phone")
      .optional({ nullable: true })
      .trim()
      .matches(/^\+233[0-9]{9}$/)
      .withMessage(
        "phone must be a valid Ghana number in the format +233XXXXXXXXX",
      ),
  ]
}

// Shared middleware — checks validation results and stops the request if any failed
function validate(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

//export the validation functions
module.exports = shopValidation
