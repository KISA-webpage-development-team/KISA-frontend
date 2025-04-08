// import { BACKEND_URL } from "@/constants/env";
import axios from 'axios';
import {BACKEND_URL, LOCAL_BACKEND_URL, USE_LOCAL_BACKEND} from '@env';

const client = axios.create({
  baseURL: USE_LOCAL_BACKEND ? LOCAL_BACKEND_URL : BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
