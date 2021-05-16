import {useBunnyKit} from "../../hooks/bunny-kit";
import {Image, ScrollView, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useKeyboardHeight} from "../../hooks/keyboard-height";
import {useFirebase} from "react-redux-firebase";
import {Sticker} from "../../types";
import {getStyles} from "./styles";

export interface StickerPickerProps {
    isShow: boolean,
    onValueChanged: (uri: string) => void
}

export const StickerPicker = ({isShow = false, onValueChanged}: StickerPickerProps) => {
    const {sizeLabor, themeLabor} = useBunnyKit()
    const {currentHeight} = useKeyboardHeight()
    const [stickers, setStickers] = useState<Sticker[]>([])
    const firebase = useFirebase();
    const styles = getStyles(sizeLabor, themeLabor)

    useEffect(() => {
        (async function f() {
            let stickers = []

            // for (let i = 0; i < 20; i++) {
            //     stickers.push({id: uuidV4(), url: 'https://raw.githubusercontent.com/zrwusa/assets/master/images/mcenany-avatar.jpeg'})
            // }
            // setStickers(stickers)

            const shaunTheSheepRef = firebase.storage().ref('ShaunTheSheep256/')
            const result = await shaunTheSheepRef.listAll()

            for (const imageRef of result.items) {
                const url = await imageRef.getDownloadURL();
                stickers.push({id: imageRef.fullPath, url})
            }
            setStickers(stickers)
        })()
    }, [])

    return isShow
        ? <View style={{height: currentHeight || 346}}>
            <ScrollView contentContainerStyle={styles.panel}>
                {
                    stickers.map((sticker => {
                        return <View key={sticker.id}>
                            <TouchableOpacity onPress={async () => {
                                onValueChanged && onValueChanged(sticker.url)
                            }}>
                                <Image style={styles.stickerImage} source={{uri: sticker.url}}/>
                            </TouchableOpacity>
                        </View>
                    }))
                }
            </ScrollView>
        </View>
        : null
}
