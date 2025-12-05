import axios from 'axios'
import { ref } from 'yup';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000'

// Create an axios instance
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.defaults.xsrfCookieName = 'XSRF-TOKEN';
api.defaults.xsrfHeaderName = "X-XSRF-TOKEN";

let currentAccessToken = null
export function setAccessToken(token) { currentAccessToken = token }
export function getAccessToken() { return currentAccessToken }

// run automatically before api request
api.interceptors.request.use((config) => {
  const t = currentAccessToken
  if (t) config.headers = { ...config.headers, Authorization: `Bearer ${t}` }
  return config
})

let csrfPromise = null;
export function getCsrfTokenOnce() {
  if (!csrfPromise) {
    csrfPromise = api.get('/sanctum/csrf-cookie')
      .then((r) => r)
      .catch((e) => {
        csrfPromise = null
        throw e
      });
  }
  return csrfPromise;
}

let refreshPromise = null;
export async function refreshOnce() {
  if (refreshPromise) return refreshPromise
    refreshPromise = api.post('/api/v1/refresh', {}, { skipAuthRefresh: true })
    .then((r) => {
      setAccessToken(r.data?.data?.token || null)
      refreshPromise = null
      return r.data
    })
    .catch((e) => {
      refreshPromise = null
      throw e
    })
  return refreshPromise
}

// Interceptor: if access token expired -> try refresh automatically
// NOTE: in a more robust system use a request queue to avoid multiple refreshes in parallel.
let isRefreshing = false
let subscribers = []

function subscribe(cb) { subscribers.push(cb) }
function notify(token) { subscribers.forEach((cb) => cb(token)); subscribers = [] }

// Intercept 401 responses and attempt refresh
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config
    // Prevent refresh-loop during logout
    if (original?.skipAuthRefresh) {
      return Promise.reject(err);
    }

    if (err.response?.status === 401 && !original._retry) {
      original._retry = true
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          subscribe(async (newToken) => {
            if (newToken) {
              original.headers['Authorization'] = 'Bearer ' + newToken
              try { resolve(api(original)) } catch (e) { reject(e) }
            } else {
              reject(err)
            }
          })
        })
      }
      isRefreshing = true
      try {
        const data = await refreshOnce()
        const newToken = data?.data?.token 
        notify(newToken)
        isRefreshing = false
        original.headers['Authorization'] = 'Bearer ' + newToken
        return api(original)
      } catch (refreshErr) {
        isRefreshing = false
        notify(null)
        return Promise.reject(refreshErr)
      }
    }
    return Promise.reject(err)
  }
)

export const authService = {
  getCsrfTokenOnce,
  refreshOnce,
  async login({ email, password }) {
    const resp = await api.post('/api/v1/login', {
      email, password
    });
    return resp.data;
  },

  async logout() {
   try{
     await api.post('/api/v1/logout',
                    {},
                    { skipAuthRefresh: true }); // prevents refresh-loop
   } catch(error){
      if(error.response?.status !== 401){
        console.log("Logout error:", error);
      } else {
         console.warn("Logout 401: Refresh token expired or invalid. Safe to ignore.");
      }
   }
  },

  // Register 
  async register(payload) {
    // payload = { username, email, password, csrfToken }
    const resp = await api.post("/api/v1/register", {
      fullName: payload.username,
      email: payload.email,
      password: payload.password,
      confirmPassword: payload.confirmPassword,
    })
    return resp.data
  },
  // Get User
  async getUser(userId){
    const resp = await api.get(`/api/v1/users/${userId}`);
    return resp.data;
  },
  // Send Password Reset Link
  async forgetPassword({ email }){
    const resp = await api.post(`/api/v1/forget-password`,{
      email,
    });
    return resp.data;
  },

  api,
}


  