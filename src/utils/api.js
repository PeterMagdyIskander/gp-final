import { _getParent, _getReportedChildById } from "../utils/dummyDB";

export function getParent() {
  return _getParent();
}
export function getReportedChildById(id) {
  return _getReportedChildById(id);
}