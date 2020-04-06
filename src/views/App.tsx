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
import BarGraph from "../components/BarGraph";
import Switch from "../components/Switch";
import { Provider, connect } from "react-redux";
import { getTreeData, statusToggler, applyFilter } from "../modules/Trees";
import { TreesDataModel } from "../modules/Trees/Reducers";
import { BarType, BoroughType } from "../modules/Trees/TreeModel";
import Picker from "../components/Picker";
import UI from "../ui";
import GraphDescriptor from "../components/BarGraph/GraphDescriptor";

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
      <View
        style={{ backgroundColor: theme.Background.Dark, paddingVertical: 10 }}>
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
          <BarGraph
            status={showStatus}
            height={500}
            width={width}
            yAxisValues={{
              values: data.yAxisValues,
              type: data.status,
            }}
            xAxisLabels={data.xAxisLabels}
            verticalPadding={20}
          />
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
          <Picker
            title="Filter By Boroughs"
            selectedValue={selectedFilter}
            onChange={(val) => {
              applyFilter(val);
            }}
            pickerItems={[
              "None",
              "Queens",
              "Brooklyn",
              "The Bronx",
              "Staten Island",
              "Manhattan",
            ]}
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
