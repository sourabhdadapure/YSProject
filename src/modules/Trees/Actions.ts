import Types from "./Types";
import { Dispatch } from "redux";
import { Data } from "../TreesData";
import { TreeDataItem, BoroughType } from "./TreeModel";

export const getTreeData = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: Types.TREE_DATA_LOADING });
    const yAxisValues = Data.map((item) =>
      item.census_tract && parseInt(item.census_tract) > 10000
        ? 1000
        : item.census_tract || 0
    );
    const status = Data.map((item) => item.health || 0);
    const xAxisLabels = Data.map((item) => item.boroname || 0);
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

export const applyFilter = (filter: BoroughType | "None") => {
  return (dispatch: Dispatch) => {
    dispatch({ type: Types.TREE_DATA_LOADING });
    const yAxisValues = Data.map((item) =>
      item.boroname == filter && item.census_tract
        ? parseInt(item.census_tract)
        : 0
    );

    const status = Data.map((item) =>
      item.boroname == filter ? item.health : ""
    );
    const xAxisLabels = Data.map((item) =>
      item.boroname == filter ? item.boroname : ""
    );
    const payload = {
      yAxisValues,
      status,
      xAxisLabels,
      filter,
    };
    dispatch({ type: Types.TREE_DATA_SUCCESS, payload });
  };
};
