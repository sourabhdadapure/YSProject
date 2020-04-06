import Types from "./Types";
import { Dispatch } from "redux";
import { Data } from "../TreesData";
import { TreeDataItem, BoroughType } from "./TreeModel";

export const getTreeData = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: Types.TREE_DATA_LOADING });
    const yAxisValues = Data.map((item) => item.census_tract);
    const status = Data.map((item) => item.health);
    const xAxisLabels = Data.map((item) => item.boroname);
    const payload = {
      yAxisValues,
      status,
      xAxisLabels,
    };
    dispatch({ type: Types.TREE_DATA_SUCCESS, payload });
  };
};

export const statusToggler = (showStatus: boolean) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: Types.TREE_SHOW_STATUS_TOGGLER, payload: !showStatus });
  };
};

export const applyFilter = (filter: BoroughType) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: Types.TREE_DATA_LOADING });
    const yAxisValues = Data.map(
      (item) => (item.boroname = filter && item.census_tract)
    );

    const status = Data.map(
      (item) => (item.boroname = filter ? item.health : "0")
    );
    const xAxisLabels = [filter];
    const payload = {
      yAxisValues: [yAxisValues.reduce((a, b) => a + b)],
      status,
      xAxisLabels,
      filter,
    };
    console.warn("YAxisValues", payload);
    dispatch({ type: Types.TREE_DATA_SUCCESS, payload });
  };
};
