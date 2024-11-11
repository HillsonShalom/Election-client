import { EStates } from "./states.enum";

export interface RegisterDto {
  username: string;
  password: string;
  state: EStates;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface VoteDto {
  to: string;
}