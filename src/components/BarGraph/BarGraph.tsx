import * as React from "react";
import {
  View,
  ActionSheetIOS,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Svg, { Circle, Rect, Pattern, Line, Path, Text } from "react-native-svg";
import { BarType } from "../../modules/Trees";
import YAxisLabels from "./YAxisLabels";
import Graph from "./Graph";
import UI from "../../ui";
import Utils from "../../utils";

export interface BarGraphYData {
  start: number;
  end?: number;
}
interface GraphYAxisData {
  label: string;
  position: number;
}

export interface yAxis {
  start: number;
  end?: number;
}

export interface YAxisType {
  values: number[];
  type: BarType[];
}

export interface BarGraphProperties {
  // value: number;
  height: number;
  width: number;
  xAxisLabels: any[];
  yAxisValues: YAxisType;
  verticalPadding: number;
  status?: boolean;
  loading?: boolean;
}
export type Point = number[];

export default class BarGraph extends React.Component<BarGraphProperties> {
  render() {
    const {
      width,
      verticalPadding,
      yAxisValues,
      status,
      xAxisLabels,
      loading,
    } = this.props;
    const theme = UI.Colors;
    const yAxes: yAxis[] = [];
    const yData: GraphYAxisData[] = [];
    const graphYMax = Math.max.apply(null, yAxisValues.values);
    const graphYMin = Math.min.apply(null, yAxisValues.values);
    const maxYAxis = Utils.getMax(graphYMax);
    const minYAxis = Utils.getMin(graphYMin);
    const delta = Utils.getDelta(maxYAxis);

    for (let i = minYAxis; i <= maxYAxis; i += 20 * delta) {
      yAxes.push({
        start: i,
      });
      yData.push({
        position: i,
        label: i.toFixed(0),
      });
    }

    const pad = verticalPadding !== undefined ? this.props.verticalPadding : 5;
    const height = this.props.height - pad * 2;
    const yTotal = maxYAxis - minYAxis;
    const xStepSize = 25;
    const lineColor = theme.Buttons.Blue; //TODO: update later
    const lineOpacity = 0.8;
    const barWidth = 5;
    let svgPath;
    let graph = new Graph();
    let points: Point[] = [];
    let hasData = false;
    let x = 0;
    let y = 0;
    for (let idx = 0; idx < yAxisValues.values.length; idx++) {
      const item = yAxisValues.values[idx];
      hasData = true;
      const h = Math.max((item - minYAxis) / yTotal, 0.01);
      y = pad + (1 - h) * height + 10;
      x = idx * xStepSize + (xStepSize - barWidth) / 2 + 10;
      if (hasData) points.push([x, y]);
    }
    if (points.length > 0) {
      svgPath = graph.svgPath(points);
    }
    if (loading) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "grey",
            justifyContent: "center",
            alignItems: "center",
            width,
            height,
          }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View
        style={{
          flexDirection: "row",
          width: yAxisValues.values.length * 0.9,
          backgroundColor: theme.Background.Dark,
        }}>
        <YAxisLabels
          width={40}
          height={height}
          verticalPadding={0}
          max={maxYAxis}
          min={minYAxis}
          data={yData}
        />
        <ScrollView
          horizontal
          alwaysBounceHorizontal
          style={{
            flex: 1,
            marginRight: yAxisValues.values.length * 0.5,
          }}>
          <Svg
            height={height + 80}
            width={width + yAxisValues.values.length * 0.5}>
            <Pattern
              id="RangePattern"
              patternUnits="userSpaceOnUse"
              x="-10"
              y="-10"
              width="10"
              height="10"></Pattern>
            {yAxisValues.values.map((item, idx) => {
              const h = Math.max((item - minYAxis) / yTotal, 0.01);
              const y = pad + (1 - h) * height;
              return (
                <React.Fragment key={idx}>
                  <Rect
                    x={idx * xStepSize + (xStepSize - barWidth) / 2}
                    y={y}
                    rx={barWidth / 2}
                    width={barWidth}
                    height={h * height}
                    fill={
                      status
                        ? this.getColorFromType(yAxisValues.type[idx])
                        : theme.Buttons.Primary
                    }
                  />
                  <Text
                    fill={theme.Labels.White}
                    stroke="none"
                    fontSize="10"
                    textAnchor="middle"
                    transform={{
                      rotation: -70,
                      originX: idx * xStepSize + (xStepSize - barWidth) / 2 + 5,
                      originY: height + 50,
                    }}
                    x={idx * xStepSize + (xStepSize - barWidth) / 2 + 5}
                    y={height + 50}>
                    {xAxisLabels[idx]}
                  </Text>
                </React.Fragment>
              );
            })}

            {yAxes.map((item, idx) => {
              const y =
                pad + height + ((item.start - minYAxis) / yTotal) * -height;
              if (item.end !== undefined) {
                const rangeHeight = ((item.end - item.start) / yTotal) * height;
                return (
                  <Rect
                    key={"line-" + idx}
                    fill="url(#RangePattern)"
                    x={0}
                    y={y - rangeHeight}
                    width={width}
                    height={rangeHeight}
                  />
                );
              }
              return (
                <Line
                  key={"line-" + idx}
                  stroke={lineColor}
                  strokeWidth={2}
                  strokeDasharray="0.5"
                  opacity={lineOpacity}
                  x1={0}
                  y1={y}
                  x2={1000}
                  y2={y}
                />
              );
            })}
          </Svg>
        </ScrollView>
      </View>
    );
  }
  private getColorFromType(type: BarType) {
    const theme = UI.Colors;
    switch (type) {
      case "Good":
        return theme.Status.Good;
      case "Fair":
        return theme.Status.Fair;
      default:
        return theme.Buttons.Primary;
    }
  }
}
