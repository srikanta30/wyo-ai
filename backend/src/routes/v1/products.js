var router = require("express").Router();
const products = require("../../controllers/products");
const errors = require("../../middlewares/validator");

router.get("/products", errors.PRODUCTS.GET_PRODUCTS, products.getProducts);
router.get("/products/stores", products.getAllStores);
router.get(
  "/products/categories",
  errors.PRODUCTS.GET_CATEGORIES,
  products.getCategories
);
router.get("/products/themes", products.getThemes);
router.get("/products/styles", products.getStyles);
router.get(
  "/products/filters",
  errors.PRODUCTS.GET_FILTERS,
  products.getFilters
);

module.exports = router;
