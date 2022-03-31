import { createStore } from "pinia";

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
    }
  }
})