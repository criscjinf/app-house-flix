import React, { useState } from 'react';
import { Image, Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { PlatformWebView } from './common/PlatformWebView';
import { CatalogItem } from './types';

interface CatalogCardProps {
  item: CatalogItem;
  onPress?: (item: CatalogItem) => void;
}

const CARD_WIDTH = 130;
const CARD_HEIGHT = 200;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable); // Usaremos um Pressable animado

// Helper para converter a URL do YouTube para uma URL de incorporação (embed)
const getYouTubeEmbedUrl = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  console.warn('Invalid YouTube URL provided:', url);
  return null;
};

export function CatalogCard({ item, onPress }: CatalogCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTrailerVisible, setTrailerVisible] = useState(false);
  const scale = useSharedValue(1);
  const detailsOpacity = useSharedValue(0);
  const detailsTranslateY = useSharedValue(10); // Começa 10px para baixo (invisível)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }], // A animação de escala é aplicada aqui
      zIndex: isHovered ? 10 : 1, // Garante que o card em foco fique sobre os outros
    };
  });

  const animatedDetailsStyle = useAnimatedStyle(() => {
    return {
      opacity: detailsOpacity.value,
      transform: [{ translateY: detailsTranslateY.value }],
    };
  });

  const handleHoverIn = () => {
    setIsHovered(true);
    // Usar withSpring para uma animação mais fluida e natural
    scale.value = withSpring(1.2, { damping: 15, stiffness: 120 });
    detailsOpacity.value = withTiming(1, { duration: 200 });
    detailsTranslateY.value = withTiming(0, { duration: 200 });
  };

  const handleHoverOut = () => {
    setIsHovered(false);
    scale.value = withSpring(1);
    detailsOpacity.value = withTiming(0, { duration: 150 });
    detailsTranslateY.value = withTiming(10, { duration: 200 });
  };

  const trailerEmbedUrl = getYouTubeEmbedUrl(item.trailer);

  // A prop `onHoverIn` é suportada em tvOS, Android TV e Web.
  // Para TV, onFocus e onBlur são os eventos principais para navegação com D-pad.
  // Mapeamos ambos para os mesmos handlers para um comportamento consistente.
  return (
    <>
      <AnimatedPressable
        style={[styles.container, animatedStyle]}
        onPress={() => onPress?.(item)}
        onHoverIn={handleHoverIn}
        onHoverOut={handleHoverOut}
        onFocus={handleHoverIn}
        onBlur={handleHoverOut}
      >
        <Image source={{ uri: item.poster }} style={styles.posterImage} resizeMode="cover" />

        <Animated.View
          style={[styles.detailsSection, animatedDetailsStyle]}
          pointerEvents={isHovered ? 'auto' : 'none'}
        >
          <Pressable
            style={styles.trailerButton}
            onPress={(e) => {
              e.stopPropagation(); // Impede que o clique no botão acione o clique do card.
              if (trailerEmbedUrl) setTrailerVisible(true);
            }}
            // Manter o estado de hover ao passar o mouse sobre o botão também.
            onHoverIn={handleHoverIn}
            // Garante que o botão seja o foco quando os detalhes estiverem visíveis na TV
            hasTVPreferredFocus={Platform.OS !== 'web' && isHovered}
          >
            <Text style={styles.trailerButtonText}>Trailer</Text>
          </Pressable>
        </Animated.View>
      </AnimatedPressable>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isTrailerVisible}
        onRequestClose={() => setTrailerVisible(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setTrailerVisible(false)}>
          <View style={styles.modalContent}>
            {trailerEmbedUrl ? (
              <PlatformWebView style={styles.webview} source={{ uri: trailerEmbedUrl }} allowsFullscreenVideo />
            ) : (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Trailer indisponível.</Text>
              </View>
            )}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden', // Garante que a imagem fique dentro das bordas arredondadas
    backgroundColor: '#141414', // Fundo do card, visível se a imagem não carregar
  },
  posterImage: {
    ...StyleSheet.absoluteFillObject, // Ocupa todo o espaço do container
    width: undefined, // Necessário para que o absoluteFillObject funcione corretamente
    height: undefined, // Necessário para que o absoluteFillObject funcione corretamente
    borderRadius: 8,
  },
  detailsSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#141414',
    padding: 10,
    borderBottomLeftRadius: 8, // Mantém as bordas arredondadas na parte de baixo
    borderBottomRightRadius: 8,
    alignItems: 'center',
  },
  trailerButton: {
    backgroundColor: '#e50914', // Vermelho Netflix
    paddingVertical: 8,
    borderRadius: 4,
    width: '100%',
    alignItems: 'center',
  },
  trailerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    height: '70%', // Ocupa 70% da altura da tela
    backgroundColor: '#000',
    borderRadius: 8,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
    backgroundColor: '#000',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
    fontSize: 16,
  },
});
