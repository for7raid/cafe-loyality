export type UserId = string;
export class User {
    uid!: UserId;
    ammount: number = 0;
    name?: string = "";
    email?: string = "";
    phone?: string = "";
}