// import { BACKEND_URL } from "@/constants/env";
import axios, {Axios} from 'axios';

const client: Axios = axios.create({
  baseURL: 'https://umichkisa-api.com/api/v2',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
