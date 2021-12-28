import axios from 'axios';
import { formatISO } from 'date-fns';
import qs from 'qs';

const http = axios.create({
    timeout: 180000,
    paramsSerializer: params => qs.stringify(params, { serializeDate: (d) => formatISO(d) }),
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        // TODO: 'PUT YOUR TOKEN HERE'
        // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjYwN2EyMzJjMGUzY2YyZGE5YTVkM2I2NyIsInVuaXF1ZV9uYW1lIjoiSUFSSVMiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE2MTg2MTcxMzUsImV4cCI6MTYxODYxNzE5NSwiaWF0IjoxNjE4NjE3MTM1fQ.MgKZ87VNz8n6eNbZVD93lU5cqZQmcxL-JX6cNAhPlmQ' 
    }
});

export default http;