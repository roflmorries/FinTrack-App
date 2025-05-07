import { Button } from "antd";
import { useAppDispatch } from "../../../shared/lib/hooks/redux/reduxTypes";
import { signInUserWithGoogle } from "../../../entities/user/model/userThunks";
import { useNavigate } from "react-router-dom";

export default function GoogleLoginButton() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLoginByGoogle = async () => {
    try {
      const resultAction = await dispatch(signInUserWithGoogle());
      if(signInUserWithGoogle.fulfilled.match(resultAction)){
        navigate('/dashboard')
      } else {
        console.error('Login error:', resultAction.payload)
      }
    } catch(error) {
      console.error('Google auth error:', error);
    }
  }

  return (
    <Button onClick={handleLoginByGoogle} >Sign in With Google</Button>
  )
}