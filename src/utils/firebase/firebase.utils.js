import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import {
  getFirestore,
  addDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  getDocs,
  deleteDoc
} from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY61eDhRkTenfWW1aGW_SyFkNaMzzqvII",
  authDomain: "my-blog-db-db7f6.firebaseapp.com",
  projectId: "my-blog-db-db7f6",
  storageBucket: "my-blog-db-db7f6.appspot.com",
  messagingSenderId: "1087866682834",
  appId: "1:1087866682834:web:33be71533fb96ece6ddc0b"
};

//Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopUp = () => signInWithPopup(auth,provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if(!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  //console.log(userDocRef);
  const userSnapshot= await getDoc(userDocRef);
  //console.log(userSnapshot);
  const {displayName,email,photoURL,uid} = userAuth;
  const createdAt = new Date();
  if(!userSnapshot.exists()){

    try{
        await setDoc(userDocRef,{
          displayName,
          email,
          uid,
          photoURL,
          createdAt,
          ...additionalInformation
        });
    }catch(e){
        console.log('error occured during creation of user',e.message);
    }

  }else{
    const loginTime= new Date();
      try{
        await updateDoc(userDocRef,{
          loginTime
        });
    }catch(e){
        console.log('error occured during updation of user',e.message);
    }
      //return userDocRef;
  };
 

  
}
export const  updateUserLoginTime = async (userAuth) =>{
  
  try{
    
    const userDocRef = doc(db, 'users', userAuth.uid);
    const loginTime= new Date();
    await updateDoc(userDocRef,{
      loginTime
    });
  }catch(e){
    console.log('error occured during updation of user',e.message);
  }
}
export const insertUserWithEmailAndPassword = async (email,password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {

  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth , email, password);
  
 
}

//create contact documents

export const createContactDocument = async (contactInfo) => {
  //console.log(contactInfo);
  const contactDocRef = doc(db, 'contacts', contactInfo.email);
  const {name,email,phone,subject,message} = contactInfo;
  const createdAt = new Date();

    try{
        await setDoc(contactDocRef,{
          name,
          email,
          phone,
          subject,
          message,
          createdAt
        });
        return email;
    }catch(e){
        console.log('error occured during creation of contact',e.message);
    }

}

//get all contact messages with id
export const getAllContactMessage = async () => {
  const collectionRef =collection(db, 'contacts');
  const q= query(collectionRef);
  //console.log(q);
  const querySnapshot = await getDocs(q);
  return querySnapshot;
}

//blog document 
export const createBlogDocument = async (data)=>{
  const {title, body,email } = data;
  // Add a new document with a generated id.
  const createdAt = new Date();

  const docRef = await addDoc(collection(db, "posts"), {
    title,
    body,
    email,
    createdAt,
  });
}
export const updateBlogDocument = async (data)=>{
  const postDocRef = doc(db, 'posts', data.id);
  const posttSnapshot= await getDoc(postDocRef);
  const {title, body,email } = data;
  const createdAt = new Date();
  if(posttSnapshot.exists()){

    try{
        await updateDoc(postDocRef,{
          title,
          body,
          email,
          createdAt
        });
    }catch(e){
        console.log('error occured during updation of contact',e.message);
    }

  }else{
      return postDocRef;
  };
 
}

//get all Blog Posts with id
export const getAllBlogPost = async () => {
  const collectionRef =collection(db, 'posts');
  const q= query(collectionRef);
  //console.log(q);
  const querySnapshot = await getDocs(q);
  return querySnapshot;
}
export const getPostById= async (editId) =>{
  const docRef = doc(db,'posts',editId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}
export const delteBlogPost= async (postId) => {
  const docRef = doc(db,'posts',postId);
 
    try{
      await deleteDoc(doc(db, "posts", postId));
      return true;
    }catch(error){
      console.log('error occured during creation of contact',error.message);
    }
  
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListner = (callback) =>  onAuthStateChanged(auth, callback );