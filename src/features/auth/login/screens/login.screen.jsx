import React, { useState, useContext } from "react";

import { UserContext } from "../../../../context/user.context";

import { LoginComponent } from "../components/login.component";

import { LoadingIndicator } from "../../../../components/loading-indicator/loading-indicator";

import { loginService } from "../../../../services/auth/login.service";

import { tryToCatch } from "../../../../utils/try-to-catch";

export function LoginScreen({ navigation }) {

  const {getToken, getUserData} = useContext(UserContext);

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onLogin = async () => {
    setIsLoading(true)
    if (!emailOrUsername.length) {
      setIsLoading(false);
      return setError("Please enter your email or username!");
    } else if (!password.length) {
      setIsLoading(false);
      return setError("Please enter your password!");
    } else if (password.length < 6) {
      setIsLoading(false);
      return setError("Password must contain at least 6 character!");
    };setError(null);
    const [err, data] = await tryToCatch(loginService, emailOrUsername.toLocaleLowerCase().trim(), password);
    if (err) {
      setError(err);
      setIsLoading(false);
    } else if (data.error) {
      setError(data.detail);
    } else {
      getToken();
      getUserData();
    };setIsLoading(false);
  };

  const onRegister = () => navigation.navigate("Register");

  return (
    <>
      {
        isLoading 
          ? <LoadingIndicator />
          : <LoginComponent 
              emailOrUsername={emailOrUsername}
              password={password}
              isLoading={isLoading}
              error={error}
              setEmailOrUsername={setEmailOrUsername}
              setPassword={setPassword}
              onLogin={onLogin}
              onRegister={onRegister}
            />
      }
    </>
  );
};
