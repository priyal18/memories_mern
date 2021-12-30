import axios from 'axios';

const API = axios.create({ baseURL : 'http://localhost:5000'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
});

//const url = 'https://memories-project0101.herokuapp.com/posts';

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsByCreator = (name) => API.get(`/posts/creators?name=${name}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts',newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const commentPost = (value,id) => API.post(`/posts/${id}/commentPost`, {value});
export const updatePost = (id, updatedPostData) => API.patch(`/posts/${id}`,updatedPostData);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin',formData);
export const signUp = (formData) => API.post('/user/signup',formData);
