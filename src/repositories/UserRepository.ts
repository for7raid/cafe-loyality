import { User, UserId } from "@/entities/User";

import { plainToClass, classToPlain } from "class-transformer";

import { getFirestore, collection, doc, getDoc, getDocs, setDoc, DocumentData, CollectionReference, query, limit, orderBy, SnapshotOptions, QueryDocumentSnapshot } from "firebase/firestore"

const userConverter = {
    toFirestore: (user: User): any => {
        return classToPlain(user);
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        return plainToClass(User, data) as any;
    }
};

export class UserRepository {
    static CollectionName = "Users";

    private db = getFirestore();
    private usersCollection: CollectionReference<DocumentData>;

    constructor() {
        this.usersCollection = collection(this.db, UserRepository.CollectionName)
            .withConverter(userConverter);
    }

    async findById(uid: UserId): Promise<User> {
        const docRef = doc(this.usersCollection, uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as User;
        } else {
            const user = new User();
            user.uid = uid;
            await setDoc(docRef, user);
            return user;
        }
    }

    async save(user: User) {
        const docRef = doc(this.usersCollection, user.uid);
        await setDoc(docRef, user);
    }
}