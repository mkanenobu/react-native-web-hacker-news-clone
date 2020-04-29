import React from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: StyleSheet.hairlineWidth,
  },
});

export const Border: React.FC = () => <View style={styles.border} />;
