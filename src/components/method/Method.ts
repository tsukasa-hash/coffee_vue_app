import Procedure from "./Procedure";

export default class Method {
  private procedures: Procedure[] = [];

  private id: string = "";

  private methodName: string = "";

  private amountOfCoffeePowder: string = "";

  private amountOfACupOfCoffee: string = "";

  private amountOfHotWater: string = "";

  private temperatureOfHotWater: string = "";

  private typeOfDripper: string = "";

  private methodIsSelected: boolean = false;

  // constructor(
  //   id: string,
  //   methodName: string,
  //   amountOfCoffeePowder: string,
  //   amountOfACupOfCoffee: string,
  //   amountOfHotWater: string,
  //   temperatureOfHotWater: string,
  //   typeOfDripper: string,
  // ) {
  //   this.id = id;
  //   this.methodName = methodName;
  //   this.amountOfCoffeePowder = amountOfCoffeePowder;
  //   this.amountOfACupOfCoffee = amountOfACupOfCoffee;
  //   this.amountOfHotWater = amountOfHotWater;
  //   this.temperatureOfHotWater = temperatureOfHotWater;
  //   this.typeOfDripper = typeOfDripper;
  // }
  // TODO:tsのgetterを使う
  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  // get id(): string {
  //   return this.id;
  // }

  // set id(value: string) {
  //   this.id = value;
  // }

  public setMethodName(methodName: string): void {
    this.methodName = methodName;
  }

  public getMethodName(): string {
    return this.methodName;
  }

  public setAmountOfCoffeePowder(amountOfCoffeePowder: string): void {
    this.amountOfCoffeePowder = amountOfCoffeePowder;
  }

  public getAmountOfCoffeePowder(): string {
    return this.amountOfCoffeePowder;
  }

  public setAmountOfACupOfCoffee(amountOfACupOfCoffee: string): void {
    this.amountOfACupOfCoffee = amountOfACupOfCoffee;
  }

  public getAmountOfACupOfCoffee(): string {
    return this.amountOfACupOfCoffee;
  }

  public setAmountOfHotWater(amountOfHotWater: string): void {
    this.amountOfHotWater = amountOfHotWater;
  }

  public getAmountOfHotWater(): string {
    return this.amountOfHotWater;
  }

  public setTemperatureOfHotWater(temperatureOfHotWater: string): void {
    this.temperatureOfHotWater = temperatureOfHotWater;
  }

  public getTemperatureOfHotWater(): string {
    return this.temperatureOfHotWater;
  }

  public setTypeOfDripper(typeOfDripper: string): void {
    this.typeOfDripper = typeOfDripper;
  }

  public getTypeOfDripper(): string {
    return this.typeOfDripper;
  }

  public setMethodIsSelected(methodIsSelected: boolean): void {
    this.methodIsSelected = methodIsSelected;
  }

  public getMethodIsSelected(): boolean {
    return this.methodIsSelected;
  }

  public addProcedures(procedure: Procedure) {
    this.procedures.push(procedure);
  }

  public getProcedures(): Procedure[] {
    return this.procedures;
  }
}
