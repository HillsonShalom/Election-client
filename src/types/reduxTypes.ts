import { StateModel } from "./getDTOs";

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
