import { Transform, Type } from "class-transformer";
import { UserId } from "./User";

export class UserTransactionHistoryItem {
    customerId!: UserId;
    staffId!: UserId;
   
    @Transform(({ value }) => value.valueOf(), { toPlainOnly: true })
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    date!: Date;
    ammount!: number;
    total!: number;
    debit: number = 0;
    credit: number = 0;
    cafe!: { cafeId: number, address: string }
}