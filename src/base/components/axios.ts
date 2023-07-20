import {STORE_KEY_TOKEN} from '@base/config/asyncStorageKey';
import {getKeyData} from '@base/utils/Helper';
import axios, {AxiosInstance, InternalAxiosRequestConfig} from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://driver-skdsnc7tha-uc.a.run.app/',
  timeout: 3000,
  headers: {'X-Custom-Header': 'foobar'},
});

// Thêm interceptor cho request trước khi gửi đi
instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      // Lấy token từ AsyncStorage
      const token = await getKeyData(STORE_KEY_TOKEN);

      if (token) {
        // Gắn token vào header của request
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export default instance;
