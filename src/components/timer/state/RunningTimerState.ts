/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Timer from "../Timer";
import { TimerState } from "./TimerState";

export class RunningTimerState implements TimerState {
  public start(_t: Timer) {
    // 何もしない
  }

  public stop(t: Timer) {
    t.setPausing();
    t.suspend();
  }

  public reset(_t: Timer) {
    // 何もしない
  }
}
