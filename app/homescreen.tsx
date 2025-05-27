import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Platform, RefreshControl, ScrollView } from 'react-native';

import Container from '@/components/Container';
import MovieList from '@/components/MovieList';
import RenderWhen from '@/components/RenderWhen';
import TopRatedMovie from '@/components/TopRatedMovie';
import useQueryMovies from '@/hooks/useQueryMovies';

import { COLORS, SIZES } from '../constants/theme';

export default function Homescreen() {
  const {
    data: topRatedMovies,
    fetchNextPage: fetchTopRatedNextPage,
    hasNextPage: hasMoreTopRated,
    // error: topRatedMoviesError, // TODO: HandleError
    isLoading: topRatedLoading,
    refetch: refetchTopRated,
  } = useQueryMovies({ endpoint: 'top_rated' });

  const {
    data: upcomingMovies,
    // error: upcomingMoviesError, // TODO: HandleError
    isLoading: upcomingLoading,
    refetch: refetchUpcoming,
  } = useQueryMovies({ endpoint: 'upcoming' });
  const {
    data: popularMovies,
    // error: popularMoviesError, // TODO: HandleError
    isLoading: popularLoading,
    refetch: refetchPopular,
  } = useQueryMovies({ endpoint: 'popular' });

  const handleLeftIconPress = () => {
    // TODO: handleLeftIconPress
  };
  const handleRightIconPress = () => {
    // TODO: handleRightIconPress
  };

  const onRefresh = React.useCallback(() => {
    refetchTopRated();
    refetchUpcoming();
    refetchPopular();
  }, [refetchTopRated, refetchUpcoming, refetchPopular]);

  return (
    <Container
      hasLinearGradient={false}
      header={{
        shouldDisplayBack: false,
        pageTitle: 'Movies',
        left: (
          <Ionicons
            name="menu"
            size={Platform.OS === 'ios' ? 30 : 40}
            color={COLORS.primary500}
            onPress={handleLeftIconPress}
          />
        ),
        right: (
          <Ionicons
            name="person-circle"
            size={Platform.OS === 'ios' ? 30 : 40}
            color={COLORS.primary500}
            onPress={handleRightIconPress}
          />
        ),
      }}
      backgroundColor={COLORS.backgroundTertiary}
    >
      <ScrollView
        style={{
          marginHorizontal: SIZES.base,
          marginBottom: SIZES.base,
        }}
        contentContainerStyle={{
          paddingBottom: SIZES.height * 0.05,
        }}
        refreshControl={
          <RefreshControl
            refreshing={popularLoading || topRatedLoading || upcomingLoading}
            onRefresh={onRefresh}
            tintColor={COLORS.contentPrimary}
          />
        }
        bounces={true}
        decelerationRate="normal"
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <RenderWhen condition={topRatedLoading || popularLoading || upcomingLoading}>
          <ActivityIndicator />
        </RenderWhen>
        {/* Top rate movies */}
        <TopRatedMovie
          data={topRatedMovies?.pages ?? []}
          loading={topRatedLoading}
          fetchNextPage={fetchTopRatedNextPage}
          hasNextPage={hasMoreTopRated}
        />

        {/* Upcoming movies */}
        <MovieList
          title="Upcoming"
          data={upcomingMovies?.pages?.flatMap((page) => page.results) ?? []}
          loading={upcomingLoading}
        />

        {/* Popular movies */}
        <MovieList
          title="Popular"
          data={popularMovies?.pages?.flatMap((page) => page.results) ?? []}
          loading={popularLoading}
        />
      </ScrollView>
    </Container>
  );
}
