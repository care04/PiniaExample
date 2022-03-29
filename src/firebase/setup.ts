import { initializeApp } from "firebase/app";
import { Comment, User } from "../types/Video";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDbR7Ye2czRrEyX7XP9AVyBgIc9K1pLAmM",
  authDomain: "videocommenttest.firebaseapp.com",
  projectId: "videocommenttest",
  storageBucket: "videocommenttest.appspot.com",
  messagingSenderId: "977429959556",
  appId: "1:977429959556:web:7ad20c4852d662c12d03d1",
  measurementId: "G-GVVZQDBTSP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
export default {
  async getCollection(path: string) {
    const querySnapshot = await getDocs(collection(db, path));
    return querySnapshot;
  },
  async comments(docId: string) {
    const commentSnapShot = await getDocs(
      collection(db, "Videos/", docId, "Comments")
    );
    return commentSnapShot;
  },
  async getVideo(docId: string) {
    const querySnapshot = await getDoc(doc(db, "Videos", docId));
    return querySnapshot;
  },
  async addComment(comment: Comment, docId: string) {
    const date = comment.date
    console.log("date: ", date)
    try {
      const docRef = await addDoc(collection(db, "Videos", docId, "Comments"), {
        commentTxt: comment.commentTxt,
        date: comment.date,
        id: comment.id,
        userId: comment.userId,
        videoTime: comment.videoTime
      });
      console.log("doc id", docRef.id)
    } catch(error) {
      console.log("error adding document", error)
    }
  },
  async addUser(user: User) {
    try {
      const docRef = await addDoc(collection(db, "Users"), user);
      console.log("doc id",docRef.id)
    } catch(error) {
      console.log("error adding document", error)
    }
  },
};
