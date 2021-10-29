import { User, UserId } from "@/entities/User";
import { UserTransactionHistoryItem } from "@/entities/UserTransactionHistoryItem";

import { plainToClass, classToPlain } from "class-transformer";

import { getFirestore, collection, doc, getDoc, getDocs, setDoc, DocumentData, CollectionReference, query, limit, orderBy, SnapshotOptions, QueryDocumentSnapshot, addDoc, where } from "firebase/firestore"

const converter = {
    toFirestore: (item: UserTransactionHistoryItem): any => {
        return classToPlain(item);
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        return plainToClass(UserTransactionHistoryItem, data) as any;
    }
};

export class TransactionRepository{
    static CollectionName = "TransactionHistory";

    private db = getFirestore();
    private collection: CollectionReference<DocumentData>;

    constructor() {
        this.collection = collection(this.db, TransactionRepository.CollectionName)
            .withConverter(converter);
    }

    async save(item: UserTransactionHistoryItem) {
        await addDoc(this.collection, item);
    }

    async getByCustomerId(uid: UserId): Promise<UserTransactionHistoryItem[]> {
        const q = query(this.collection, where("customerId", "==", uid))
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(d => d.data()) as UserTransactionHistoryItem[];
    }
}