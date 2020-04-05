/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
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
import { getTreeData, statusToggler } from "../modules/Trees";
import { BarType } from "../modules/Trees/TreeModel";

const width = Dimensions.get("screen").width;

interface Props {
  getTreeData(): void;
  statusToggler(status: boolean): void;
  TreesData: {
    loading: boolean;
    showStatus: boolean;
    data: {
      yAxisValues: number[];
      status: BarType[];
    };
  };
}

@connect((state) => ({ TreesData: state.TreesData }), {
  getTreeData,
  statusToggler,
})
export default class App extends React.Component<
  Props,
  {
    loading: boolean;
    showStatus: boolean;
    data: {
      yAxisValues: number[];
      status: BarType[];
    };
  }
> {
  componentDidMount() {
    this.props.getTreeData();
  }

  render() {
    const { data, showStatus } = this.props.TreesData;
    const { statusToggler } = this.props;
    return (
      <React.Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <BarGraph
              status={showStatus}
              height={500}
              width={width - 40}
              yAxisValues={{
                values: data.yAxisValues,
                type: data.status,
              }}
              verticalPadding={20}
            />
          </ScrollView>
          <Switch
            status={showStatus}
            title="Tree Health"
            onChange={() => statusToggler(showStatus)}
          />
        </SafeAreaView>
      </React.Fragment>
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
