import { EStates } from "./states.enum";

export interface ICandidate {
    name: string;
    image: string;
    votes: number;
    color: string;
}

export interface IStateResult {
    [key: string]: number
}

export interface IResults {
    stateCode: EStates;
    results: IStateResult;
}

export interface IStatesDetails {
    name: string;
    code: EStates;
    electors: number;
}

export interface StateModel extends IStatesDetails {
    results: IStateResult
}