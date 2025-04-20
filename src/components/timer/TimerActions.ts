export abstract class TimerActions {
  abstract execute(): void;
  abstract suspend(): void;
  abstract initialize(): void;
}
