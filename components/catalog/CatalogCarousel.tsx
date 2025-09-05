import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import React, { useRef, useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { CatalogCard } from './CatalogCard';
import { CatalogItem } from './types';

interface CatalogCarouselProps {
  title: string;
  items: CatalogItem[];
  onCardPress?: (item: CatalogItem) => void;
}

export function CatalogCarousel({ title, items, onCardPress }: CatalogCarouselProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const flatListRef = useRef<FlatList<CatalogItem>>(null);

  // State para gerenciar o layout e a posição de rolagem para a visibilidade dos botões
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);

  // Determina se os botões de rolagem devem ser visíveis
  const canScrollLeft = scrollOffset > 1; // Usa um pequeno limiar para evitar problemas de ponto flutuante
  const canScrollRight = scrollOffset < contentWidth - carouselWidth - 1;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollOffset(event.nativeEvent.contentOffset.x);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!flatListRef.current) return;

    // Rola aproximadamente 90% da largura visível para um efeito de "página"
    const scrollAmount = carouselWidth * 0.9;
    const newOffset =
      direction === 'right'
        ? Math.min(scrollOffset + scrollAmount, contentWidth - carouselWidth)
        : Math.max(0, scrollOffset - scrollAmount);

    flatListRef.current.scrollToOffset({ offset: newOffset, animated: true });
  };

  // Mostra os botões apenas na web e se houver conteúdo para rolar
  const showButtons = Platform.OS === 'web' && contentWidth > carouselWidth;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: Colors[colorScheme].text }]}>{title}</Text>
      <View style={styles.carouselWrapper} onLayout={(event) => setCarouselWidth(event.nativeEvent.layout.width)}>
        {showButtons && canScrollLeft && (
          <Pressable
            style={({ hovered }) => [
              styles.arrowButton,
              styles.arrowLeft,
              { backgroundColor: hovered ? 'rgba(20, 20, 20, 0.7)' : 'transparent' },
            ]}
            onPress={() => scroll('left')}
          >
            <IconSymbol name="chevron.left" size={28} color="#fff" />
          </Pressable>
        )}
        <FlatList
          ref={flatListRef}
          data={items}
          renderItem={({ item }) => <CatalogCard item={item} onPress={onCardPress} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContentContainer}
          onScroll={handleScroll}
          onContentSizeChange={(width) => setContentWidth(width)}
          scrollEventThrottle={16} // Necessário para o onScroll disparar com frequência
        />
        {showButtons && canScrollRight && (
          <Pressable
            style={({ hovered }) => [
              styles.arrowButton,
              styles.arrowRight,
              { backgroundColor: hovered ? 'rgba(20, 20, 20, 0.7)' : 'transparent' },
            ]}
            onPress={() => scroll('right')}
          >
            <IconSymbol name="chevron.right" size={28} color="#fff" />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    marginLeft: 50, // Aumenta a margem para alinhar com os cards
  },
  carouselWrapper: {
    position: 'relative', // Permite o posicionamento absoluto dos botões filhos
  },
  listContentContainer: {
    // O padding é ajustado para dar espaço aos botões de seta sem sobrepor os cards
    paddingHorizontal: 50,
    // Adiciona espaço vertical para a animação de escala não ser cortada ou sobrepor outros elementos.
    paddingVertical: 24,
  },
  arrowButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Garante que os botões fiquem sobre a lista
    // A cor de fundo é controlada pelo estado de 'hover' para uma melhor experiência na web
    transitionDuration: '200ms', // Efeito de transição suave no hover (web-only)
    transitionProperty: 'background-color',
  },
  arrowLeft: {
    left: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  arrowRight: {
    right: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
});
