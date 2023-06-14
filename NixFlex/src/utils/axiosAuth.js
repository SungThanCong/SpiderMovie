import axios from 'axios';

const axiosAuth = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/auth',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
axiosAuth.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
axiosAuth.interceptors.response.use(
  res => {
    return res;
  },
  async err => {
    const originalConfig = err.config;

    if (originalConfig.url !== '/token/' && err.response) {
      // Access Token was expired

      if (err.response.status === 401) {
        originalConfig._retry = true;

        try {
          const rs = await axiosAuth.post('/token/refresh/', {
            refresh: localStorage.getItem('refreshToken'),
          });
          console.log(rs.data)
          const { access } = rs.data;

          if (access) {
            localStorage.setItem('accessToken', access);
          }
          // window.location = '/';
          return axiosAuth(originalConfig);
        } catch (_error) {
          alert('Your session has been expired. Please log in again!');
          if (localStorage.getItem('role') == 1)
              window.location = '/admin/login';
          else {
            window.location = '/login';
  
          }
  
          localStorage.clear();
          return Promise.reject(_error);

        }
      }
      // Refresh Token was expired
      if (err.response.status === 403) {
        alert('Your session has been expired. Please log in again!');
        if (localStorage.getItem('role') == 1)
            window.location = '/admin/login';
        else {
          window.location = '/login';

        }

        localStorage.clear();
      }
    
    }

    return Promise.reject(err);
  }
);
// axiosAuth.interceptors.response.use(
//   res => {
//     return res;
//   },
//   async err => {
//     const originalConfig = err.config;

//     if (originalConfig.url !== '/token/' && err.response) {
//       // Access Token was expired
//       if (err.response.status === 401) {
//         if (!originalConfig._retry) {
//           originalConfig._retry = true;
//           try {
//             const refreshToken = localStorage.getItem('refreshToken');
//             if (!refreshToken) {
//               return Promise.reject(err);
//             }

//             const rs = await axios.post('/token/refresh/', {
//               refresh: refreshToken,
//             });

//             const { access } = rs.data;

//             if (access) {
//               // update access token
//               localStorage.setItem('accessToken', access);
//               // clone original request config
//               const newConfig = { ...originalConfig };
//               // set access token to headers
//               newConfig.headers.Authorization = `Bearer ${access}`;
//               // send new request with access token
//               return axiosAuth(newConfig);
//             } else {
//               return Promise.reject(err);
//             }
//           } catch (error) {
//             // error while refreshing token
//             return Promise.reject(error);
//           }
//         } else {
//           // already retried, reject with original error
//           return Promise.reject(err);
//         }
//       } else {
//         // other errors, reject with original error
//         return Promise.reject(err);
//       }
//     } else {
//       // no error response, reject with original error
//       return Promise.reject(err);
//     }
//   }
// );
export default axiosAuth;
