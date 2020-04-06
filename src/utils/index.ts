export default class Utils {
  static getMax(value: number) {
    console.warn(value);
    if (Math.ceil(value / 20) * 20 <= 20) return 80;
    return Math.ceil(value / 20) * 20;
  }

  static getMin(value: number) {
    if (Math.floor(value / 20) * 20 <= 20) return 0;
    else return Math.floor(value / 20) * 20;
  }

  static getDelta(value: number) {
    if (value >= 10000) return 4;
    if (value >= 1000 || value >= 500) return 2;
    return 1;
  }
}
