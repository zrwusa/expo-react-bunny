import * as React from "react";
import {useEffect, useState} from "react";
import {Platform, View} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {RouteProp} from "@react-navigation/native";
import {BottomTabNavigationProp} from "react-navigation-bottom-tabs-no-warnings";
import {DemoBitcoinStackParam} from "../../../types";
import {ButtonTO, Text, TextBtn} from "../../../components/UI";
import {useTranslation} from "react-i18next";
import {shortenTFuciontKey, useRequest} from "../../../providers";
import {getContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import * as Notifications from "expo-notifications";
import {initialedNotification, registerForPushNotificationsAsync} from "../../../utils/expo-notification";
import {sysError} from "../../../store/actions";
import {useDispatch} from "react-redux";
import {collectBusinessLogicInfo} from "../../../store/actions/business-logic";
import {businessLogicInfo} from "../../../helpers";

type BitcoinAlertRouteProp = RouteProp<DemoBitcoinStackParam, 'BitcoinAlert'>;
type BitcoinAlertNavigationProp = BottomTabNavigationProp<DemoBitcoinStackParam, 'BitcoinAlert'>;

export interface BitcoinAlertProps {
    route?: BitcoinAlertRouteProp,
    navigation?: BitcoinAlertNavigationProp
}

export default function BitcoinAlertScreen({route, navigation}: BitcoinAlertProps) {
    const {t} = useTranslation();
    const st = shortenTFuciontKey(t, 'screens.BitcoinAlert');
    const i18nSysPrefix = 'sys';
    const stSys = shortenTFuciontKey(t, i18nSysPrefix);
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const dispatch = useDispatch()

    let notificationReceivedListener = {
        remove: () => {
        }
    };
    let notificationRespondedListener = {
        remove: () => {
        }
    };


    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(initialedNotification);
    const [granularity, setGranularity] = useState(0.05)
    const request = useRequest();

    const saveAlertSetting = async function () {
        try {
            await request.post('/push-service/alert-settings', {toke: expoPushToken})
        } catch (err) {
            dispatch(sysError({error: err}))
        }
    }

    const saveQuickAlertSettings = async function () {
        console.log('---saveQuickAlertSettings',expoPushToken)
        if (!expoPushToken) {
            dispatch(collectBusinessLogicInfo({error: businessLogicInfo('no expoPushToken')}))
        } else {
            try {
                await request.post('/push-service/alert-quick-settings', {token: expoPushToken, granularity})
            } catch (err) {
                dispatch(sysError({error: err}))
            }
        }

    }

    const cancelAllAlertSettings = async function () {
        try {
            await request.delete(`/push-service/alert-settings?cancel_all=true&token=${expoPushToken}`)
        } catch (err) {
            dispatch(sysError({error: err}))
        }
    }

    useEffect(() => {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: false,
                shouldSetBadge: false,
            }),
        });
        const initPushNotification = async () => {
            const token = await registerForPushNotificationsAsync({
                failedToGetToken: stSys(`failedToGetToken`),
                mustUsePhysicalDevice: stSys(`mustUsePhysicalDevice`)
            })
            if (token) {
                setExpoPushToken(token);
            }
            try {
                await request.post('/push-service/devices', {type: "BITCOIN_ALERT", token})
            } catch (err) {
                dispatch(sysError({error: err}))
            }

            notificationReceivedListener = Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

            notificationRespondedListener = Notifications.addNotificationResponseReceivedListener(response => {
                console.log('---response', response);
            });
        }
        initPushNotification().then();
        return () => {
            Notifications.removeNotificationSubscription(notificationReceivedListener);
            Notifications.removeNotificationSubscription(notificationRespondedListener);
        };
    }, []);


    return Platform.OS !== 'web' ? (
        <View style={containerStyles.screen}>
            <View>
                <RNPickerSelect
                    value={granularity}
                    items={[
                        {label: '0.1%', value: 0.001},
                        {label: '1%', value: 0.01},
                        {label: '5%', value: 0.05},
                        {label: '10%', value: 0.1},
                        {label: '20%', value: 0.2},
                        {label: '30%', value: 0.3},
                    ]}
                    onValueChange={(itemValue) => setGranularity(itemValue)}
                >
                </RNPickerSelect>
            </View>
            <View>
                <Text>Your expo push token: {expoPushToken}</Text>
                {notification
                    ? <View style={containerStyles.centralized}>
                        <Text>Title: {notification.request.content.title} </Text>
                        <Text>Body: {notification.request.content.body}</Text>
                        <Text>Data: {JSON.stringify(notification.request.content.data)}</Text>
                    </View>
                    : null}
            </View>


            <ButtonTO onPress={saveAlertSetting}>
                <TextBtn>{st(`saveAlertSetting`)}</TextBtn>
            </ButtonTO>
            <ButtonTO onPress={saveQuickAlertSettings}>
                <TextBtn>{st(`saveQuickSettings`)}</TextBtn>
            </ButtonTO>
            <ButtonTO onPress={cancelAllAlertSettings}>
                <TextBtn>{st(`cancelAllAlertSettings`)}</TextBtn>
            </ButtonTO>
        </View>
    ) : (<Text>Dummy BitcoinAlert</Text>)
}

// export default BitcoinAlertScreen;
// import {View,Text} from "../../../components/base-ui";
// import React from 'react';
// export default function BitcoinAlertScreen(){
//     return (<View><Text>xxx</Text></View>)
// }
