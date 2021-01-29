import AsyncStorageNext from "../../utils/AsyncStorageNext";
import {Action, ActionCreator, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {Sys} from "../../types/models";
import {
    RestoreIsReadyPayload, RestoreLanguagePayload, RestoreNavInitialStatePayload,
    RestoreThemePayload, SysErrorPayload, SysWarnPayload
} from "../../types/payloads";
import {
    RestoreIsReady, RestoreLanguage, RestoreNavInitialState,
    RestoreTheme, SysError, SysWarn
} from "../../types/actions";
import {ESys} from "../../utils/constants";
import BunnyConstants from "../../utils/constants";

export const sysError: (payload: SysErrorPayload) => SysError = (payload) => {
    return {
        type: ESys.ERROR,
        payload: payload,
    };
};

export const sysWarn: (payload: SysWarnPayload) => SysWarn = (payload) => {
    return {
        type: ESys.WARN,
        payload: payload,
    };
};

export const restoreTheme: (payload: RestoreThemePayload) => RestoreTheme = (payload) => {
    return {
        type: ESys.RESTORE_THEME,
        payload: payload,
    };
};

export const restoreAndSaveTheme: ActionCreator<ThunkAction<Promise<Action>, Sys, void, RestoreTheme>> = (payload: RestoreThemePayload) => {
    return async (dispatch: Dispatch<RestoreTheme | SysError>): Promise<Action> => {
        let result;
        try {
            await AsyncStorageNext.setItem(BunnyConstants.THEME_NAME_PERSISTENCE_KEY, payload.themeName);
            result = dispatch(restoreTheme(payload))
        } catch (err) {
            result = dispatch(sysError({error: err.toString()}))
        }
        return result;
    };
};

export const restoreLanguage: (payload: RestoreLanguagePayload) => RestoreLanguage = (payload) => {
    return {
        type: ESys.RESTORE_LANGUAGE,
        payload: payload,
    };
};

export const restoreAndSaveLanguage: ActionCreator<ThunkAction<Promise<Action>, Sys, void, RestoreLanguage>> = (payload: RestoreLanguagePayload) => {
    return async (dispatch: Dispatch<RestoreLanguage | SysError>): Promise<Action> => {
        let result;
        try {
            await AsyncStorageNext.setItem(BunnyConstants.LANGUAGE_TYPE_PERSISTENCE_KEY, payload.language);
            result = dispatch(restoreLanguage(payload))
        } catch (err) {
            result = dispatch(sysError({error: err.toString()}))
        }
        return result;
    };
};

export const restoreNavInitialState: (payload: RestoreNavInitialStatePayload) => RestoreNavInitialState = (payload) => {
    return {
        type: ESys.RESTORE_NAV_INITIAL_STATE,
        payload: payload,
    };
};

export const restoreIsReady: (payload: RestoreIsReadyPayload) => RestoreIsReady = (payload) => {
    return {
        type: ESys.RESTORE_IS_READY,
        payload: payload,
    };
};

export type SysActions = RestoreIsReady | SysError | SysWarn | RestoreTheme | RestoreLanguage | RestoreNavInitialState;
