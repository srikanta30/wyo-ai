const { check, param, query } = require("express-validator");
const enums = require("../constants/enums");
const Errors = {
  IMAGES: {
    GENERATE_IMAGE: [check("prompt", "prompt should not be empty.").notEmpty()],
    CHECK_IMAGE_STATUS: [param("id", "messageId must be present.").notEmpty()],
    SAVE_GENERATED_IMAGE: [
      check("message_id", "message_id should not be empty.").notEmpty(),
      check("message", "message should not be empty.").notEmpty(),
      check("prompt", "prompt should not be empty.").notEmpty(),
    ],
  },
  ORDERS: {
    CREATE_ORDER: [
      check("store_id", "store_id should be integer more than 0.")
        .notEmpty()
        .isInt({ min: 1 }),
      check("image_url", "image_url should not be empty.").notEmpty(),
      check("order_details", "order_details should not be empty.").notEmpty(),
    ],
    GET_ALL_ORDERS_BY_STORE: [
      query("store_id", "store_id should be integer more than 0.")
        .notEmpty()
        .isInt({ min: 1 }),
    ],
    GET_ORDER_DETAILS: [
      param("id", "orderId must be present & integer.").notEmpty().isInt(),
    ],
    UPDATE_ORDER_STATUS: [
      param("id", "orderId must be present & integer.").notEmpty().isInt(),
      check("status", "status should be ACCEPTED, REJECTED or COMPLETE.")
        .notEmpty()
        .isIn(["ACCEPTED", "REJECTED", "COMPLETE"]),
    ],
  },
  PRODUCTS: {
    GET_CATEGORIES: [
      query("category", "category should be present.").notEmpty(),
    ],
    GET_FILTERS: [
      query("parent_sku", "parent_sku should be present.").notEmpty(),
      query("color", "color should be present.").notEmpty(),
    ],
    GET_PRODUCTS: [
      query("parent_sku", "parent_sku should be present.").notEmpty(),
    ],
  },
  PROMPTS: {
    GENERATE: [query("input", "input should be present.").notEmpty()],
    SUGGEST: [
      query(
        "theme",
        "theme should be present & have values : Trippy, Animal and Bird or All Food."
      )
        .notEmpty()
        .isIn(["Trippy", "Animal and Bird", "All Food"]),
    ],
  },
  USERS: {
    SIGN_IN: [
      check("phone", "phone must be a valid phone number.")
        .notEmpty()
        .isMobilePhone("en-IN"),
    ],
    VERIFY_OTP: [
      check("phone", "phone must be a valid phone number.")
        .notEmpty()
        .isMobilePhone("en-IN"),
      check("otp", "otp must be integer & present.").notEmpty().isInt(),
    ],
    REGISTER: [
      check("phone", "phone must be a valid phone number.")
        .notEmpty()
        .isMobilePhone("en-IN"),
      check("name", "name must be present.").notEmpty().isString(),
    ],
  },
};
module.exports = Errors;
