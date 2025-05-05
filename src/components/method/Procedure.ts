export default class Procedure {
  constructor(description: string, time: number, amount: number) {
    this.description = description;
    this.time = time;
    this.amount = amount;
  }

  private description:string;

  private time:number;

  private totalTime: number = 0;

  private amount: number = 0;

  private totalAmount: number = 0;

  public getTime(): number {
    return this.time;
  }

  //   public get time(): number {
  //     return this.time;
  //   }

  //   public set time(seconds) {
  //     this.time = seconds;
  //   }

  //   public get name(): string {
  //     return this.name;
  //   }

//   public set name(value: string) {
//     this.name = value;
//   }
}
