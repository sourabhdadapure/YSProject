import { Data } from "../TreesData";

export type TreeDataItem = {
  tree_id: string;
  block_id: string;
  created_at: string;
  tree_dbh: string;
  stump_diam: string;
  curb_loc: string;
  status: string;
  health: string;
  spc_latin: string;
  spc_common: string;
  steward: string;
  guards: string;
  sidewalk: string;
  user_type: string;
  problems: string;
  root_stone: string;
  root_grate: string;
  root_other: string;
  trunk_wire: string;
  trnk_light: string;
  trnk_other: string;
  brch_light: string;
  brch_shoe: string;
  brch_other: string;
  address: string;
  zipcode: string;
  zip_city: string;
  cb_num: string;
  borocode: string;
  boroname: string;
  cncldist: string;
  st_assem: string;
  st_senate: string;
  nta: string;
  nta_name: string;
  boro_ct: string;
  state: string;
  latitude: string;
  longitude: string;
  x_sp: string;
  y_sp: string;
  council_district: string;
  census_tract: string;
  bin: string;
  bbl: string;
};

export type BoroughType =
  | "Queens"
  | "Brooklyn"
  | "The Bronx"
  | "Staten Island"
  | "Manhattan";

export type BarType = "Good" | "Fair";

export const TreeDataSet: TreeDataItem[] = Data;
