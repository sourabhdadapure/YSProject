import * as React from "react";
import { View, Text } from "react-native";
import UI from "../../ui";

interface GraphDescriptorProperties {
  descriptors: {
    text: string;
    colorCode: string;
  }[];
}

export default class GraphDescriptor extends React.Component<
  GraphDescriptorProperties
> {
  render() {
    const { descriptors } = this.props;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: UI.Colors.Background.Dark,
        }}>
        {descriptors.map((item, idx) => (
          <View
            key={"desc-" + idx}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              margin: 5,
            }}>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginRight: 5,
                backgroundColor: item.colorCode,
              }}
            />
            <Text style={{ fontSize: 15, color: UI.Colors.Labels.White }}>
              {item.text}
            </Text>
          </View>
        ))}
      </View>
    );
  }
}
