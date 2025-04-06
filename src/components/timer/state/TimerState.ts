/* eslint-disable import/no-cycle */
import Timer from "../Timer";

export interface TimerState {
  start(t: Timer): void;
  stop(t: Timer): void;
  reset(t: Timer): void;
}
