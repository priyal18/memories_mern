import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import {GoogleLogin} from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';
import { signin, signup } from '../../actions/auth';

const initialState = {
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:''
}

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData,setFormData] = useState(initialState);
    const [isSignUp, setisSignUp] = useState(false);
    const [showPassword,setShowPassword] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if(isSignUp){
            dispatch(signup(formData,navigate))
        }else{
            dispatch(signin(formData,navigate))

        }
    }
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const switchMode = () => {
        setisSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj; 
        const token = res?.tokenId;

        try{
            dispatch({type :'AUTH', data: {result,token }});
            navigate('/');
        }catch(error){
            console.log(error);
        }
    }
    const googleFailure = (error) => {
        console.log(error);
        console.log('google sign in failed');
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className = {classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{ isSignUp ? 'Sign Up' :'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignUp && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half autoComplete="on"/>
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half autoComplete="on"/>
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange = {handleChange} type="email" autoComplete="on"/>
                        <Input name="password" label="Password" handleChange = {handleChange} type={showPassword ? "text" : "password"} handleShowPassword = {handleShowPassword} autoComplete="off"/>
                        { isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" autoComplete="off"/> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin
                        clientId = "93722308437-cn6abpfvo5sq3qf9mt9pb4u2p82tdn9a.apps.googleusercontent.com"
                        render = {(renderProps) => (
                            <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess = {googleSuccess}
                        onFailure = {googleFailure}
                        cookiePolicy = "single_host_origin"
                    />
                    
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignUp ? 'Already Have an account? Sign In' : "Don't have an account? Sign Up"  }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
