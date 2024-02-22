import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authClient from 'zoominfo-api-auth-client';
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  const [loggedin , setloggedin] = useState('')
  const { loginWithRedirect , isAuthenticated , getAccessTokenSilently, getIdTokenClaims} = useAuth0();
  const navigate = useNavigate();
  const user_id = import.meta.env.VITE_ZOOM_USER_ID
  const client_id = import.meta.env.VITE_CLIENT_ID;
  const private_key = import.meta.env.VITE_ZOOM_INFO_PRIVATE_KEY;
  const zoomInfoTokenGet =  async()=>{

    const zoomInfoToken = await authClient.getAccessTokenViaPKI(user_id,client_id , private_key);
    sessionStorage.setItem('token',zoomInfoToken)
    zoomInfoToken && navigate('user')
  }

  useEffect(()=>{
    loggedin== 'userlogged' && zoomInfoTokenGet()
  },[loggedin])
  // const getToken = async ()=>{
  //   const  token = await getAccessTokenSilently();
  //   const idtoken = await getIdTokenClaims()
  //   console.log(token,"token");
  //   console.log(idtoken?.__raw,"idtoken");


  // }
  // useEffect(()=>{
  //   isAuthenticated && getToken()
  // },[isAuthenticated])

  return (
    <Box sx={{height:'100vh' , width:'100vw', display:'flex', justifyContent:'center' , alignItems:'center', bgcolor:'#F7F7F7'}}>
     <Button   startIcon={<FcGoogle/>} onClick={() =>{ /* loginWithRedirect() ; */ setloggedin('userlogged') }}>Sign In With Google</Button>
    </Box>
    )
}

export default SignIn