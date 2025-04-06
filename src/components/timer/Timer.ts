/* eslint-disable import/no-cycle */
import { NormalTimerController, TimerController } from "./controller/TimerController";
import { PausingTimerState } from "./state/PausingTimerState";
import { RunningTimerState } from "./state/RunningTimerState";
import { StoppingTimerState } from "./state/StoppingTimerState";
import { TimerState } from "./state/TimerState";

export default class Timer {
  private static stoppingState: TimerState = new StoppingTimerState();

  private static runningState: TimerState = new RunningTimerState();

  private static pausingState: TimerState = new PausingTimerState();

  private timerController: TimerController = new NormalTimerController();

  private state: TimerState = Timer.stoppingState;

  private minutes: string = "";

  private seconds: string = "";

  private initialSecondsTime: number;

  constructor(seconds: number) {
    this.initialSecondsTime = seconds;
    this.initialize();
  }

  public setInitialTime(arg: number) {
    this.initialSecondsTime = arg;
  }

  public getInitialTime(): number {
    return this.initialSecondsTime;
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
    this.state = Timer.runningState;
  }

  public isRunning(): boolean {
    console.log(this.state);
    console.log(Timer.runningState);

    // return this.state == Timer.runningState;
    return this.state === Timer.runningState;
  }

  public setStopping(): void {
    this.state = Timer.stoppingState;
  }

  public isStopping(): boolean {
    return this.state === Timer.stoppingState;
  }

  public setPausing(): void {
    this.state = Timer.pausingState;
  }

  public isPausing(): boolean {
    return this.state === Timer.pausingState;
  }

  execute(): void {
    this.timerController.execute(this);
  }

  suspend(): void {
    this.timerController.suspend();
  }

  initialize(): void {
    this.timerController.initialize(this);
  }
}
