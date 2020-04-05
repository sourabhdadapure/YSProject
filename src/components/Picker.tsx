import * as React from "react";
import { View, Picker } from "react-native";

interface AppProperties {
  selectedValue: string;
  onChange(val: any): void;
  pickerItems: string[];
}

export default class App extends React.Component<AppProperties> {
  render() {
    const { selectedValue, onChange, pickerItems } = this.props;
    return (
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => onChange(itemValue)}>
        {pickerItems.map((item, idx) => (
          <Picker.Item key={idx} label={item} value={item} />
        ))}
      </Picker>
    );
  }
}
