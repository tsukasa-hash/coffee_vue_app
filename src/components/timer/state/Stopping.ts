/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import Timer from "../Timer";
import { TimerState } from "./TimerState";

export class Stopping implements TimerState {
  public start(t: Timer) {
    t.setRunning();
    t.execute();
  }

  public stop(_t: Timer) {
    // 何もしない
  }

  public reset(_t: Timer) {
    // 何もしない
  }
}
