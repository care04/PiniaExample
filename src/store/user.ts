import { createStore } from "pinia";
import { signInWithEmailAndPassword } from "firebase/auth"
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
  }),
  actions: {
    setUser(user) {
      this.state.user = user
    },
    loggedIn() {
      this.state.loggedIn = true
    },
    loggedOut() {
      this.state.loggedIn = false
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
          router.push("/")
        })
        .catch((error) => {
          console.log("error", error.code, error.message)
          return error
        })
    }
  }
})