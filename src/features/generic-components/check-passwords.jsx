// extra checking layer
import React, { useState, useContext } from "react";
import { View } from "react-native";

import { UserContext } from "../../context/user.context";

import { Spacer } from "../../components/spacer/spacer";
import { LoadingIndicator } from "../../components/loading-indicator/loading-indicator";
import { ViewContainer, Text, TextInput, Button } from "../../components/utilities";

import { loginService } from "../../services/auth/login.service";

import { tryToCatch } from "../../utils/try-to-catch";


export function CheckPasswords({ text, setChecked }) {

  const { userData: { username } } = useContext(UserContext);

  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onCheck = async () => {
    if (password.length) {
      setIsLoading(true);
      const [err, data] = await tryToCatch(async (username, passord) => (
        await loginService(username, passord)
      ), username, password);
      if (err) setError(err);
      else if (data.error) setError(data.detail);
      else if (!data.error) setChecked(true);
      setIsLoading(false);
    } else {
      setError("please enter your password!");
    }
  };

  return (
    <>
      {
        isLoading
        ? <LoadingIndicator />
        : <ViewContainer>
            <Spacer position="bottom" size="large" />
            <Text variant="cover">User Check</Text>
            <Spacer />
            <Text>{text}</Text>
            <Spacer position="bottom" size="xxl" />
            <View style={{width: "100%"}}>
              <TextInput 
                label="Password"
                value={password}
                placeholder="Enter your password"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={value => setPassword(value)}
              />
              <Text variant="error">{ error }</Text>
              <Button icon="account-check" mode="contained" onPress={() => onCheck()}>check</Button>
            </View>
          </ViewContainer>
      }
    </>
  );
};
