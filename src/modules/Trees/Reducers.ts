//Reducer
import Types from "./Types";

import { BarType, BoroughType } from "./TreeModel";

export type TreesDataModel = {
  loading: boolean;
  showStatus: boolean;
  data: {
    yAxisValues: number[];
    status: BarType[];
    xAxisLabels: string[];
  };
  selectedFilter: BoroughType | "None";
};

export const initialState: TreesDataModel = {
  loading: false,
  showStatus: false,
  data: {
    yAxisValues: [20],
    status: ["Good" as "Good" | "Fair"],
    xAxisLabels: ["Lbl"],
  },
  selectedFilter: "None",
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case Types.TREE_SHOW_STATUS_TOGGLER:
      return {
        ...state,
        showStatus: action.payload,
      };
    case Types.TREE_DATA_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case Types.TREE_DATA_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
        selectedFilter: action.payload.filter,
        error: undefined,
      };
    }
    case Types.TREE_DATA_ERROR: {
      return {
        ...state,
        loading: false,
        data: undefined,
        error: action.payload,
      };
    }
    default:
      return state;
  }
}
