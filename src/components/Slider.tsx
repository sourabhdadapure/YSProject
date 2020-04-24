import * as React from "react";
import {
  GestureResponderEvent,
  PanResponder,
  PanResponderInstance,
  View,
  ViewProperties,
  StyleProp,
  ViewStyle,
  Text,
} from "react-native";

interface VerticalSliderProperties extends ViewProperties {
  initialPosition: number;
  min: number;
  max: number;
  sliderHeight: number;
  circleSize: number;
  disabled?: boolean;
  onChange(position: number): void;
}

export default class Slider extends React.Component<VerticalSliderProperties> {
  state = { position: this.props.initialPosition };

  panResponder: PanResponderInstance;

  constructor(props: VerticalSliderProperties) {
    super(props);
    this.panResponder = PanResponder.create({
      onPanResponderTerminationRequest: () => false,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (e) => this.onMove(e),
      onPanResponderRelease: (e) => this.onMove(e),
      onPanResponderTerminate: (e) => this.onMove(e),
    });
  }

  private onMove(evt: GestureResponderEvent) {
    const { min, max, sliderHeight, onChange } = this.props;
    const y = 1 - evt.nativeEvent.locationY / sliderHeight;
    if (y < 0 || y > 1) return;
    let pos = Math.round(y * (max - min) + min);
    if (pos > max) pos = max;
    if (pos < min) pos = min;
    if (this.state.position != pos) {
      this.setState({ position: pos });
      onChange(pos);
    }
  }

  componentWillReceiveProps(nextProps: VerticalSliderProperties) {
    this.setState({
      position: nextProps.initialPosition,
      disabled: !!nextProps.disabled,
    });
  }

  render() {
    const { min, max, sliderHeight, circleSize, disabled } = this.props;

    const pos = (this.state.position - min) / (max - min);
    const y = (1 - pos) * sliderHeight - circleSize / 2;

    return (
      <View
        {...this.props}
        pointerEvents={disabled ? "none" : "box-only"}
        style={
          [
            { height: sliderHeight, opacity: disabled ? 0.2 : 1 },
            this.props.style,
          ] as StyleProp<ViewStyle>
        }
        {...this.panResponder.panHandlers}>
        <View style={{ width: "100%", height: "100%" }}>
          {/* Bar Layout */}
          <View
            style={{
              position: "absolute",
              left: circleSize / 2 - 3,
              top: circleSize / 2,
              bottom: circleSize / 2,
              width: 6,
              borderRadius: 3,
              backgroundColor: "white",
            }}
          />

          {/* Circle */}
          <View
            style={{
              borderRadius: circleSize / 2,
              width: circleSize,
              height: circleSize,
              backgroundColor: "red",
              position: "absolute",
              top: y,
              left: 0,
              alignItems: "center",
            }}
          />

          <Text
            style={{
              color: "white",
              position: "absolute",
              top: y,
              left: circleSize * 2,
            }}
            {...this.panResponder.panHandlers}>
            {this.state.position}
          </Text>
        </View>
      </View>
    );
  }
}
