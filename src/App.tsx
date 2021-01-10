import * as React from "react";
import {Text} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {restoreAuth} from "./stores/auth/actions";
import * as Linking from "expo-linking";
import {sysError} from "./stores/sys/actions";
import RootNavigator, {getConfig} from "./navigator/RootNavigator";

const basePath = Linking.makeUrl('/');

const linking = {prefixes: [basePath], config: {initialRouteName: "Home", screens: getConfig()}};

function App() {
    const dispatch = useDispatch();
    const [isReady, setIsReady] = React.useState(false);
    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let accessToken,user;
            try {
                accessToken = await AsyncStorage.getItem('accessToken');
                user = await AsyncStorage.getItem('user');
                accessToken && dispatch(restoreAuth({
                    access_token: accessToken,
                    user: user?JSON.parse(user):{}
                }));
                setIsReady(true);
            } catch (err) {
                dispatch(sysError(err.toString()));
            }
        };
        bootstrapAsync()
            .catch((err) => dispatch(sysError(err.toString())));
    }, []);

    return isReady
        ? (
            <>
                <NavigationContainer linking={linking} fallback={<Text>Fallback loading...</Text>}>
                    <RootNavigator/>
                </NavigationContainer>
            </>
        )
        : (<Text>Preparing resources</Text>)
}

export default App;
