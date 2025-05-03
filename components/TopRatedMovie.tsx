import { Link } from 'expo-router';
import React, { memo } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import { MoviePage } from '@/api/movies';
import { MovieDetailsType } from '@/constants/constants';
import { COLORS, SIZES, FONTS } from '@/constants/theme';

import RenderWhen from './RenderWhen';

type TopRatedMovieProps = {
  data: MoviePage[];
  loading: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
};

export default memo(function TopRatedMovie({
  data,
  loading = false,
  fetchNextPage,
  hasNextPage,
}: TopRatedMovieProps) {
  const movies: MovieDetailsType[] = data.flatMap((page) => page.results ?? []);
  const lastIndex = movies.length - 1;

  const renderCarousel = ({ item, index }: { item: MovieDetailsType; index: number }) => {
    const { poster_path, title, backdrop_path, overview, vote_average, id } = item;
    return (
      <Link
        href={{
          pathname: '/details/[id]',
          params: { backdrop_path, title, overview, vote_average, id },
        }}
        style={styles.containerCarousel}
        asChild
      >
        <TouchableOpacity>
          <Image
            key={index.toString()}
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${poster_path}`,
            }}
            width={SIZES.width * 0.6}
            height={SIZES.height * 0.4}
          />
        </TouchableOpacity>
      </Link>
    );
  };

  const styles = StyleSheet.create({
    headerText: {
      color: COLORS.contentPrimary,
      fontWeight: '500',
      ...FONTS.l1,
    },
    slideStyle: {
      display: 'flex',
      alignItems: 'center',
    },
    containerCarousel: {
      flex: 1,
      height: 400,
      width: SIZES.width * 0.6,
      alignSelf: 'center',
    },
  });

  if (!movies.length || loading) {
    return <View />;
  }

  return (
    <View style={{ ...SIZES.content }}>
      <RenderWhen condition={!loading}>
        <Text style={styles.headerText}>Top Rated Movie</Text>
        <View
          style={{
            width: SIZES.width,
          }}
        >
          <Carousel
            data={movies}
            renderItem={renderCarousel}
            width={SIZES.width}
            height={SIZES.height * 0.35}
            defaultIndex={1}
            loop={false}
            mode="parallax"
            modeConfig={{
              parallaxScrollingOffset: 200,
            }}
            onScrollEnd={(index) => {
              if (index === lastIndex && hasNextPage) {
                fetchNextPage();
              }
            }}
          />
        </View>
      </RenderWhen>
    </View>
  );
});
