var router = require("express").Router();
const midjourney = require("../../controllers/midjourney");
const authorization = require("../../middlewares/authorization");
const errors = require("../../middlewares/validator");

router.post(
  "/images/generate",
  authorization,
  errors.IMAGES.GENERATE_IMAGE,
  midjourney.generateImage
);
router.get(
  "/images/:id",
  authorization,
  errors.IMAGES.CHECK_IMAGE_STATUS,
  midjourney.checkImageStatus
);
router.post(
  "/images/save",
  authorization,
  errors.IMAGES.SAVE_GENERATED_IMAGE,
  midjourney.saveGeneratedImage
);

module.exports = router;
