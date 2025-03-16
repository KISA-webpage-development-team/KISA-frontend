import { BACKEND_URL } from "@/constants/env";
import axios, { Axios } from "axios";

const client: Axios = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
