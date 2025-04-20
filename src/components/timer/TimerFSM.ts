import { TimerController } from "./controller/TimerController";
import Timer from "./Timer";

export default class TimerFSM extends Timer {
  private controller: TimerController;

  constructor(controller: TimerController) {
    super(0);
    this.controller = controller;
  }

  execute(): void {
    this.controller.execute(this);
  }

  suspend(): void {
    this.controller.suspend();
  }

  initialize(): void {
    this.controller.initialize(this);
  }
}
