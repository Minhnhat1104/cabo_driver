import {STORE_KEY_TOKEN} from '@base/config/asyncStorageKey';
import {getKeyData} from '@base/utils/Helper';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://driver-skdsnc7tha-uc.a.run.app/',
  timeout: 3000,
  headers: {'X-Custom-Header': 'foobar'},
});

// const token =
//   'eyJhbGciOiJSUzI1NiIsImtpZCI6ImE1MWJiNGJkMWQwYzYxNDc2ZWIxYjcwYzNhNDdjMzE2ZDVmODkzMmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2Fiby1iYWNrZW5kLWY4NzE1IiwiYXVkIjoiY2Fiby1iYWNrZW5kLWY4NzE1IiwiYXV0aF90aW1lIjoxNjg4ODI4NzM0LCJ1c2VyX2lkIjoiQ0NYbVl0T3c1Q1ltUlpOUG0xaUNobW42OE1iMiIsInN1YiI6IkNDWG1ZdE93NUNZbVJaTlBtMWlDaG1uNjhNYjIiLCJpYXQiOjE2ODg4Mjg3MzQsImV4cCI6MTY4ODgzMjMzNCwicGhvbmVfbnVtYmVyIjoiKzE2NTA1NTUzNDM0IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMTY1MDU1NTM0MzQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.N-G5v00_4oYQiwPYFXtlBATUe7oXMHpsnPmE-yXBsJmBiqtMTuMEhEyYFjUHyhvKpRb-jbEHy69tg_G9Q957y4_TZIwZWq5PQtni3KudyeXDcAP7gXX4PuMhDgIYr21CZu1Ts0Aqve3LZvauQIPZT-VRVLiiFEkXmYCzOedUEvYHJpxl7PnA_SsgFljdPuvPY6oXgKDuYfxFoOxkTEGaGg0c4eH5ApftB8MwnOfw5uCdottHQVUZ6JKiRPG5Z7JIrULuBhKQf-cRDXO1_W0WQMMVUx4OPYj8u_keIlyun1yDFeEcLgmN5myz4TcixhV_88_TPSmOdMU1mFsYrCqCIg';
// instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

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
