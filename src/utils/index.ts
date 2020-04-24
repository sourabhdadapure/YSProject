import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

//Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export default class Utils {
  static getMax(value: number) {
    if (value >= 2000) return 1000;
    if (Math.ceil(value / 20) * 20 <= 20) return 80;
    return Math.ceil(value / 20) * 20;
  }

  static getMin(value: number) {
    if (Math.floor(value / 20) * 20 <= 20) return 0;
    else return Math.floor(value / 20) * 20;
  }

  static getDelta(value: number) {
    if (value >= 10000) return 1000;
    if (value >= 1000 || value >= 500) return 3;
    return 1;
  }

  static scale(size: number) {
    return (shortDimension / guidelineBaseWidth) * size;
  }

  static verticalScale(size: number) {
    return (longDimension / guidelineBaseHeight) * size;
  }

  static moderateScale(size: number, factor = 0.5) {
    return size + (this.scale(size) - size) * factor;
  }
}
