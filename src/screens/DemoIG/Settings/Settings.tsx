import * as React from "react";
import {Text, View} from "../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {BottomTabNavigationProp} from "react-navigation-bottom-tabs-no-warnings";
import {DemoIGStackParam} from "../../../types";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../../providers/i18n-labor";
import {Card, createContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import {SafeAreaView} from "react-native";
import {createStyles} from "./styles";


type IGSettingsRouteProp = RouteProp<DemoIGStackParam, 'IGSettings'>;
type IGSettingsNavigationProp = BottomTabNavigationProp<DemoIGStackParam, 'IGSettings'>;

export interface IGSettingsProps {
    route: IGSettingsRouteProp,
    navigation: IGSettingsNavigationProp
}

export function IGSettingsScreen({route, navigation}: IGSettingsProps) {
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'screens.IGSettings');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {theme} = themeLabor
    const containerStyles = createContainerStyles(sizeLabor, themeLabor);
    const styles = createStyles(sizeLabor, themeLabor)

    return (
        <SafeAreaView style={containerStyles.Screen}>
                     <Card title={st(`title`)}>
                         <Text>{route.params.item}</Text>
                     </Card>
        </SafeAreaView>
    );
}
