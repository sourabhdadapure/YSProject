import * as React from "react";
import { View, Picker, Text } from "react-native";
import UI from "../ui";

interface AppProperties {
  title: string;
  selectedValue: string;
  onChange(val: any): void;
  pickerItems: any[];
}

export default class App extends React.Component<AppProperties> {
  render() {
    const { selectedValue, onChange, pickerItems, title } = this.props;
    const theme = UI.Colors;
    return (
      <View>
        <Picker
          style={{ backgroundColor: theme.Buttons.DarkGray }}
          itemStyle={{ color: theme.Labels.White }}
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => onChange(itemValue)}>
          {pickerItems.map((item, idx) => (
            <Picker.Item key={idx} label={item} value={item} />
          ))}
        </Picker>
        <Text style={{ textAlign: "center", color: theme.Labels.White }}>
          {title}
        </Text>
      </View>
    );
  }
}
