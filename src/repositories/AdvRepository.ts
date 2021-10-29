import { Adv } from "@/entities/Adv";

export class AdvRepository {
    async getAll(): Promise<Adv[]> {
        const list: Adv[] = [];

        const c1 = new Adv();
        c1.id = "1";
        c1.location = "Цветной бульвар, 1, Моховая улица, 11с1";
        c1.name = "Два кофе по цене одного";
        c1.from = new Date(2021, 5, 0);
        c1.to = new Date(2021, 6, 0);
        list.push(c1);

        const c2 = new Adv();
        c2.id = "2";
        c2.location = "Вся Москва";
        c2.name = "Мафин в подраок к большому латте";
        c2.from = new Date(2021, 9, 0);
        c2.to = new Date(2021, 10, 0);
        list.push(c2);

        const c3 = new Adv();
        c3.id = "3";
        c3.location = "Вся Москва";
        c3.name = "Скида 50% на любой сендвич при покупки большого кофе";
        c3.from = new Date(2021, 10, 0);
        c3.to = new Date(2021, 11, 0);
        list.push(c3);

        const c4 = new Adv();
        c4.id = "4";
        c4.location = "улица Большая Полянка, 28к1б, Климентовский переулок, 10с3";
        c4.name = "Любой сироп бесплатно в каждый кофе";
        c4.from = new Date(2021, 8, 0);
        c4.to = new Date(2021, 12, 0);
        list.push(c4);

        const c5 = new Adv();
        c5.id = "5";
        c5.location = "улица Большая Полянка, 28к1б, Климентовский переулок, 10с3";
        c5.name = "Три больших кофе по цене двух";
        c5.from = new Date(2021, 5, 0);
        c5.to = new Date(2021, 6, 0);
        list.push(c5);

        return Promise.resolve(list);
    }
}