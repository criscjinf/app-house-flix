import React from 'react';
import { ViewStyle } from 'react-native';

interface PlatformWebViewProps {
  source: { uri: string };
  style?: ViewStyle;
  allowsFullscreenVideo?: boolean;
}

// Para a Web, renderizamos um <iframe>
export function PlatformWebView({ source, style, allowsFullscreenVideo }: PlatformWebViewProps) {
  return (
    <iframe
      src={source.uri}
      style={{
        ...(style as object), // Converte o estilo do React Native para CSS
        width: '100%',
        height: '100%',
        borderWidth: 0,
      }}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen={allowsFullscreenVideo}
    />
  );
}
