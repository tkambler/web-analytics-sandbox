/**
 * An axios instance with default settings that point it to the location of our API.
 */
import Axios from 'axios';

export const axios = Axios.create({
  baseURL: 'http://localhost:9011/api',
  withCredentials: true,
});
