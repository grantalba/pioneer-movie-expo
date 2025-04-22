import React, { useCallback, useState } from "react";
import Container from "@/components/Container";
import { Platform, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";
import TopRatedMovie from "@/components/TopRatedMovie";
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
      >
        {/* Top rate movies */}
        <TopRatedMovie
          data={topRatedMovies}
          handlePageNumber={handlePageNumber}
          loading={topRatedLoading}
        />
      </ScrollView>
    </Container>
  );
}
