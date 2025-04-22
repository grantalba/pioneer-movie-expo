import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { COLORS, SIZES, FONTS } from "@/constants/theme";
import {
  MaterialIcons,
  Ionicons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import MovieList from "@/components/MovieList";
import { sampleData } from "@/constants/constants";
import useApi from "@/hooks/useApi";

const MovideDetailScreen = () => {
  const params = useLocalSearchParams();
  const { backdrop_path, title, overview, vote_average, canBeClicked, id } =
    params;
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { data: videos } = useApi({
    endpoint: `${id}/videos`,
    method: "GET",
  });

  const trailerList = videos?.results?.filter(
    (vid: any) => vid.type === "Trailer" && vid.site === "YouTube"
  );

  const handleOnBackPress = () => {
    navigation.goBack();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "stretch",
      backgroundColor: COLORS.backgroundSecondary,
    },
    backgroundImage: { top: 0, left: 0, right: 0, position: "absolute" },
    linearGradient: {
      width: SIZES.width,
      height: SIZES.height * 0.6,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
    },
    iconContainer: {
      alignItems: "center",
      marginTop: insets.top + 5,
      height: 35,
      width: 35,
      backgroundColor: COLORS.backgroundTertiary,
      marginHorizontal: SIZES.base,
      borderRadius: SIZES.base,
    },
    scrollView: {
      paddingBottom: SIZES.height * 0.05,
      marginTop: SIZES.height * 0.225,
      marginHorizontal: SIZES.l3,
      alignItems: "stretch",
    },
    textContainer: { alignItems: "center" },
    textTitle: {
      color: COLORS.contentPrimary,
      fontWeight: "500",
      ...FONTS.h1,
      textAlign: "center",
    },
    textBullet: {
      color: COLORS.contentSecondary,
      fontWeight: "400",
      ...FONTS.l2,
      textAlign: "center",
      marginTop: SIZES.l4,
    },
    textOverview: {
      ...FONTS.l2,
      color: COLORS.contentSecondary,
      fontWeight: "400",
      marginTop: SIZES.h1,
      textAlign: "justify",
    },
    touchableOpacityStyle: {
      alignItems: "center",
      width: "100%",
      justifyContent: "center",
      height: 50,
      borderRadius: SIZES.base,
      backgroundColor: COLORS.primary600,
      marginTop: SIZES.margin,
      flexDirection: "row",
    },
    textLabelStyle: {
      color: COLORS.gray100,
      fontWeight: "bold",
      marginLeft: SIZES.base,
      ...FONTS.l1,
    },
    playButton: { marginRight: SIZES.base },
    bottomButtons: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginTop: SIZES.h1,
    },
    watchList: {
      alignItems: "center",
      justifyContent: "center",
      marginRight: SIZES.h1,
    },
    watchListText: {
      ...FONTS.l2,
      color: COLORS.contentSecondary,
      marginTop: SIZES.base,
    },
    movieListContainer: {
      flex: 1,
      width: "100%",
      marginTop: SIZES.h1,
    },
  });

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500/${backdrop_path}` }}
        style={styles.backgroundImage}
        width={SIZES.width}
        height={SIZES.height * 0.6}
      />
      <LinearGradient
        colors={["transparent", COLORS.backgroundSecondary]}
        style={styles.linearGradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <View style={styles.iconContainer}>
        <MaterialIcons
          name="chevron-left"
          size={35}
          color={COLORS.primary500}
          onPress={handleOnBackPress}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollView}
        bounces={true}
        decelerationRate="normal"
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>{title}</Text>

          <Text style={styles.textBullet}>Release • 2020 • 130 min</Text>
          <Text style={styles.textBullet}>Action • Comedy • Romance</Text>
          <Text style={styles.textBullet}>
            {`Popularity • ${vote_average}`}
          </Text>
          <TouchableOpacity style={styles.touchableOpacityStyle}>
            <Ionicons
              name="play"
              size={24}
              color={COLORS.contentPrimary}
              style={styles.playButton}
            />
            <Text style={styles.textLabelStyle}>PLAY</Text>
          </TouchableOpacity>
          <Text style={styles.textOverview}>{overview}</Text>
        </View>
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.watchList}>
            <Entypo
              name="add-to-list"
              size={24}
              color={COLORS.contentPrimary}
            />
            <Text style={styles.watchListText}>Watch List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.watchList}>
            <MaterialCommunityIcons
              name="share-outline"
              size={24}
              color={COLORS.contentPrimary}
            />
            <Text style={styles.watchListText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.watchList}>
            <MaterialCommunityIcons
              name="download-outline"
              size={24}
              color={COLORS.contentPrimary}
            />
            <Text style={styles.watchListText}>Download</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.movieListContainer}>
          <MovieList
            title="More like this"
            data={sampleData}
            canBeClicked={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MovideDetailScreen;
