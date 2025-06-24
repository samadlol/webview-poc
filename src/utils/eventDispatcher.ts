

export interface MyWindow extends Window {
    ReactNativeWebView?: {
        postMessage: (message: string) => void;
    };
}

export const isWebViewEnv = () => {
    return !!(window as MyWindow).ReactNativeWebView;
}

export const postMessage = (message: unknown) => {
    let _window = window as MyWindow;
    if (typeof _window.ReactNativeWebView !== 'undefined') {
        return _window.ReactNativeWebView.postMessage(JSON.stringify(message));
    }
    return null;
}
