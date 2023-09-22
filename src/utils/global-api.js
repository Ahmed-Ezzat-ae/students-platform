import axios from 'axios';
                
// axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.baseURL = 'https://educational-platform-api.vercel.app/api';

function isLoginPage(url) {
  return url.endsWith('/login') || url.endsWith('/register') || url.endsWith('/reset-password');
}

axios.interceptors.request.use((req) => {
  const token = JSON.parse(localStorage.getItem('studentData'))?.token;
  if (!isLoginPage(req.url)) {
    if (token) {
      req.headers.authorization = token;
    }
  }

  return req;
});
