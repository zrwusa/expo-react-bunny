import * as React from "react";
import {View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {DemoBitcoinStackParam} from "../../../types/stacks";
import {BottomTabNavigationProp} from "react-navigation-bottom-tabs-no-warnings";
import {Text} from "../../../components/base-ui"
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../lang/short-t";
import getContainerStyles from "../../../containers";
import {useSmartStyle} from "../../../styles/smart-style";

type BitcoinHomeRouteProp = RouteProp<DemoBitcoinStackParam, 'BitcoinHome'>;
type BitcoinHomeNavigationProp = BottomTabNavigationProp<DemoBitcoinStackParam, 'BitcoinHome'>;
export type BitcoinHomeProps = { route: BitcoinHomeRouteProp, navigation: BitcoinHomeNavigationProp }


function BitcoinHomeScreen({route, navigation}: BitcoinHomeProps) {
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.BitcoinHome');
    const smartStyle = useSmartStyle();
    const containerStyles = getContainerStyles(smartStyle);
    return (
        <View style={containerStyles.screen}>
            <View style={containerStyles.card}>
                <Text>{st(`title`)}</Text>
            </View>
        </View>
    );
}

export default BitcoinHomeScreen;
