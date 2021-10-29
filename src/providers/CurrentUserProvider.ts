import { getAuth } from "firebase/auth";
export class CurrentUserProvider {
    get currentUserUid() {
        const current = getAuth().currentUser;
        return current?.uid || "";
    }

    get isAnonymous() {
        const current = getAuth().currentUser;
        return current?.isAnonymous || true;
    }

    onAuthicated(fn: ()=>void){
        getAuth().onAuthStateChanged(fn)
    }
}