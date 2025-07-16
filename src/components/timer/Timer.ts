/* eslint-disable import/no-cycle */
import { Pausing } from "./state/Pausing";
import { Running } from "./state/Running";
import { Stopping } from "./state/Stopping";
import { TimerState } from "./state/TimerState";
import { TimerActions } from "./TimerActions";

export default abstract class Timer extends TimerActions {
  private static stopping: TimerState;

  private static running: TimerState;

  private static pausing: TimerState;

  private state: TimerState;

  private minutes: string = "";

  private seconds: string = "";

  private initialSecondsTime: number;

  private remainingSecondsTime: number;

  private onUpdateCallback: (() => void) | null = null;

  private onCompleteCallback: (() => void) | null = null;

  constructor(seconds: number) {
    super();
    Timer.stopping = new Stopping();
    Timer.running = new Running();
    Timer.pausing = new Pausing();
    this.state = Timer.stopping;
    this.initialSecondsTime = seconds;
    this.remainingSecondsTime = seconds;
  }

  public setInitialTime(arg: number) {
    this.initialSecondsTime = arg;
  }

  public getInitialTime(): number {
    return this.initialSecondsTime;
  }

  public getRemainingTime(): number {
    return this.remainingSecondsTime;
  }

  public setRemainingTime(seconds: number): void {
    this.remainingSecondsTime = seconds;
  }

  public setMinutes(arg: string): void {
    this.minutes = arg;
  }

  public getMinutes(): string {
    return this.minutes;
  }

  public setSeconds(arg: string): void {
    this.seconds = arg;
  }

  public getSeconds(): string {
    return this.seconds;
  }

  public start(): void {
    this.state.start(this);
  }

  public stop(): void {
    this.state.stop(this);
  }

  public reset(): void {
    this.state.reset(this);
  }

  public setRunning(): void {
    this.state = Timer.running;
  }

  // ===では判定できないためinstanceofを使う
  public isRunning(): boolean {
    return this.state instanceof Running;
  }

  public setStopping(): void {
    this.state = Timer.stopping;
  }

  public isStopping(): boolean {
    return this.state instanceof Stopping;
  }

  public setPausing(): void {
    this.state = Timer.pausing;
  }

  public isPausing(): boolean {
    return this.state instanceof Pausing;
  }

  // 画面通知用のコールバック関数
  setUpdateCallback(callback: () => void): void {
    this.onUpdateCallback = callback;
  }

  public notifyUpdate(): void {
    if (this.onUpdateCallback) {
      this.onUpdateCallback();
    }
  }

  setOnComplete(callback: () => void): void {
    this.onCompleteCallback = callback;
  }

  public complete(): void {
    if (this.onCompleteCallback) {
      this.onCompleteCallback();
    }
  }
}
