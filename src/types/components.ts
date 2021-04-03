import {NavigationAction} from "@react-navigation/core";
import React from "react";
import {GestureResponderEvent, TextProps} from "react-native";

export type LinkProps = {
    to: string;
    action?: NavigationAction;
    target?: string;
    onPress?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent) => void;
} & (TextProps & {
    children: React.ReactNode;
});


export type Brick = {
    id: string,
    text: string,
    uri: string
}

export type MasonryDatum = {
    id: string,
    column1: Brick[],
    column2: Brick[],
    column3: Brick[],
}

