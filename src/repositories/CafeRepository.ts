import { Cafe } from "@/entities/Cafe";

export class CafeRepository {
    async getAll(): Promise<Cafe[]> {
        const list: Cafe[] = [];

        const c1 = new Cafe();
        c1.id = "1";
        c1.address = "Цветной бульвар, 1";
        list.push(c1);

        const c2 = new Cafe();
        c2.id = "2";
        c2.address = "Моховая улица, 11с1";
        list.push(c2);

        const c3 = new Cafe();
        c3.id = "3";
        c3.address = "улица Солянка, 8";
        list.push(c3);

        const c4 = new Cafe();
        c4.id = "4";
        c4.address = "Климентовский переулок, 10с3";
        list.push(c4);

        const c5 = new Cafe();
        c5.id = "5";
        c5.address = "улица Большая Полянка, 28к1";
        list.push(c5);

        return Promise.resolve(list);
    }
}