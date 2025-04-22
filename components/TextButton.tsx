import {
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import React from "react";
import { SIZES, FONTS, COLORS } from "@/constants/theme";

type TextButtonProps = {
  label: string;
  labelStyle?: any;
  contentContainerStyle?: any;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
};

const TextButton = ({
  label = "",
  labelStyle,
  contentContainerStyle,
  onPress,
  disabled = false,
}: TextButtonProps): React.JSX.Element => {
  const styles = StyleSheet.create({
    touchableOpacityStyle: {
      alignItems: "center",
      justifyContent: "center",
      height: 55,
      borderRadius: SIZES.buttonBorderRadius,
      backgroundColor: disabled ? COLORS.gray200 : COLORS.primary500,
      ...contentContainerStyle,
    },
    textLabelStyle: {
      color: COLORS.gray100,
      ...FONTS.l1,
      ...labelStyle,
    },
  });

  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles.touchableOpacityStyle}
      onPress={onPress}
    >
      <Text style={styles.textLabelStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;
