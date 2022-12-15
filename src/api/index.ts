import axios from "axios";

const API = axios.create({baseURL:'http://localhost:8000'})

export const login = (loginRequest:any) => API.post('/api/auth/signin',loginRequest,{withCredentials:true})
export const signup = (signupRequest:any) => API.post('/api/auth/signup',signupRequest)
export const createPost = (post:any) => API.post('/api/posts/create',post,{withCredentials:true})
export const getPosts = (id:any) =>API.get(`/api/user/post/${id}`,{withCredentials:true})
export const getRandomPosts = () =>API.get('/api/user/posts',{withCredentials:true})
export const getPostById = (id:any) => API.get(`/api/posts/${id}`,{withCredentials:true})
export const createComment = (comment:any) =>API.post('api/comments/create',comment,{withCredentials:true})
export const deleteComment = (id:any) => API.delete(`api/comments/delete/${id}`,{withCredentials:true})
export const deletePost = (id:any) => API.delete(`api/posts/delete/${id}`,{withCredentials:true})
export const updatePost = (id:number,post:any) => API.patch(`api/posts/update/${id}`,post,{withCredentials:true})
