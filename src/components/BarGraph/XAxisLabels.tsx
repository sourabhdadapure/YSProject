import * as React from "react";
import { View, ViewProps, Text } from "react-native";

interface GraphXAxisProperties extends ViewProps {
  data: string[];
}

const GraphXAxis = (props: GraphXAxisProperties) => {
  const { data } = props;
  return (
    <View
      {...props}
      style={[
        {
          paddingLeft: 50,
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginVertical: 10,
          height: 50,
        },
        props.style,
      ]}>
      {data.map((item) => (
        <Text style={{ transform: [{ rotate: "-70deg" }] }}>{item}</Text>
      ))}
    </View>
  );
};

export default GraphXAxis;
