import React, {Component} from 'react';
import {View, Text} from "../../components/base-ui";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParam} from "../../types/stacks";
import styles from "./styles";
import {withTranslation, WithTranslation} from 'react-i18next';
import {stFactory} from "../../lang/short-t";
import containerStyle from "../../containers";

type ProfileRouteProp = RouteProp<RootStackParam, 'DemoRoute'>;
type ProfileNavigationProp = StackNavigationProp<RootStackParam, 'DemoRoute'>;

export type DemoRouteProps = { route: ProfileRouteProp; navigation: ProfileNavigationProp; } & WithTranslation;

class DemoRouteScreen extends Component<DemoRouteProps> {
    constructor(props: DemoRouteProps) {
        super(props);
    }

    render(): React.ReactNode {
        const {id, isHuman, sort} = this.props.route.params;
        const {t} = this.props;
        const st = stFactory(t, 'screens.DemoRoute');
        return (
            <View style={[containerStyle.screen, containerStyle.centralized]}>
                <View style={styles.wrap}>
                    <Text>{st(`paramId`)}{id}</Text>
                    <Text>{st(`typeofId`)}{typeof id}</Text>
                    <Text>{st(`paramIsHuman`)}{isHuman.toString()}</Text>
                    <Text>{st(`typeofIsHuman`)}{typeof isHuman}</Text>
                    <Text>{st(`paramSort`)}{sort}</Text>
                    <Text>{st(`typeofSort`)}{typeof sort}</Text>
                </View>
            </View>
        );
    }
}

export default withTranslation()(DemoRouteScreen);
