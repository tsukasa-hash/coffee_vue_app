/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
import Timer from "../Timer";
import { TimerState } from "./TimerState";

export class Pausing implements TimerState {
  public start(t: Timer) {
    t.setRunning();
    t.restart();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public stop(_t: Timer) {
    // 何もしない
  }

  public reset(t: Timer) {
    t.setStopping();
    t.initialize();
  }
}
