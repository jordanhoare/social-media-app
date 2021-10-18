import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({type:"LOGIN_START"});
  try {
    axios.post("auth/login",userCredential).then(res =>{
      console.log(res.data);
      dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    });
  } catch (err) {
    dispatch({type:"LOGIN_FAILURE",payload:err})
  }
}