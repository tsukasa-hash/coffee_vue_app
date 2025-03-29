import Timer from "./Timer"

export interface TimerController {
    execute(t: Timer): void
    suspend(): void
    initialize(t: Timer): void
}

export class NormalTimerController implements TimerController {
    private tick:number = 0
    execute(t: Timer): void {
        const startTime = Date.now();
        this.tick = setInterval(() => {
            const remainingTime = t.getInitialTime() - this.durationFromStart(startTime);
            t.setMinutes(this.convertIntoMm(remainingTime))
            t.setSeconds(this.convertIntoSs(remainingTime))
            if (remainingTime === 0) {
                this.suspend()
                alert("タイマーが終了しました。")
            }
        }, 1000);
    }
    private durationFromStart(startTime: number): number {
        return Number(((Date.now() - startTime) * 0.001).toFixed(0));
    }
    private convertIntoMm(seconds: number): string {
        return Math.floor((seconds / 60) % 60)
        .toString()
        .padStart(2, "0")
    }
    private convertIntoSs(seconds: number): string {
        return Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0")
    }
    suspend(): void {
        clearInterval(this.tick)
    }
    initialize(t: Timer): void {
        t.setMinutes(this.convertIntoMm(t.getInitialTime()))
        t.setSeconds(this.convertIntoSs(t.getInitialTime()))
    }

}