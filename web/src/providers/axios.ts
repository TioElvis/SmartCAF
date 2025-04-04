import axios from "axios";
import { BASE_API_URL } from "@/lib/constants";

export const _axios = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
