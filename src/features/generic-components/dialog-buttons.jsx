import React from "react";
import { Button } from "react-native-paper";

export const DeleteButton = ({onPress}) => <Button 
                                    width="50%" 
                                    style={{marginRight: 5, justifyContent: "center"}}
                                    mode="contained"
                                    icon="delete"
                                    compact={true}
                                    color="#f55"
                                    onPress={onPress}
                                  >Delete</Button>;
                    
export const CancelButton = ({onPress}) => <Button 
                                    width="50%" 
                                    style={{justifyContent: "center"}}
                                    mode="contained"
                                    icon="cancel"
                                    compact={true}
                                    color="#7ed1d9"
                                    onPress={onPress}
                                  >Cancel</Button>;