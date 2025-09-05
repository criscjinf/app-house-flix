import { CatalogCarousel } from '@/components/catalog/CatalogCarousel';
import { CatalogItem } from '@/components/catalog/types';
import { StyleSheet, View } from 'react-native';

const actionMovies: CatalogItem[] = [
  {
    id: '1',
    category: 'MOVIE',
    genre: 'ACTION',
    title: 'Action Movie 1',
    description: 'An exciting action movie.',
    rating: 8.5,
    trailer: 'https://www.youtube.com/watch?v=Rzt-TlQsWHU',
    poster: 'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg', // Exemplo de URL de pôster
  },
  {
    id: '2',
    category: 'MOVIE',
    genre: 'ACTION',
    title: 'Action Movie 2',
    description: 'Another exciting action movie.',
    rating: 8.8,
    trailer: 'https://www.youtube.com/watch?v=dnBpZuSUISQ',
    poster: 'https://image.tmdb.org/t/p/w500/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg', // Exemplo de URL de pôster
  },
  {
    id: '3',
    category: 'MOVIE',
    genre: 'ACTION',
    title: 'Action Movie 3',
    description: 'Description for action movie 3.',
    rating: 8.2,
    trailer: 'https://www.youtube.com/watch?v=hA6hldpSTF8',
    poster: 'https://image.tmdb.org/t/p/w500/f89JUZ05Nj9smeq9ss9HpAppSQk.jpg',
  },
  {
    id: '4',
    category: 'MOVIE',
    genre: 'ACTION',
    title: 'Action Movie 4',
    description: 'Description for action movie 4.',
    rating: 7.5,
    trailer: 'https://www.youtube.com/watch?v=KlyknsTJk0w',
    poster: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
  },
  {
    id: '5',
    category: 'MOVIE',
    genre: 'ACTION',
    title: 'Action Movie 5',
    description: 'Description for action movie 5.',
    rating: 9.1,
    trailer: 'https://www.youtube.com/watch?v=eoOaKN4qCKw',
    poster: 'https://image.tmdb.org/t/p/w500/8tNX8s3j1O0eqilOQk2i21B68d8.jpg',
  },
  {
    id: '6',
    category: 'MOVIE',
    genre: 'ACTION',
    title: 'Action Movie 6',
    description: 'Description for action movie 6.',
    rating: 8.0,
    trailer: 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
    poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
  },
  {
    id: '7',
    category: 'MOVIE',
    genre: 'ACTION',
    title: 'Action Movie 7',
    description: 'Description for action movie 7.',
    rating: 8.8,
    trailer: 'https://www.youtube.com/watch?v=EXeTwQWrcwY',
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
  },
  {
    id: '8',
    category: 'MOVIE',
    genre: 'ACTION',
    title: 'Action Movie 8',
    description: 'Description for action movie 8.',
    rating: 7.2,
    trailer: 'https://www.youtube.com/watch?v=euz-KBBfAAo',
    poster: 'https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwBAl.jpg',
  },
  {
    id: '9',
    category: 'MOVIE',
    genre: 'ACTION',
    title: 'Action Movie 9',
    description: 'Description for action movie 9.',
    rating: 8.5,
    trailer: 'https://www.youtube.com/watch?v=2-P5W4n8J2I',
    poster: 'https://image.tmdb.org/t/p/w500/yFihWxQcmqcaBR31R6vcz3V2ehb.jpg',
  },
  {
    id: '10',
    category: 'MOVIE',
    genre: 'ACTION',
    title: 'Action Movie 10',
    description: 'Description for action movie 10.',
    rating: 9.3,
    trailer: 'https://www.youtube.com/watch?v=_j9QeUoPOi4',
    poster: 'https://image.tmdb.org/t/p/w500/74xTE01fD21m2p5d19fA3l7u3L8.jpg',
  },
  {
    id: '11',
    category: 'MOVIE',
    genre: 'ACTION',
    title: 'Action Movie 11',
    description: 'Description for action movie 11.',
    rating: 7.8,
    trailer: 'https://www.youtube.com/watch?v=TcMBFSGVi1c',
    poster: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIY2VhrhA2aF9bA4.jpg',
  },
  {
    id: '12',
    category: 'MOVIE',
    genre: 'ACTION',
    title: 'Action Movie 12',
    description: 'Description for action movie 12.',
    rating: 8.1,
    trailer: 'https://www.youtube.com/watch?v=wb49-oV0F78',
    poster: 'https://image.tmdb.org/t/p/w500/uJYYizSuA9Y3DCs0qS4qWvHfZg4.jpg',
  },
  {
    id: '13',
    category: 'MOVIE',
    genre: 'ACTION',
    title: 'Action Movie 13',
    description: 'Description for action movie 13.',
    rating: 8.9,
    trailer: 'https://www.youtube.com/watch?v=hA6hldpSTF8',
    poster: 'https://image.tmdb.org/t/p/w500/f89JUZ05Nj9smeq9ss9HpAppSQk.jpg',
  },
  {
    id: '14',
    category: 'MOVIE',
    genre: 'ACTION',
    title: 'Action Movie 14',
    description: 'Description for action movie 14.',
    rating: 7.4,
    trailer: 'https://www.youtube.com/watch?v=KlyknsTJk0w',
    poster: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
  },
  {
    id: '15',
    category: 'MOVIE',
    genre: 'ACTION',
    title: 'Action Movie 15',
    description: 'Description for action movie 15.',
    rating: 9.0,
    trailer: 'https://www.youtube.com/watch?v=eoOaKN4qCKw',
    poster: 'https://image.tmdb.org/t/p/w500/8tNX8s3j1O0eqilOQk2i21B68d8.jpg',
  },
  {
    id: '16',
    category: 'MOVIE',
    genre: 'ACTION',
    title: 'Action Movie 16',
    description: 'Description for action movie 16.',
    rating: 8.3,
    trailer: 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
    poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
  },
  {
    id: '17',
    category: 'MOVIE',
    genre: 'ACTION',
    title: 'Action Movie 17',
    description: 'Description for action movie 17.',
    rating: 8.6,
    trailer: 'https://www.youtube.com/watch?v=EXeTwQWrcwY',
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
  },
  {
    id: '18',
    category: 'MOVIE',
    genre: 'ACTION',
    title: 'Action Movie 18',
    description: 'Description for action movie 18.',
    rating: 7.1,
    trailer: 'https://www.youtube.com/watch?v=euz-KBBfAAo',
    poster: 'https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwBAl.jpg',
  },
  {
    id: '19',
    category: 'MOVIE',
    genre: 'ACTION',
    title: 'Action Movie 19',
    description: 'Description for action movie 19.',
    rating: 8.4,
    trailer: 'https://www.youtube.com/watch?v=2-P5W4n8J2I',
    poster: 'https://image.tmdb.org/t/p/w500/yFihWxQcmqcaBR31R6vcz3V2ehb.jpg',
  },
  {
    id: '20',
    category: 'MOVIE',
    genre: 'ACTION',
    title: 'Action Movie 20',
    description: 'Description for action movie 20.',
    rating: 9.4,
    trailer: 'https://www.youtube.com/watch?v=_j9QeUoPOi4',
    poster: 'https://image.tmdb.org/t/p/w500/74xTE01fD21m2p5d19fA3l7u3L8.jpg',
  },
];

export default function MoviesScreen() {
  const handleCardPress = (item: CatalogItem) => {
    console.log('Card pressionado:', item.title);
    // Aqui você pode navegar para uma tela de detalhes, por exemplo
  };

  return (
    <View style={styles.container}>
      <CatalogCarousel title="Filmes de Ação" items={actionMovies} onCardPress={handleCardPress} />
      {/* Você pode adicionar outros carrosséis aqui */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, // Ajuste conforme necessário
  },
});
