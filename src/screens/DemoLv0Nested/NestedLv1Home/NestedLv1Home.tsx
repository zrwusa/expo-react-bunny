import * as React from "react";
import {View, ButtonTO, TextBtn} from "../../../components/base-ui";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {DemoNestedLv1StackParam} from "../../../types/stacks";
import containerStyle from "../../../containers";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../lang/short-t";

type NestedLv1HomeRouteProp = RouteProp<DemoNestedLv1StackParam, 'NestedLv1Home'>;
type NestedLv1HomeNavigationProp = StackNavigationProp<DemoNestedLv1StackParam, 'NestedLv1Home'>;
export type NestedLv1HomeProps = { route: NestedLv1HomeRouteProp, navigation: NestedLv1HomeNavigationProp }

function NestedLv1HomeScreen({route, navigation}: NestedLv1HomeProps) {
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.NestedLv1Home');
    return (
        <View style={containerStyle.screen}>
            <View style={containerStyle.card}>
                <ButtonTO onPress={() => navigation.navigate('NestedLv1Settings', {item: "001"})}>
                    <TextBtn>{st(`goToNestedLv1Settings`)}</TextBtn>
                </ButtonTO>
            </View>
        </View>
    );
}


export default NestedLv1HomeScreen;
