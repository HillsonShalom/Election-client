
import { StateModel } from "./getDTOs";
import { CustomStates } from "./states.enum";

export enum DataStatus {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  IDLE = "IDLE",
}

export interface stateState {
  error: string | null;
  status: DataStatus;
  state: StateModel[];
}

export interface colorsState {
  error: string | null;
  status: DataStatus;
  colors: CustomStates;
}
