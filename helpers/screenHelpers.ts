import { Dimensions } from "react-native";

export function getScreenDimensions() {
  const { width, height } = Dimensions.get("window");
  return { width, height };
}
