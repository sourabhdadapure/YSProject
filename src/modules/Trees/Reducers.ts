import Types from "./Types";

export type colors = "red" | "blue" | "green";

class TreeData {
  loading: boolean = false;
  data: Object = {};
}

export default function (state = TreeData, action: any) {
  switch (action.type) {
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
