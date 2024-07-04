import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
});

// 요청 인터셉터 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && !config.url?.includes('/signup') && !config.url?.includes('/signin')) { // 회원가입, 로그인 요청에는 토큰을 추가하지 않음
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`Sending token: ${token}`); // 토큰 전달 로깅
    } else {
      console.log('No token found in localStorage or request is for signup/signin'); // 토큰이 없거나 회원가입/로그인 요청일 경우 로그
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
