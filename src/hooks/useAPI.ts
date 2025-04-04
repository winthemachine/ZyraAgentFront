import { useCallback } from 'react';
import axiosInstance from '../services/axiosInstance';
import { STATUSCODEMESSAGES } from '../utils/statusCodeMessageHelper';

export const useAPI = () => {

  const handleError = useCallback((error: any) => {
    const statusCode: number = error.response?.status;
    const errorMessage = error.response?.data?.message || STATUSCODEMESSAGES[statusCode] || error?.message || "Something went wrong. Please try again later.";
    console.log('=================== errorMessage =============', errorMessage);
    throw error;
  }, []);

  const get = useCallback(async (url: string) => {
    try {
      return await axiosInstance.get(url);
    } catch (error) {
      return handleError(error);
    }
  }, [handleError]);

  const post = useCallback(async (url: string, data?: any) => {
    try {
      return await axiosInstance.post(url, data);
    } catch (error) {
      return handleError(error);
    }
  }, [handleError]);

  const put = useCallback(async (url: string, data?: any) => {
    try {
      return await axiosInstance.put(url, data);
    } catch (error) {
      return handleError(error);
    }
  }, [handleError]);

  const del = useCallback(async (url: string) => {
    try {
      return await axiosInstance.delete(url);
    } catch (error) {
      return handleError(error);
    }
  }, [handleError]);

  return {
    get,
    post,
    put,
    del,
  };
};
