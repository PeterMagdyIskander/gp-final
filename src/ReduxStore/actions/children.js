import { quaryfromdynamodb } from "../../AWS/dynamodblogic";
import { Getmatches } from "../../AWS/getmatches";
import { gets3file } from "../../AWS/s3logic";

export const SET_CHILDREN = "SET_CHILDREN";
export function setChildren(children) {
  return {
    type: SET_CHILDREN,
    children,
  };
}
