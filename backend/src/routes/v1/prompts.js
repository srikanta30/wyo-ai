var router = require("express").Router();
const prompts = require("../../controllers/prompts");
const authorization = require("../../middlewares/authorization");
const errors = require("../../middlewares/validator");

router.get(
  "/prompts/generate",
  authorization,
  errors.PROMPTS.GENERATE,
  prompts.generatePrompt
);
router.get(
  "/prompts/suggest",
  authorization,
  errors.PROMPTS.SUGGEST,
  prompts.suggestPrompt
);
router.get(
  "/prompts/recent",
  authorization,
  prompts.getRecentPrompt
);

module.exports = router;
