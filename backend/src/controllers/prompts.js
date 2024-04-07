require("dotenv").config();
const response = require("../lib/response");
const constant = require("../constants/constants");
const links = require("../constants/links");
const axios = require("axios");
const { validationResult } = require("express-validator");
const fs = require("fs");
const util = require("util");
const { OpenAI } = require("openai");
const db = require("../models");
const sequelize = db.sequelize;
const unlinkFile = util.promisify(fs.unlink);
const utils = require("../lib/utils");
const queryProducts = require("../lib/queries/products");
const queryUsers = require("../lib/queries/users");
const logger = require("../lib/logger");

const openai = new OpenAI({
  apiKey: process.env.GPT_KEY,
});

const systemMessage = {
  role: "system",
  content:
    'Here is some information about me: An artificial intelligence bot called "Midjourney" aka "MJ" that functions through machine learning to create stunning and highly creative images from "Prompts" in seconds. About "Prompts": It is a short text phrase that the "MJ" interprets to produce an image. The "MJ" breaks down the words and phrases in a prompt into smaller pieces, called tokens, that can be compared to its training data and then used to generate an image. A well-crafted prompt can help make unique and exciting images.',
  role: "system",
  content:
    'Consider yourself as an AI creative assistant providing prompts to generate stunning images using "Midjourney" aka MJ by following below guidelines: 1. Each prompt MUST always start with <prompt> and MUST always end with ", t-shirt design graphic, vector, contour --ar 4:5 --no text, apparels, models </prompt>" 2. Consider below Prompting notes, Prompt Length : More descriptive prompt is better for a unique look. Get Specific: More precise words, phrases will help create an image with exactly the right look and feel Time Travel: Use different eras have distinct visual styles Emote: Use emotion words to give characters personality Get Colorful : A full spectrum of possibilities Environmental Exploration: Different environments can set unique moods 3. Use input key words for providing prompts even if it represents a salutation or a question 4. Do not provide responses other than Prompts 5. MUST always provide 5 prompts',
};

exports.generatePrompt = async (req, res) => {
  try {
    const input = req?.query?.input;

    if (!input) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        `Please provide a valid "input" for prompts in query params.`,
        null,
        res
      );
    }

    const user_id = req?.user?.dataValues?.id;

    if (!user_id) {
      return response.sendResponse(
        constant.response_code.UNAUTHORIZED,
        constant.STRING_CONSTANTS.INVALID_AUTHORIZATION,
        null,
        res,
        null
      );
    }

    const apiMessages = {
      role: "user",
      content: "Write 5 prompts for" + input,
    };

    const completion = await openai.chat.completions.create({
      messages: [systemMessage, apiMessages],
      model: "gpt-3.5-turbo",
    });

    const content = completion?.choices[0]?.message?.content;

    let prompts = utils.extractPrompts(content);

    response.sendResponse(
      constant.response_code.SUCCESS,
      "Success",
      prompts,
      res
    );

    if (prompts?.length > 0) {
      await Promise.all(
        prompts.map(async (prompt) => {
          try {
            await queryUsers.saveGeneratedPrompt(prompt, user_id);
          } catch (err) {
            console.log(err);
          }
        })
      );
    }

    return;
  } catch (err) {
    console.log(err);
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};

exports.suggestPrompt = async (req, res) => {
  try {
    let errors = await validationResult(req);

    if (!errors.isEmpty()) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        utils.generateErrorMessage(errors),
        null,
        res,
        errors
      );
    }

    const theme = req.query.theme;

    const results = await queryProducts.getRandomPromptFromTheme(theme);

    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Success",
      results,
      res
    );
  } catch (err) {
    console.log(err);
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};

exports.getRecentPrompt = async (req, res) => {
  try {
    let errors = await validationResult(req);

    if (!errors.isEmpty()) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        utils.generateErrorMessage(errors),
        null,
        res,
        errors
      );
    }

    const user_id = req?.user?.dataValues?.id;

    if (!user_id) {
      return response.sendResponse(
        constant.response_code.UNAUTHORIZED,
        constant.STRING_CONSTANTS.INVALID_AUTHORIZATION,
        null,
        res,
        null
      );
    }

    const results = await queryUsers.getRecentPrompts(user_id);

    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Success",
      results,
      res
    );
  } catch (err) {
    console.log(err);
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};
