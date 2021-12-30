import React, {useState,useEffect} from 'react';
import {TextField, Button,Typography,Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useDispatch,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {createPost,updatePost} from '../../actions/posts';

//GET CURRENT ID

import useStyles from './styles';
const Form = ({currentId, setCurrentId}) => {
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [postData, setPostData] = useState({
         title:'', message:'', tags:'', selectedFile:''
    });
    const [namestate, setNamestate] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(post) setPostData(post);
    },[post])

    const clear = () => {
        setCurrentId(null);
        setPostData({
            title:'', message:'', tags:'', selectedFile:''
        });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setNamestate(1);
        if(currentId)
        {
            dispatch(updatePost(currentId,{...postData, name: user?.result?.name}));
        }else{
        dispatch(createPost({...postData, name: user?.result?.name},navigate));
        }
        clear();
    }
    console.log(user?.result?.name);
    if(!user?.result?.name){
        return(
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other's memories.
                </Typography>
            </Paper>
        )
    }

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setPostData({...postData, [key]: key === 'tags' ? value.split(',') : value});
    }

    return (
        <Paper className = {classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit = {handleSubmit}>
                <Typography variant = "h6">{currentId ? 'Editing' : ' Creating'} a Memory</Typography>
                <TextField name="title" variant = "outlined" label = "Title" fullWidth value = {postData.title} onChange = {handleChange}/>
                <TextField name="message" variant = "outlined" label = "Message" fullWidth value = {postData.message} onChange = {handleChange}/>
                <TextField name="tags" variant = "outlined" label = "Tags" fullWidth value = {postData.tags} onChange = {handleChange}/>
                <div ref={()=>{setNamestate(0)}} className={classes.fileInput}>
                    <FileBase id="fileupload" key={namestate}  type="file" multiple={false} onDone = {({base64}) => setPostData({ ...postData, selectedFile:base64})}/>
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth disabled={postData.title === "" || postData.message === "" || postData.tags === [] || postData.selectedFile === ""}>Submit</Button>
                <Button className={classes.buttonClear} variant="contained" color="secondary" size="large" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;