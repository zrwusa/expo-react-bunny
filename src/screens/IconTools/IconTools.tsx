import React, {useState} from "react";
import {ButtonTO, TextInput, View, InButtonText} from "../../components/UI";
import {useThemeLabor} from "../../providers/theme-labor";
import {ScrollView} from "react-native";
import {createStyles} from "./styles";
import {useSizeLabor} from "../../providers/size-labor";
import {Card} from "../../containers";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../providers/i18n-labor";
import {glyphIcoMoonMap} from "../../helpers";


export function IconToolsScreen() {
    const {t} = useTranslation()
    const st = shortenTFunctionKey(t, 'screens.IconTools')
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const dispatch = useDispatch()
    const {themes} = themeLabor;
    const styles = createStyles(sizeLabor, themeLabor)

    const [glyph, setGlyph] = useState('')
    const handleGenerate = () => {
        setGlyph(JSON.stringify(glyphIcoMoonMap))
    }
    const [inputHeight,setInputHeight] = useState(0)
    return (
        <ScrollView style={{flex: 1}}>
            <View style={styles.container}>
                <Card title={st('colorInput')}>
                    <TextInput style={{height: Math.max(35, inputHeight)}}
                               multiline
                               editable={false}
                               onContentSizeChange={(event) => {
                                   setInputHeight(event.nativeEvent.contentSize.height)
                               }}
                               value={glyph}/>
                    <ButtonTO onPress={handleGenerate}><InButtonText>{st('generate')}</InButtonText></ButtonTO>
                </Card>
            </View>
        </ScrollView>
    )
}
