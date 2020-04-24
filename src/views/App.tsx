/**
App
 */

import * as React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  Text,
  StatusBar,
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { BarGraph, Switch, Picker, GraphDescriptor } from "../components";
import { Provider, connect } from "react-redux";
import {
  getTreeData,
  statusToggler,
  applyFilter,
  BarType,
  BoroughType,
} from "../modules/Trees";
import { TreesDataModel } from "../modules/Trees/Reducers";
import {} from "../modules/Trees";
import UI from "../ui";
import Slider from "../components/Slider";

const width = Dimensions.get("screen").width;

interface Props {
  getTreeData(): void;
  applyFilter(selectedFilter: BoroughType): void;
  statusToggler(status: boolean): void;
  TreesData: TreesDataModel;
}

@(connect((state: TreesDataModel) => state, {
  getTreeData,
  statusToggler,
  applyFilter,
}) as any)
export default class App extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.getTreeData();
  }

  render() {
    const { data, showStatus, selectedFilter } = this.props.TreesData;
    const { statusToggler, applyFilter } = this.props;
    const theme = UI.Colors;
    return (
      <View style={{ flex: 1, backgroundColor: theme.Background.Dark }}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Text
            style={{
              fontSize: 15,
              textAlign: "center",
              color: theme.Labels.White,
            }}>
            NYC Trees Census
          </Text>

          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 10,
            }}>
            <Switch
              status={showStatus}
              title="Health"
              onChange={() => statusToggler(showStatus)}
            />

            {showStatus && (
              <GraphDescriptor
                descriptors={[
                  { text: "Good", colorCode: theme.Status.Good },
                  { text: "Fair", colorCode: theme.Status.Fair },
                ]}
              />
            )}
          </View>
          <Slider
            min={-100}
            max={100}
            initialPosition={0}
            sliderHeight={300}
            circleSize={25}
            onChange={() => {}}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark,
  },
  highlight: {
    fontWeight: "700",
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
  },
});
