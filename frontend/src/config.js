export const RETRY_INTERVAL_FOR_IMAGE =
  import.meta.env.VITE_RETRY_INTERVAL_FOR_IMAGE ?? 10000;

export const MAX_NUMBER_OF_RETRIES_FOR_IMAGE = parseInt(
  import.meta.env.VITE_MAX_NUMBER_OF_RETRIES_FOR_IMAGE ?? 12,
);

export const SERVER_BASE_URL =
  import.meta.env.VITE_SERVER_BASE_URL ?? 'http://localhost:3011';
