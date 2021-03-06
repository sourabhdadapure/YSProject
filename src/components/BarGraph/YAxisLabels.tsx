import * as React from "react";
import { View, ViewProperties, StyleProp, ViewStyle, Text } from "react-native";
import UI from "../../ui";

interface GraphYAxisData {
  label: string;
  position: number;
}

interface GraphYAxisProperties extends ViewProperties {
  data: GraphYAxisData[];
  height: number;
  width: number;
  verticalPadding: number;
  max: number;
  min: number;
}

export default class GraphYAxis extends React.Component<GraphYAxisProperties> {
  render() {
    const { height, width, data, max, min, verticalPadding } = this.props;
    return (
      <View
        {...this.props}
        style={
          [
            {
              flexDirection: "column",
              justifyContent: "space-between",
              height: height,
              width: width,
            },
            this.props.style,
          ] as StyleProp<ViewStyle>
        }>
        {data.map((item, idx) => {
          const y =
            ((item.position - min) / (max - min)) *
            (height - verticalPadding * 2);
          return (
            <Text
              key={idx}
              style={{
                color: UI.Colors.Labels.White,
                position: "absolute",
                left: 0,
                bottom: y + verticalPadding - 30,
                width: width,
                textAlign: "center",
              }}>
              {item.label}
            </Text>
          );
        })}
      </View>
    );
  }
}
