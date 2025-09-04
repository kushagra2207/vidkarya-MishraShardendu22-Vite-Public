import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

// This makes it so the base url of ths website's backend is automatically added to the beginning of all axios requests. This is useful because it means that we don't have to write out the full url every time we make a request.
// This is usefull for DRY code.
console.log(BASE_URL);

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
