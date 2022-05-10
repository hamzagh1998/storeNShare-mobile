import React, { useState, useEffect, useContext } from "react";
import { useIsFocused } from '@react-navigation/native';

import { UserContext } from "../../../../context/user.context";

import { logoutService } from "../../../../services/auth/logout.service";
import { ClusterService } from "../../../../services/cluster/cluster.service";
import { UserService } from "../../../../services/user/user.service";

import { LoadingIndicator } from "../../../../components/loading-indicator/loading-indicator";
import { SettingComponent } from "../components/setting.component";

import { CheckPasswords } from "../../../generic-components/check-passwords";

import { ViewContainer } from "../../../../components/utilities";

import { tryToCatch } from "../../../../utils/try-to-catch";


export function SettingsScreen() {

  const { token, setToken, setUserData, setNewUserData, userData: { username, email, avatar } } = useContext(UserContext);
  
  const isFocused = useIsFocused();

  const [profileChecked, setProfileChecked] = useState(false);
  const [passwordChecked, setPasswordChecked] = useState(false);
  const [deleteAccountChecked, setDeleteAccountChecked] = useState(false);
  const [deleteClusterChecked, setDeleteClusterChecked] = useState(false);
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUsername, setCurrentUsername] = useState(username);
  const [currentEmail, setCurrentEmail] = useState(email);
  const [clusterData, setClusterData] = useState({});
  const [error, setError] = useState(null);

  const onLogout = async () => {
    let mounted = true;
    if (mounted) {
      const res = await logoutService();
      if (res.error) setError(res.detail);
      else {
        setToken(null);
        setUserData(null);
      };
    }; return () => mounted = false;
  };

  const onEditProfile = async () => {
    if (profileChecked) {
      setIsLoading(true);
      const [err, data] = await tryToCatch(
        UserService.editProfileService, token, {username: currentUsername, email: currentEmail});
      console.log(data);
      if (err || data.error) setError(err ? error : data.error);
      else setNewUserData(data.detail);
      setReload(true);
      setIsLoading(false);
    } else {
      return <CheckPasswords text="Edit profile" setChecked={setProfileChecked} />
    }
  };

  const onEditCluster = async payload => {
    setIsLoading(true);
    const [err, data] = await tryToCatch(ClusterService.updateClusterService, token, payload);
    if (err || data.error) setError(err ? error : data.error);
    else setReload(true);
    setIsLoading(false); 
  };

  const onChangePassword = async passowrd => {
    setIsLoading(true);
    const [err, data] = await tryToCatch(UserService.changePasswordService, token, passowrd);
    if (err || data.error) setError(err ? error : data.error);
    else setReload(true);
    setIsLoading(false);
  };

  const onDeleteUserAccount = async () => {
    setIsLoading(true);
    const [err, data] = await tryToCatch(UserService.deleteUserAccountService, token);
    if (err || data.error) setError(err ? error : data.error);
    else setReload(true);
    setIsLoading(false);
  };

  const onDeleteUserCluster = async () => {
    setIsLoading(true);
    const [err, data] = await tryToCatch(ClusterService.deleteClusterService, token);
    if (err || data.error) setError(err ? error : data.error);
    else setReload(true);
    setIsLoading(false); 
  };

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      mounted && setIsLoading(true);
      const [err, data] = await tryToCatch(ClusterService.myClusterService, token);
      if (err || data.error) {
        mounted && setError(err ? error : data.error);
        mounted && setIsLoading(false)
      } else {
        mounted && setClusterData(data.detail);
        mounted && setIsLoading(false)
      };
      setReload(false);
    };

    loadData();

    return () => mounted = false;
  }, [isFocused, reload]);

  const {name, shared} = clusterData;

  return (
    <ViewContainer>
      {
        isLoading 
          ? <LoadingIndicator />
          : <SettingComponent 
              clusterData={{name, shared}}
              currentUsername={currentUsername}
              currentEmail={currentEmail}
              setCurrentEmail={setCurrentEmail}
              setCurrentUsername={setCurrentUsername}
              avatar={avatar}
              onLogout={onLogout} 
              onEditProfile={onEditProfile}
              onEditCluster={onEditCluster}
              onChangePassword={onChangePassword}
              onDeleteUserAccount={onDeleteUserAccount}
              onDeleteUserCluster={onDeleteUserCluster}
            />
      }
    </ViewContainer>

  );
};
