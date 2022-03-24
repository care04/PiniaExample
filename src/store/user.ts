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
  }),
  actions: {
    setUser(user) {
      this.state.user = user
    }
  }
})