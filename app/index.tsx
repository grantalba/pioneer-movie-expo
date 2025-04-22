import React from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { SIZES, COLORS, FONTS } from "@/constants/theme";
import {
  onboarding_screens,
  OnboardingScreensType,
} from "@/constants/constants";
import TextButton from "@/components/TextButton";
import Container from "@/components/Container";

const Index = (): React.JSX.Element => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [isLastPage, setIsLastPage] = React.useState<boolean>(false);
  const currentIndex = React.useRef<number>(0);
  const topFlatListRef = React.useRef<FlatList>(null);
  const bottomFlatListRef = React.useRef<FlatList>(null);

  const handlePressButton = () => {
    if (currentIndex.current < onboarding_screens.length - 1) {
      currentIndex.current += 1;
      const nextIndex = currentIndex.current;
      const offset = nextIndex * SIZES.width;

      topFlatListRef?.current?.scrollToOffset({
        offset,
        animated: true,
      });

      bottomFlatListRef?.current?.scrollToOffset({
        offset,
        animated: true,
      });

      if (nextIndex === onboarding_screens.length - 1) {
        setIsLastPage(true);
      }
    } else {
      router.navigate("/homescreen");
    }
  };

  const renderTopFlatListItem = ({ item }: { item: OnboardingScreensType }) => {
    return (
      <View style={styles.topFlatListView}>
        <Image
          source={item.image}
          resizeMode="contain"
          style={styles.imageContainer}
        />
      </View>
    );
  };

  const renderBottomFlatListItem = ({
    item,
  }: {
    item: OnboardingScreensType;
  }) => {
    return (
      <View style={styles.topFlatListView}>
        <Text style={styles.titleStyle}>{item.title}</Text>
        <Text style={styles.descStyle}>{item.desc}</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    topContainer: {
      flex: 2,
      paddingTop: Platform.OS === "android" ? insets.top : 0,
    },
    topFlatListView: {
      width: SIZES.width,
      alignItems: "center",
      justifyContent: "center",
    },
    imageContainer: {
      width: SIZES.width * 0.8,
      height: SIZES.height * 0.5,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
    },
    titleStyle: {
      ...FONTS.h1,
      fontWeight: "600",
      textAlign: "center",
      color: COLORS.primary100,
    },
    descStyle: {
      ...FONTS.l1,
      fontWeight: "300",
      marginTop: SIZES.radius,
      textAlign: "center",
      color: COLORS.primary100,
    },
    textButton: {
      marginHorizontal: SIZES.padding,
    },
    bottomContainer: {
      flex: 1,
      justifyContent: "space-around",
    },
  });

  return (
    <Container
      backgroundColor={COLORS.backgroundTertiary}
      hasLinearGradient={false}
    >
      {/* Image Flatlist */}
      <View style={styles.topContainer}>
        <FlatList
          ref={topFlatListRef}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          snapToInterval={SIZES.width}
          snapToAlignment="center"
          decelerationRate="fast"
          keyExtractor={(item) => `onboarding_screens_${item.id}`}
          data={onboarding_screens}
          renderItem={renderTopFlatListItem}
        />
      </View>

      {/* Title and Description Lists */}
      <View style={styles.bottomContainer}>
        <FlatList
          ref={bottomFlatListRef}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          snapToInterval={SIZES.width}
          snapToAlignment="center"
          decelerationRate="fast"
          keyExtractor={(item) => `onboarding_screens_title_${item.id}`}
          data={onboarding_screens}
          renderItem={renderBottomFlatListItem}
        />

        <TextButton
          label={isLastPage ? "Let's Go" : "Next"}
          contentContainerStyle={styles.textButton}
          onPress={handlePressButton}
        />
      </View>
    </Container>
  );
};

export default Index;
