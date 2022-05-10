import React, { useState, useContext} from "react";
import { Switch, Button as PaperButton } from "react-native-paper";
import { ScrollView } from "react-native";
import { useTheme } from "styled-components/native";
import { Avatar, List, TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'; 

import { UserContext } from "../../../../context/user.context";
import { ModeContext } from "../../../../context/mode.context";

import { ImageContainer, Hr, ContentConatiner, RowContainer, ModeContainer } from "./styles";

import { Spacer } from "../../../../components/spacer/spacer";

import { Text, Button } from "../../../../components/utilities";

export function SettingComponent(
  { 
    clusterData,
    currentUsername, 
    currentEmail,
    setCurrentUsername,
    setCurrentEmail,
    avatar,
    onLogout,
    onEditProfile,
    onEditCluster,
    onChangePassword,
    onDeleteUserAccount,
    onDeleteUserCluster
  }
  ) {

  const { userData: {username, email}} = useContext(UserContext) || {};
  const { mode, setNewMode } = useContext(ModeContext) || {};

  const { colors } = useTheme();

  const [expandedProfile, setExpandedProfile] = useState(false);
  const [expandedChangePassword, setExpandedChangePassword] = useState(false);
  const [expandedPrivacy, setExpandedPrivacy] = useState(false);
  const [expandedDanger, setExpandedDanger] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewpassword, setConfirmNewpassword] = useState("");
  const [clusterName, setClusterName] = useState(clusterData.name);
  const [shared, setShared] = useState(clusterData.shared);

  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/; // to validate email address!

  return (
    <>
      <ModeContainer onPress={() => setNewMode(mode === "md-sunny" ? "md-moon" : "md-sunny")}>
        <Ionicons name={mode} size={34} color={colors.ui.secondary} />
      </ModeContainer>
      <Text variant="label">Settings</Text>
      <Spacer size="large" />
      <ImageContainer>
        <Avatar.Image size={160} style={{ backgroundColor: colors.bg.secondary }} source={{ uri: avatar }} />
      </ImageContainer>
      <PaperButton icon="logout" mode="outlined" onPress={onLogout} color="#7f8c8d">
        Logout
      </PaperButton>
      <Spacer/>
      <Text variant="cover">{ username }</Text>
      <Hr />
      <Spacer />
      <ContentConatiner>
        <ScrollView style={{width: "100%"}}>
          {/* Edit Profile */}
          <List.Accordion
            style={{backgroundColor: colors.ui.primary}}
            title="Edit Profile"
            left={props => <List.Icon {...props} icon="account" />}
            expanded={expandedProfile}
            onPress={() => setExpandedProfile(!expandedProfile)}
          >
            <TextInput 
              label="Username"
              value={currentUsername} 
              placeholder="Enter your username" 
              onChangeText={value => setCurrentUsername(value)}
            />
            <TextInput 
              label="Email"
              value={currentEmail} 
              placeholder="Enter your username" 
              onChangeText={value => setCurrentEmail(value)}
            />
            { 
              ((username !== currentUsername || email !== currentEmail) && (reg.test(currentEmail.trim()) && currentUsername.length))
                ? <Button icon="update" mode="contained" size="small" onPress={onEditProfile}>
                   Update
                  </Button>
                : null
            }
          </List.Accordion>
          {/* Edit Cluster */}
          <List.Accordion
            style={{backgroundColor: colors.ui.primary}}
            title="Edit Cluster"
            left={props => <List.Icon {...props} icon="collapse-all" />}
            expanded={expandedPrivacy}
            onPress={() => setExpandedPrivacy(!expandedPrivacy)}
          >
            <RowContainer>
              <Text variant="label">Public:</Text>
              <Switch value={shared} onValueChange={() => setShared(!shared)} />
            </RowContainer>
            <TextInput 
              label="Cluster name"
              value={clusterName} 
              placeholder="Enter your cluster name" 
              onChangeText={value => setClusterName(value)}
            />
            { 
              ((clusterName !== clusterData.name || shared !== clusterData.shared) && clusterName.length)
                ? <Button 
                    icon="update" 
                    mode="contained" 
                    size="small" 
                    onPress={() => onEditCluster({name: clusterName, shared})}
                  >
                    Update
                  </Button>
                : null
            }
          </List.Accordion>
          {/* change password */}
          <List.Accordion
            style={{backgroundColor: colors.ui.primary}}
            title="Change Password"
            left={props => <List.Icon {...props} icon="key" />}
            expanded={expandedChangePassword}
            onPress={() => setExpandedChangePassword(!expandedChangePassword)}
          >
            <TextInput 
              label="New password"
              value={newPassword} 
              placeholder="Enter your new password" 
              secureTextEntry={true}
              onChangeText={value => setNewPassword(value)}
            />
            <TextInput 
              label="confirm new password"
              value={confirmNewpassword} 
              placeholder="Confirm your new password" 
              secureTextEntry={true}
              onChangeText={value => setConfirmNewpassword(value)}
            />
            { 
              ( 
                newPassword.length >= 6 && confirmNewpassword.length >= 6
                && newPassword === confirmNewpassword
              ) 
                ? <Button 
                    icon="update" 
                    mode="contained" 
                    size="small"
                    onPress={() => onChangePassword(newPassword)}>
                    Update
                  </Button> 
                : null
            }
            {
              newPassword !== confirmNewpassword 
              && <Text variant="error">Two passwords didn't match</Text>
            }
            {
              newPassword.length < 6 
              && <Text variant="error">Password must contain at least 6 character</Text>
            }
          </List.Accordion>
          {/* Danger */}
          <List.Accordion
            style={{backgroundColor: colors.ui.primary}}
            title="Danger zone"
            left={props => <List.Icon {...props} icon="alert-octagram" />}
            expanded={expandedDanger}
            onPress={() => setExpandedDanger(!expandedDanger)}
          >
            <PaperButton 
              icon="trash-can" 
              mode="text" 
              color={colors.bgButton.secondary} 
              onPress={onDeleteUserCluster}
            >
              Delete Cluster
            </PaperButton>
            <Spacer />
            <PaperButton 
              icon="trash-can" 
              mode="text" 
              color={colors.bgButton.secondary}
              onPress={onDeleteUserAccount}
            >
              Delete Account
            </PaperButton>
          </List.Accordion>
        </ScrollView>
      </ContentConatiner>
    </>
  );
};
