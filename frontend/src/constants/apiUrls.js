import { SERVER_BASE_URL } from '../config';

const BASE_URL = SERVER_BASE_URL;

// Users & Auth
export const sendOTPMethod = (phone) => ({
  baseURL: BASE_URL,
  url: '/api/v1/users/signin',
  method: 'POST',
  data: {
    phone,
  },
});

export const registerAndSendOtpMethod = (name, phone) => ({
  baseURL: BASE_URL,
  url: '/api/v1/users/register',
  method: 'POST',
  data: {
    name,
    phone,
  },
});

export const verifyOTPMethod = (mobileNum, otp) => ({
  baseURL: BASE_URL,
  url: '/api/v1/users/verify',
  method: 'POST',
  data: {
    phone: mobileNum,
    otp,
  },
});

// Products
export const getProductsByCategory = (category) => ({
  baseURL: BASE_URL,
  url: '/api/v1/products/categories',
  method: 'GET',
  params: {
    category: category,
  },
});

export const getStylesMethod = () => ({
  baseURL: BASE_URL,
  url: '/api/v1/products/styles',
  method: 'GET',
});

export const getThemesMethod = () => ({
  baseURL: BASE_URL,
  url: '/api/v1/products/themes',
  method: 'GET',
});

export const getSuggestionFromThemeMethod = (theme) => ({
  baseURL: BASE_URL,
  url: '/api/v1/prompts/suggest',
  params: {
    theme,
  },
  method: 'GET',
});

export const getGeneratedPromptFromInputMethod = (input) => ({
  baseURL: BASE_URL,
  url: '/api/v1/prompts/generate',
  params: {
    input,
  },
  method: 'GET',
});

export const startGeneratingImagesMethod = (prompt) => ({
  baseURL: BASE_URL,
  url: '/api/v1/images/generate',
  method: 'POST',
  data: {
    prompt,
  },
});

export const getGenerationStatusMethod = (generationId) => ({
  baseURL: BASE_URL,
  url: `/api/v1/images/${generationId}`,
  method: 'GET',
});

export const storeGeneratedImagesMethod = (data) => ({
  baseURL: BASE_URL,
  url: '/api/v1/images/save',
  method: 'POST',
  data,
});

export const getProducts = (parent_sku) => ({
  baseURL: BASE_URL,
  url: `/api/v1/products?parent_sku=${parent_sku}`,
  method: 'GET',
});

export const getStores = () => ({
  baseURL: BASE_URL,
  url: '/api/v1/products/stores',
  method: 'GET',
});

export const createOrder = (data) => ({
  baseURL: BASE_URL,
  url: '/api/v1/orders',
  method: 'POST',
  data,
});
