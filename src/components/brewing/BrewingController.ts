import { NormalTimerController, TimerController } from "../timer/controller/TimerController";
import Timer from "../timer/Timer";
import Procedure from "../method/Procedure";
import Method from "../method/Method";

export class BrewingContoller {
  private timerContoller: TimerController;

  private method: Method;

  private timer: Timer;

  constructor(timerContoller: TimerController, method:Method, timer:Timer) {
    this.timerContoller = new NormalTimerController();
    this.method = method;
    this.timer = timer;
  }

  public brew():boolean {
    const currentProcedure: Procedure[] = this.method.getProcedure();
    currentProcedure.forEach((procedure) => {
      this.timer.setInitialTime(procedure.getTime());
      this.timerContoller.execute(this.timer);
      this.timer?.start();
    });
    return true;
  }
}
