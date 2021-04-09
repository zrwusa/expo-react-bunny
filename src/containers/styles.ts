import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../types";
import {createSmartStyles} from "../utils";

export const createContainerStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {smartStylesObj} = createSmartStyles(sizeLabor, themeLabor);
    const {ms} = sizeLabor;
    const {colors} = themeLabor.theme;
    return StyleSheet.create({
        Card: {
            margin: ms.sp.m,
            paddingHorizontal:ms.sp.m,
            paddingBottom:ms.sp.m,
            borderColor: colors.border,
            borderWidth: ms.sp.xxs,
            borderRadius: ms.br.s,
        },
        RowCard: {
            margin: ms.sp.m,
            padding: ms.sp.m,
            borderColor: colors.border,
            borderWidth: ms.sp.xxs,
            borderRadius: ms.br.s,
            ...smartStylesObj.row,
            ...smartStylesObj.evenly
        },
        CardTitle: {
            ...smartStylesObj.h3,
            marginVertical:ms.sp.m,
        },
        Screen: {
            flex: 1,
        },
        FullFill: {
            flex: 1
        },
        Box: {
            padding: ms.sp.m
        }
    });
}
