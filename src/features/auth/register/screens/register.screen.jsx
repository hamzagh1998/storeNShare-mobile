import React, { useState }  from "react";

import { RegisterComponent } from "../components/register.component";

import { LoadingIndicator } from "../../../../components/loading-indicator/loading-indicator";

import { tryToCatch } from "../../../../utils/try-to-catch";

import { registerService } from "../../../../services/auth/register.service"; 


export function RegisterScreen({ navigation }) {

  const [userData, setUserData] = useState({username: "", email: "", password: "", confirmPassword: ""});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { username, email, password, confirmPassword } = userData; 

  const onRegister = async () => {
    setIsLoading(true)
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/; // to validate email address!
    if (!username.length|| !email.length || !password.length) {
      setIsLoading(false)
      return setError("All fields are required!");
    } else if (!reg.test(email.trim())) {
      setIsLoading(false)
      return setError("invalid email address!");
    } else if (password.length < 6) {
      setIsLoading(false)
      return setError("Password must contain at least 6 character!");
    } else if (password !== confirmPassword) {
      setIsLoading(false);
      return setError("Two passwords didn't match!");
    };setError(null);

      const [err, data] = await tryToCatch(
        registerService, 
        username.toLocaleLowerCase().trim(), 
        email.toLocaleLowerCase().trim(), 
        password);
      if (err) {
        setError(err);
        setIsLoading(false);
      } else if (data.error) {
        setError(data.detail);
      } else {
        navigation.navigate("Login");
      };setIsLoading(false);
  };

  const onLogin = () => navigation.navigate("Login");

  return (
    <>
      {
        isLoading 
          ? <LoadingIndicator />
          : <RegisterComponent 
              userData={userData}
              error={error}
              setUserData={setUserData}
              onRegister={onRegister}
              onLogin={onLogin}
            />
      }
    </>
  );
};
