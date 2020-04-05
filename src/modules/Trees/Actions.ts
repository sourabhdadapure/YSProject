import Types from "./Types";
import { Dispatch } from "redux";
import { Data } from "../TreesData";

export const getTreeData = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: Types.TREE_DATA_LOADING });
    dispatch({ type: Types.TREE_DATA_SUCCESS, payload: Data });
  };
};
