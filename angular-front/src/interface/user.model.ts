export class User {
  constructor(
    public id: number,
    public name: string,
    public lastname: string,
    public age: number,
    public email: string,
    public phone: string,
    public createAt: Date,
    public updateAt: Date,
  ) { }
}
