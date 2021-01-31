import * as React from "react";
import {View, ButtonTO, TextBtn} from "../../../../components/base-ui";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {DemoNestedLv2StackParam} from "../../../../types/stacks";
import containerStyle from "../../../../containers";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../../lang/short-t";

type NestedLv2HomeRouteProp = RouteProp<DemoNestedLv2StackParam, 'NestedLv2Home'>;
type NestedLv2HomeNavigationProp = StackNavigationProp<DemoNestedLv2StackParam, 'NestedLv2Settings'>;
export type NestedLv2HomeProps = { route: NestedLv2HomeRouteProp, navigation: NestedLv2HomeNavigationProp }

function NestedLv2HomeScreen({route, navigation}: NestedLv2HomeProps) {
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.NestedLv2Home');
    return (
        <View style={containerStyle.screen}>
            <View style={containerStyle.card}>
                <ButtonTO onPress={() => navigation.navigate('NestedLv2Settings', {itemlv2: "001"})}>
                    <TextBtn>{st(`goToNestedLv2Settings`)}</TextBtn>
                </ButtonTO>
            </View>
        </View>
    );
}


export default NestedLv2HomeScreen;
