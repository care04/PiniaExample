import { createStore } from "pinia";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import firebase, { auth } from "../firebase/setup";
import router from "../router"

export const userStore = createStore({
  id: "user",
  state: () => ({
    user: {
      name: "",
      id: "",
      creator: false,
      password:"",
      email: "",
    },
    loggedIn: false,
    videos: [],
    errorAlert: "",
    error: false,
  }),
  actions: {
    loggedOut() {
      this.state.loggedIn = false
      this.state.user = {
        name: "",
        id: "",
        creator: false,
        password:"",
        email: "",
      }
      this.state.videos = []
    },
    addVideo(video) {
      this.state.videos += video
    },
    logIn(email: string, password: string) {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (data) => {
          this.state.loggedIn = true
          const user = await firebase.getUser(data.user.uid)
          user.forEach((doc) => {
            const createdUser = {
              name: doc.data().name ?? "", 
              id: doc.data().id ?? "", 
              creator: doc.data().creator ?? false,
              password: doc.data().password ?? "",
              email: doc.data().email ?? "",
            }
            this.state.user = createdUser
            if (doc.data().creator == true ) {
              this.state.videos = doc.data().videos
            }
          })
          this.state.error = false
          this.state.errorAlert = ""
          router.push("/")
        })
        .catch((error) => {
          this.state.errorAlert = error.message
          this.state.error = true
        })
    },
    createUser(name: string, email: string, password: string, creator: boolean) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          updateProfile(userCredential.user, {
            displayName: name
          })
          const user = {
            name: name,
            id: userCredential.user.uid,
            creator: creator,
            password: password,
            email: email,
          }
          this.state.user = user
          firebase.addUser(user)
          this.state.loggedIn = true
          this.state.error = false
          this.state.errorAlert = ""
          router.push("/")
        })
        .catch((error) => {
          this.state.errorAlert = error.message
          this.state.error = true
        })
    }
  }
})