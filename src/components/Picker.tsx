import * as React from "react";
import { View, Picker, Text } from "react-native";

interface AppProperties {
  title: string;
  selectedValue: string;
  onChange(val: any): void;
  pickerItems: any[];
}

export default class App extends React.Component<AppProperties> {
  render() {
    const { selectedValue, onChange, pickerItems, title } = this.props;
    return (
      <View>
        <Text style={{ textAlign: "center" }}>{title}</Text>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => onChange(itemValue)}>
          {pickerItems.map((item, idx) => (
            <Picker.Item key={idx} label={item} value={item} />
          ))}
        </Picker>
      </View>
    );
  }
}
