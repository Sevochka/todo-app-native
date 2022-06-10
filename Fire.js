import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAg_oSakYYyjtoQtpE1W4Vl3BBFvhpzHj8",
    authDomain: "todoapp-a6431.firebaseapp.com",
    projectId: "todoapp-a6431",
    storageBucket: "todoapp-a6431.appspot.com",
    messagingSenderId: "504441775927",
    appId: "1:504441775927:web:a2bdb4151d26ef0f73dcb2"
};

class Fire {
    constructor(callback) {
        this.init(callback);
    }
    init(callback){
        if(!firebase.apps.length > 0){
            firebase.initializeApp(firebaseConfig)
        }
        firebase.auth().onAuthStateChanged(user => {
            if (user){
                callback(null, user);
            } else {
                firebase.auth().signInAnonymously().catch(error => {
                    callback(error);
                })
            }
        })
    }

    addList(list) {
        return this.ref.add(list)
    }
    updateList(list) {
        return this.ref.doc(list.id).update(list)
    }
    removeList(list) {
        return this.ref.doc(list.id).delete()
    }
    getLists(callback) {
        let ref = this.ref.orderBy("name")

        this.unsubscribe = ref.onSnapshot(snapshot => {
            const lists = []
            snapshot.forEach(doc => {
                lists.push({id: doc.id, ...doc.data()})
            })
            callback(lists);
        })
    }
    get userId() {
        return firebase.auth().currentUser.uid;
    }
    detach() {
        this.unsubscribe();
    }
    get ref() {
        return firebase.firestore().collection('users').doc(this.userId).collection('lists')
    }
}

export default Fire;
