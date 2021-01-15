import * as React from "react";
import {Platform, StatusBar, Text} from "react-native";
import {
    DarkTheme as DarkThemeNav, DefaultTheme as DefaultThemeNav,
    NavigationContainer, InitialState
} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {restoreAuth} from "./stores/auth/actions";
import * as Linking from "expo-linking";
import {restoreTheme, sysError} from "./stores/sys/actions";
import RootNavigator, {getConfig} from "./navigator/RootNavigator";
import {Provider as PaperProvider} from 'react-native-paper';
import {ThemeProvider} from './components/base-ui/theme/theming';
import DefaultTheme from "./components/base-ui/theme/styles/DefaultTheme";
import DarkTheme from "./components/base-ui/theme/styles/DarkTheme";

import {RootState, ThemeNames} from "./types/models";
import BunnyConstants from "./common/constants";
import {EThemes} from "./types/enums";

const basePath = Linking.makeUrl('/');
const linking = {prefixes: [basePath], config: {initialRouteName: "Home", screens: getConfig()}};

function App() {
    const [isReady, setIsReady] = React.useState(false);
    const [navInitialState, setNavInitialState] = React.useState<InitialState | undefined>();
    const {themeName} = useSelector((rootState: RootState) => rootState.sysState)
    const theme = themeName === 'DARK' ? DarkTheme : DefaultTheme;
    const dispatch = useDispatch();
    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let accessToken, user;
            try {
                const themeNameSaved = await AsyncStorage.getItem(BunnyConstants.THEME_NAME_PERSISTENCE_KEY);
                const themeName: ThemeNames = (themeNameSaved === EThemes.DARK) ? EThemes.DARK : EThemes.DEFAULT;
                dispatch(restoreTheme({themeName: themeName}))

                accessToken = await AsyncStorage.getItem('accessToken');
                user = await AsyncStorage.getItem('user');
                accessToken && dispatch(restoreAuth({
                    access_token: accessToken,
                    user: user ? JSON.parse(user) : {}
                }));

                if (Platform.OS !== 'web') {
                    const savedState = await AsyncStorage.getItem(BunnyConstants.NAV_STATE_PERSISTENCE_KEY);
                    const state = savedState ? JSON.parse(savedState) : undefined;

                    if (state !== undefined) {
                        setNavInitialState(state);
                    }
                }
            } catch (err) {
                dispatch(sysError(err.toString()));
            } finally {
                setIsReady(true);
            }
        };
        bootstrapAsync()
            .catch((err) => dispatch(sysError(err.toString())));
    }, []);

    return isReady
        ? (
            <ThemeProvider theme={theme}>
                <PaperProvider theme={theme}>
                    {Platform.OS === 'ios' && (
                        <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'}/>
                    )}
                    <NavigationContainer linking={linking}
                                         theme={theme?.dark ? DarkThemeNav : DefaultThemeNav}
                                         fallback={<Text>Fallback loading...</Text>}
                                         initialState={navInitialState}
                                         onStateChange={(state) =>
                                             AsyncStorage.setItem(
                                                 BunnyConstants.NAV_STATE_PERSISTENCE_KEY,
                                                 JSON.stringify(state)
                                             )
                                         }>
                        <RootNavigator/>
                    </NavigationContainer>
                </PaperProvider>
            </ThemeProvider>
        )
        : (<Text>Preparing resources</Text>)
}

export default App;
