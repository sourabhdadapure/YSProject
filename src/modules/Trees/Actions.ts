import Types from "./Types";
import { Dispatch } from "redux";
import { Data } from "../TreesData";

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
