import { Platform, Linking } from "react-native";

export const openLink = (url: string, newTab?: boolean) =>
  Platform.OS === "web"
    ? window.open(url, newTab ? "_blank" : undefined)
    : Linking.openURL(url);
