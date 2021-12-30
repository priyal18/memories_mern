import { FETCH_POST_BY_CREATOR,FETCH_POST,FETCH_ALL,CREATE,UPDATE,DELETE,LIKE_POST, FETCH_BY_SEARCH, START_LOADING,END_LOADING, COMMENT_POST } from '../constants/actionTypes';

const posts = (state = {isLoading:true, posts:[]},action) => {
    switch(action.type)
    {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading:false};
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_POST_BY_CREATOR:
            return {...state, posts:action.payload};
        case FETCH_BY_SEARCH:
            return {...state,posts: action.payload};
        case FETCH_POST:
                return {...state,post: action.payload };
        case DELETE:
            return {...state,posts:state.posts.filter((post) => post._id !== action.payload)};
        case UPDATE:
        case LIKE_POST:
            return {...state,posts:state.posts.map((post) => post._id === action.payload._id ? action.payload : post)};
        case COMMENT_POST:
            return {...state, posts: state.posts.map((post) => {
                // return all the other posts normally
                //change the post that received a comment
                if(post._id === action.payload._id){
                    return action.payload
                }
                return post
            })}
        case CREATE:
            return {...state,posts: [...state.posts,action.payload]};
        default:
            return state;
    }
}

export default posts;