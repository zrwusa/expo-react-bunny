import React from "react"
import {Text, View} from "../../../components/UI";
import {FlatList, TouchableOpacity} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {ChatRoom, DemoChatStackParam, RootState} from "../../../types";
import {StackNavigationProp} from "@react-navigation/stack";
import {useSelector} from "react-redux";
import {useFirebaseConnect} from "react-redux-firebase";
import {Row} from "../../../containers/Row";
import {getStyles} from "./styles";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import {Col} from "../../../containers";
import {useBunnyKit} from "../../../hooks/bunny-kit";
import {Divider} from "../../../components/Divider";

type ChatHomeRouteProp = RouteProp<DemoChatStackParam, 'ChatHome'>;
type ChatHomeNavigationProp = StackNavigationProp<DemoChatStackParam, 'ChatHome'>;

export interface ChatHomeProps {
    route: ChatHomeRouteProp,
    navigation: ChatHomeNavigationProp
}

export function ChatHomeScreen({route, navigation}: ChatHomeProps) {
    useFirebaseConnect([{path: 'chatRooms', queryParams: []}])
    const {wp} = useBunnyKit()
    const chatRooms = useSelector((rootState: RootState) => rootState.firebaseState.ordered.chatRooms)
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = getStyles(sizeLabor, themeLabor)
    const handleRoomPress = (key: string) => {
        navigation.navigate('ChatRoom', {roomKey: key})
    }

    const renderItem = (item: { key: string, value: ChatRoom }) => {
        return (
            <TouchableOpacity onPress={() => handleRoomPress(item.key)}>
                <Row paddingVertical="xxl">
                    <Col size={1}>
                        <Text>{item.value.name}</Text>
                    </Col>
                    <Col size={3} style={{alignItems:'center'}}>
                        <Text>{item.value.name}</Text>
                    </Col>
                </Row>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.screen}>
            <FlatList
                data={chatRooms}
                renderItem={({item}) => renderItem(item)}
                keyExtractor={(item) => item.key}
                ItemSeparatorComponent={()=><Divider/>}
            />
        </View>
    )
}
