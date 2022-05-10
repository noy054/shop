import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
}from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
}from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyClNk3IwlUazJ1gEpJ1o5GIsxDxnmmv-BA",
    authDomain: "shop-app-bd2ba.firebaseapp.com",
    projectId: "shop-app-bd2ba",
    storageBucket: "shop-app-bd2ba.appspot.com",
    messagingSenderId: "1077070442100",
    appId: "1:1077070442100:web:3379bf2495fde8a9f56b21"
};
  
const firebaseapp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
    collectinKey, 
    objectsToAdd
    ) => {
    const collectionRef = collection(db, collectinKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((Object) => {
        const docRef = doc(collectionRef, Object.title.toLowerCase());
        batch.set(docRef, Object);
    });

    await batch.commit();
    console.log('done');
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const queryShanshot = await getDocs(q);
    const categoryMap = queryShanshot.docs.map((docSnapshot) => docSnapshot.data());
    /**/

    return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, 
    additionalInformation = {}
    ) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const UserSnapshot = await getDoc(userDocRef);
    console.log(UserSnapshot);
    console.log(UserSnapshot.exists());

    if(!UserSnapshot.exists()) {
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        }catch (error){
            console.log('erroe creating the user', error.messag);
        }
    }

    return UserSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await  signInWithEmailAndPassword(auth, email, password);
};


export const signOutUser = () => signOut(auth);


export const onAutStateChangedListener = (callback) => 
    onAuthStateChanged(auth, callback);


export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    });
};
