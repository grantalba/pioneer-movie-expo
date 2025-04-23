import React, { memo } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { Link } from 'expo-router';
import { COLORS, SIZES, FONTS } from '@/constants/theme';
import Carousel from 'react-native-reanimated-carousel';
import RenderWhen from './RenderWhen';
import { MovieDetailsType } from '@/constants/constants';

export default memo(function TopRatedMovie({ data, handlePageNumber, loading = false }: any) {
  const lastIndex = data?.results?.length;

  const renderCarousel = ({ item, index }: any) => {
    const { poster_path, title, backdrop_path, overview, vote_average, id } =
      item as MovieDetailsType;
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

  if (!data?.results || loading) {
    return <View />;
  }

  return (
    <View style={{ ...SIZES.content }}>
      <RenderWhen condition={data?.results && !loading}>
        <Text style={styles.headerText}>Top Rated Movie</Text>
        <View
          style={{
            width: SIZES.width,
          }}
        >
          <Carousel
            data={data?.results}
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
              if (lastIndex === index + 1) {
                handlePageNumber();
              }
            }}
          />
        </View>
      </RenderWhen>
    </View>
  );
});
