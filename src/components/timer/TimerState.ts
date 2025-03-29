import Timer from "./Timer" 
export interface TimerState {
    start(t: Timer): void
    stop(t: Timer): void
    reset(t: Timer): void
}
export class RunningTimerState implements TimerState {
    public start(t: Timer) {
        // 何もしない
    }
    public stop(t: Timer) {
        t.setPausing()
        t.suspend()
    }
    public reset(t: Timer) {
        // 何もしない
    }
}
export class StoppingTimerState implements TimerState {
    public start(t: Timer) {
        t.setRunning()
        t.execute()
    }
    public stop(t: Timer) {
        // 何もしない
    }
    public reset(t: Timer) {
        // 何もしない
    }
}
export class PausingTimerState implements TimerState {
    public start(t: Timer) {
        t.setRunning()
        t.execute()
    }
    public stop(t: Timer) {
        // 何もしない
    }
    public reset(t: Timer) {
        t.setStopping()
        t.initialize()
    }
}