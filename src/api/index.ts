import axios from "axios";

const API = axios.create({baseURL:'http://localhost:8000'})

export const login = (loginRequest:any) => API.post('/api/auth/signin',loginRequest)
export const signup = (signupRequest:any) => API.post('/api/auth/signup',signupRequest)