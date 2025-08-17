export abstract class TimerActions {
  abstract execute(): void;
  abstract suspend(): void;
  abstract initialize(): void;
  // TODO: restartメソッドはexecuteメソッドと同じことをするので、executeメソッドを再利用する。
  // カウントダウンを始める初期値が異なるのみ
  abstract restart(): void;
}
