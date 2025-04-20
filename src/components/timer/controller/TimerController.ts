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
    const startTime = Date.now();
    const remainingTime = t.getRemainingTime();
    this.tick = setInterval(() => {
      const elapsed = NormalTimerController.durationFromStart(startTime);
      const currentRemaining = remainingTime - elapsed;

      t.setRemainingTime(currentRemaining);
      t.setMinutes(NormalTimerController.convertIntoMm(currentRemaining));
      t.setSeconds(NormalTimerController.convertIntoSs(currentRemaining));

      // 更新通知
      // TODO:observerパターンにしたい。このクラスはTimerを操作するだけで、誰かに通知することは想定していない。
      t.notifyUpdate?.();
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
    t.setRemainingTime(t.getInitialTime());
    t.setMinutes(NormalTimerController.convertIntoMm(t.getInitialTime()));
    t.setSeconds(NormalTimerController.convertIntoSs(t.getInitialTime()));
    t.notifyUpdate?.();
  }
}
