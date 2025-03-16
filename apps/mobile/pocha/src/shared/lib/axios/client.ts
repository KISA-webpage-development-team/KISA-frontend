// import { BACKEND_URL } from "@/constants/env";
import axios from 'axios';
import {BACKEND_URL} from '@env';
const client = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
