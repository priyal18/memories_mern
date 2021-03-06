import React from 'react';
import Post from './Post/Post';
import useStyles from './styles';
import {useSelector} from 'react-redux';
import {Grid, CircularProgress, Paper } from '@material-ui/core';

const Posts = ({ setCurrentId }) => {
    const {posts, isLoading} = useSelector((state) => state.posts); // [] -> { posts : []}
    const classes = useStyles();

    if(!posts?.length && !isLoading) return 'No posts';

    return (
        isLoading ? <Paper elevation = {6} className={classes.loadingPaper}><CircularProgress size = "7em"/></Paper> : (
            <Grid className = {classes.container} container alignItems="stretch" spacing={3}>
                {posts?.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Posts;