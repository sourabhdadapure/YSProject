import Types from "./Types";

import { BarType, BoroughType } from "./TreeModel";
export class TreeData {
  loading: boolean = false;
  showStatus: boolean = false;
  data: {
    yAxisValues: number[];
    status: BarType[];
    xAxisLabels: string[];
  } = {
    yAxisValues: [],
    status: [],
    xAxisLabels: [],
  };
  selectedFilter: BoroughType = "Queens";
}

export default function (state = TreeData, action: any) {
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
      return { state };
  }
}
