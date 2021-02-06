import * as React from "react";
import {View, Text, ButtonTO, TextBtn, IcoMoon} from "../../components/base-ui";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParam} from "../../types/stacks";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../lang/short-t";
import {useSelector} from "react-redux";
import {RootState} from "../../types/models";
import {Avatar} from "react-native-elements";
import {ScrollView} from "react-native";
import {getStyles} from "./styles";
import ImageProgressive from "../../components/base-ui/ImageProgressive";
import getContainerStyles from "../../containers";
import {useSmartStyle} from "../../styles/smart-style";

type ProfileRouteProp = RouteProp<RootStackParam, 'Profile'>;
type ProfileNavigationProp = StackNavigationProp<RootStackParam, 'Profile'>;
type Props = { route: ProfileRouteProp; navigation: ProfileNavigationProp; };

function ProfileScreen({route, navigation}: Props) {
    const {user} = useSelector((rootState: RootState) => rootState.authState);
    const styles = getStyles()
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.Profile');
    const avatar_url = 'https://raw.githubusercontent.com/zrwusa/assets/master/images/alert-orange-border.png';
    const smartStyle = useSmartStyle();
    const containerStyles = getContainerStyles(smartStyle);

    return (
        <ScrollView>
            <View style={[containerStyles.screen, containerStyles.centralized]}>
                <Avatar source={{uri: avatar_url}}/>
                <Text>{st(`profileScreenId`)}{route.params.id}</Text>
                <Text>{st(`email`)}{user?.email}</Text>
                <IcoMoon name="profile1" color="green"/>
                <ImageProgressive
                    sourcePH={{uri: `https://raw.githubusercontent.com/zrwusa/assets/master/images/pexels-5451714-placeholder.jpg`}}
                    source={{uri: `https://raw.githubusercontent.com/zrwusa/assets/master/images/pexels-5451714-medium.jpg`}}
                    style={styles.imageProgressive}
                    resizeMode="cover"
                />
                <ButtonTO onPress={() => navigation.navigate('Home')}>
                    <TextBtn>{st(`goToHomeScreen`)}</TextBtn>
                </ButtonTO>
                <View style={styles.tallBlock}/>
            </View>
        </ScrollView>
    )
}

export default ProfileScreen;
