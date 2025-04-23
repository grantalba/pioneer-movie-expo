import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { PropsWithChildren } from 'react';
import { View, StyleSheet, ColorValue, Platform } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import RenderWhen from './RenderWhen';
import { COLORS, FONTS, SIZES } from '../constants/theme';

interface Header {
  pageTitle?: any;
  shouldDisplayBack?: boolean;
  onBackPress?: any;
  left?: React.ReactElement;
  right?: React.ReactElement;
}

const Container = ({
  children,
  backgroundColor,
  header,
  hasLinearGradient = true,
}: PropsWithChildren<{
  backgroundColor?: ColorValue;
  hasLinearGradient?: boolean;
  header?: Header;
}>): React.JSX.Element => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleOnBackPress = () => {
    if (header?.onBackPress) {
      header.onBackPress();
    } else {
      navigation.goBack();
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      flexDirection: 'column',

      // Paddings to handle safe area
      paddingHorizontal: insets.left + insets.right,
      paddingTop: insets.top,
      paddingBottom: insets.bottom + SIZES.margin,
      backgroundColor,
    },
    header: {
      backgroundColor: 'transparent',
      zIndex: 20,
    },
    contentStyle: {
      marginHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    linearGradient: { width: SIZES.width, height: SIZES.height },
  });

  return (
    <View style={styles.container}>
      <RenderWhen condition={!!header}>
        <Appbar.Header statusBarHeight={0} style={styles.header}>
          <RenderWhen condition={header?.shouldDisplayBack}>
            <MaterialIcons
              name="chevron-left"
              size={Platform.OS === 'ios' ? 30 : 40}
              color={COLORS.primary500}
              onPress={handleOnBackPress}
            />
          </RenderWhen>
          <RenderWhen condition={!!header?.left}>{header?.left}</RenderWhen>
          <RenderWhen condition={!!header?.pageTitle}>
            <Appbar.Content
              title={header?.pageTitle}
              titleStyle={{
                color: COLORS.contentPrimary,
                ...FONTS.h3,
                fontWeight: 'bold',
              }}
              style={styles.contentStyle}
            />
          </RenderWhen>
          <RenderWhen condition={!!header?.left}>{header?.right}</RenderWhen>
        </Appbar.Header>
      </RenderWhen>

      <RenderWhen condition={hasLinearGradient}>
        <LinearGradient
          colors={['transparent', '#10002B', '#280F3E']}
          style={styles.linearGradient}
        >
          {children}
        </LinearGradient>
      </RenderWhen>
      <RenderWhen condition={!hasLinearGradient}>
        <>{children}</>
      </RenderWhen>
    </View>
  );
};

export default Container;
