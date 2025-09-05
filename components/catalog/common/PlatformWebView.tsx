import { WebView, WebViewProps } from 'react-native-webview';

// Para iOS e Android, exportamos o WebView original
export const PlatformWebView = (props: WebViewProps) => <WebView {...props} />;
