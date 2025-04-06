// eslint-disable-next-line import/no-cycle
import Timer from "../Timer";

export interface TimerController {
  execute(t: Timer): void;
  suspend(): void;
  initialize(t: Timer): void;
}

export class NormalTimerController implements TimerController {
  private tick: number = 0;

  execute(t: Timer): void {
    t.setRunning();
    console.log(t);
    console.log(t.isRunning());

    const startTime = Date.now();
    this.tick = setInterval(() => {
      const remainingTime = t.getInitialTime() - NormalTimerController.durationFromStart(startTime);
      t.setMinutes(NormalTimerController.convertIntoMm(remainingTime));
      t.setSeconds(NormalTimerController.convertIntoSs(remainingTime));
      if (remainingTime === 0) {
        this.suspend();
        alert("タイマーが終了しました。");
      }
    }, 1000);
  }

  private static durationFromStart(startTime: number): number {
    return Number(((Date.now() - startTime) * 0.001).toFixed(0));
  }

  private static convertIntoMm(seconds: number): string {
    return Math.floor((seconds / 60) % 60)
      .toString()
      .padStart(2, "0");
  }

  private static convertIntoSs(seconds: number): string {
    return Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
  }

  suspend(): void {
    clearInterval(this.tick);
  }

  // eslint-disable-next-line class-methods-use-this
  initialize(t: Timer): void {
    t.setMinutes(NormalTimerController.convertIntoMm(t.getInitialTime()));
    t.setSeconds(NormalTimerController.convertIntoSs(t.getInitialTime()));
  }
}
