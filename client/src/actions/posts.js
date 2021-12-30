import * as api from '../api/index';
import { COMMENT_POST,FETCH_POST,FETCH_ALL,FETCH_BY_SEARCH,CREATE,UPDATE,DELETE,LIKE_POST,START_LOADING,END_LOADING,FETCH_POST_BY_CREATOR } from '../constants/actionTypes';

// Action creators
export const getPost = (id) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING });
        const { data } = await api.fetchPost(id);

        dispatch({type: FETCH_POST, payload: data});
        dispatch({type: END_LOADING});

    }catch (error){
        console.log(error);
    }
}

export const getPosts = (page) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING });
        const { data } = await api.fetchPosts(page);
        console.log(data);
        dispatch({type: FETCH_ALL, payload: data});
        dispatch({type: END_LOADING});
    }
    catch (error){
        console.log(error);
    }
}

export const getPostsByCreator = (name) => async(dispatch) => {
    try{
        dispatch({type: START_LOADING });
        const {data: {data}} = await api.fetchPostsByCreator(name);

        dispatch({type: FETCH_POST_BY_CREATOR, payload:data});
        dispatch({type: END_LOADING});
    }catch (error){
        console.log(error);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING });
        const {data: {data}} = await api.fetchPostsBySearch(searchQuery);
        dispatch({type: FETCH_BY_SEARCH, payload: data});
        dispatch({type: END_LOADING});
    }catch (error){
        console.log(error);
    }
}

export const createPost = (post, navigate) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING });

        const { data } = await api.createPost(post);
        navigate(`/posts/${data._id}`);
        dispatch({type:CREATE ,payload:data});
        dispatch({type: END_LOADING});
    }
    catch(error)
    {
        console.log(error);
    }
}

export const updatePost = (id, updatedPostData) => async(dispatch) => {
    try{
       const {data} =  await api.updatePost(id,updatedPostData);
       dispatch({type:UPDATE , payload:data});
    }
    catch (error)
    {
        console.log(error);
    }
}

export const deletePost = (id) => async(dispatch) => {
    try{
        await api.deletePost(id);
        dispatch({type:DELETE ,payload:id});
    }
    catch(error)
    {
        console.log(error);
    }
}

export const likePost = (id) => async(dispatch) => {
    try{
        const {data} =  await api.likePost(id);
        dispatch({type:LIKE_POST , payload:data});
     }
    catch (error)
    {
        console.log(error);
    }
}

export const commentPost = (value, id) => async(dispatch) => {
    try{
        const { data } = await api.commentPost(value,id);
        dispatch({ type: COMMENT_POST, payload:data });
        return data.comments;
    }catch(error){
        console.log(error);
    }
}

