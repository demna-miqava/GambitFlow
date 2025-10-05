import axios, { type AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "@/consts/apiConfig";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const apiRequest = async <T>(
  method: "get" | "post" | "put" | "patch" | "delete",
  url: string,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  const { data, ...rest } = config;
  const response = await axiosInstance[method](url, data, rest);

  return response.data;
};
