import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { memo } from "react";
import { SIZES, FONTS, COLORS } from "@/constants/theme";
import Each from "./Each";
import { Link } from "expo-router";
import RenderWhen from "./RenderWhen";
import { MovieDetailsType } from "@/constants/constants";

const MovieList = ({
  title,
  data,
  canBeClicked = true,
  loading = false,
}: any) => {
  const styles = StyleSheet.create({
    content: SIZES.content,
    headerText: {
      color: COLORS.contentPrimary,
      fontWeight: "500",
      ...FONTS.l1,
      marginBottom: SIZES.base,
    },
    seeAllText: {
      color: COLORS.primary500,
      fontWeight: "500",
      ...FONTS.l2,
      marginBottom: SIZES.base,
    },
  });

  if (!data?.results || loading) {
    <View />;
  }

  return (
    <View style={styles.content}>
      <RenderWhen condition={data?.results && !loading}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.headerText}>{title}</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Each
            of={data?.results}
            render={(
              item: MovieDetailsType,
              index: { toString: () => React.Key | null | undefined }
            ): any => {
              const {
                poster_path,
                backdrop_path,
                title,
                overview,
                vote_average,
                id,
              } = item as MovieDetailsType;

              return (
                <View key={index.toString()}>
                  <RenderWhen condition={canBeClicked}>
                    <Link
                      href={{
                        pathname: "/details/[id]",
                        params: {
                          poster_path,
                          backdrop_path,
                          title,
                          overview,
                          vote_average,
                          id,
                        },
                      }}
                      asChild
                      key={index.toString()}
                    >
                      <TouchableOpacity>
                        <Image
                          source={{
                            uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                          }}
                          width={SIZES.width * 0.3}
                          height={SIZES.width * 0.4}
                          style={{ marginRight: SIZES.base }}
                        />
                      </TouchableOpacity>
                    </Link>
                  </RenderWhen>
                  <RenderWhen condition={!canBeClicked}>
                    <TouchableOpacity
                      disabled={!canBeClicked}
                      key={index.toString()}
                    >
                      <Image
                        source={{
                          uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                        }}
                        width={SIZES.width * 0.3}
                        height={SIZES.width * 0.4}
                        style={{ marginRight: SIZES.base }}
                      />
                    </TouchableOpacity>
                  </RenderWhen>
                </View>
              );
            }}
          />
        </ScrollView>
      </RenderWhen>
    </View>
  );
};

export default memo(MovieList);
