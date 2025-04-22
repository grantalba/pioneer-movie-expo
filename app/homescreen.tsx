import React, { useCallback, useState } from "react";
import Container from "@/components/Container";
import {
  ActivityIndicator,
  Platform,
  RefreshControl,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";
import TopRatedMovie from "@/components/TopRatedMovie";
import MovieList from "@/components/MovieList";
import useApi from "@/hooks/useApi";
import RenderWhen from "@/components/RenderWhen";

export default function Homescreen() {
  const [pageNumber, setPageNumber] = useState(1);
  const {
    data: topRatedMovies,
    error: topRatedMoviesError,
    loading: topRatedLoading,
    fetchApi,
  } = useApi("top_rated", "GET", pageNumber);
  const {
    data: upcomingMovies,
    error: upcomingMoviesError,
    loading: upcomingLoading,
  } = useApi("upcoming", "GET", 1);
  const {
    data: popularMovies,
    error: popularMoviesError,
    loading: popularLoading,
  } = useApi("popular", "GET", 1);

  const handlePageNumber = useCallback(() => {
    setPageNumber(pageNumber + 1);
  }, [pageNumber]);

  const handleLeftIconPress = () => {
    // TODO: handleLeftIconPress
  };
  const handleRightIconPress = () => {
    // TODO: handleRightIconPress
  };

  const onRefresh = React.useCallback(() => {
    fetchApi();
  }, []);

  return (
    <Container
      hasLinearGradient={false}
      header={{
        shouldDisplayBack: false,
        pageTitle: "Movies",
        left: (
          <Ionicons
            name="menu"
            size={Platform.OS === "ios" ? 30 : 40}
            color={COLORS.primary500}
            onPress={handleLeftIconPress}
          />
        ),
        right: (
          <Ionicons
            name="person-circle"
            size={Platform.OS === "ios" ? 30 : 40}
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
          paddingBottom: SIZES.height * 0.15,
        }}
        refreshControl={
          <RefreshControl
            refreshing={popularLoading || topRatedLoading || upcomingLoading}
            onRefresh={onRefresh}
            tintColor={COLORS.contentPrimary}
          />
        }
      >
        <RenderWhen
          condition={topRatedLoading || popularLoading || upcomingLoading}
        >
          <ActivityIndicator />
        </RenderWhen>
        {/* Top rate movies */}
        <TopRatedMovie
          data={topRatedMovies}
          handlePageNumber={handlePageNumber}
          loading={topRatedLoading}
        />

        {/* Upcoming movies */}
        <MovieList
          title="Upcoming"
          data={upcomingMovies}
          loading={upcomingLoading}
        />

        {/* Popular movies */}
        <MovieList
          title="Popular"
          data={popularMovies}
          loading={popularLoading}
        />
      </ScrollView>
    </Container>
  );
}
