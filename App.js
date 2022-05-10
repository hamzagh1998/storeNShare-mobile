import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Lato_400Regular, useFonts } from '@expo-google-fonts/lato';
import { Cabin_400Regular } from "@expo-google-fonts/cabin";
import axios from "axios";

import { UserContextProvider } from "./src/context/user.context";
import { ModeContextProvider } from "./src/context/mode.context";

import { theme } from "./src/infrastructure/theme";

import { Nvaigation } from "./src/infrastructure/navigations";


export default function App() {

  const [latoLoaded] = useFonts({Lato_400Regular});
  const [cabindLoaded] = useFonts({Cabin_400Regular});

  if (!cabindLoaded || !latoLoaded) return null;

  const themes = {...theme, colors: theme.light};

  axios.defaults.baseURL = "http://192.168.1.19:4000/api/v1";
  
  return (
    <>   
      <ModeContextProvider>
        <UserContextProvider>
          <Nvaigation />
        </UserContextProvider>
      </ModeContextProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
};
