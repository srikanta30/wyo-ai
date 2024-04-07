import {
  MAX_NUMBER_OF_RETRIES_FOR_IMAGE,
  RETRY_INTERVAL_FOR_IMAGE,
} from '../config';
import {
  getGenerationStatusMethod,
  startGeneratingImagesMethod,
  storeGeneratedImagesMethod,
} from '../constants/apiUrls';
import { makeRequest } from '../utils/makeRequest';

const waitUntilGenerationIsComplete = (generationId) => {
  return new Promise((resolve, reject) => {
    var retryCount = 0;
    const interval = setInterval(async () => {
      try {
        if (retryCount >= MAX_NUMBER_OF_RETRIES_FOR_IMAGE) {
          throw new Error('Max number of retries exceeded');
        }

        const res = await makeRequest(getGenerationStatusMethod(generationId));
        retryCount++;

        if (res.data.progress == 'incomplete') {
          clearInterval(interval);
          reject(res);
        }

        if (res.data.progress == '100') {
          clearInterval(interval);
          resolve(res);
        }
      } catch (err) {
        clearInterval(interval);
        reject(err);
      }
    }, RETRY_INTERVAL_FOR_IMAGE);
  });
};

export const generateImagesFromPrompt = async (prompt) => {
  const generationResponse = await makeRequest(
    startGeneratingImagesMethod(prompt),
  );
  const generationId = generationResponse.data.messageId;

  const imagesResponse = await waitUntilGenerationIsComplete(generationId);
  const dataToSave = {
    message_id: generationId,
    prompt,
    message: imagesResponse.data?.response,
  };
  await makeRequest(storeGeneratedImagesMethod(dataToSave));
  return {
    data: dataToSave,
  };
};
