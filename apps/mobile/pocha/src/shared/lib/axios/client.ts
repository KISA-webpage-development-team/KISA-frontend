// import { BACKEND_URL } from "@/constants/env";
import axios from 'axios';
import {BACKEND_URL, LOCAL_BACKEND_URL, USE_LOCAL_BACKEND} from '@env';

const client = axios.create({
  baseURL: BACKEND_URL,
  // baseURL: 'https://6fb0-67-194-25-84.ngrok-free.app/api/v2',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
