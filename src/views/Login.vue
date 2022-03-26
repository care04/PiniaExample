<script setup lang="ts">
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/setup";
import { userStore } from "../store/user";
import router from "../router"
const store = userStore()
function loggedIn() {
  store.loggedIn()
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function logUserIn(email: string, password: string) {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      loggedIn()
      router.push("/")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error:", errorCode, ": ", errorMessage);
    });
}
</script>
<template>
  <div>
    <h1>Login</h1>
    <p>Email</p>
    <input v-model="email" />
    <p>Password</p>
    <input v-model="password" />
    <p>{{"    "}}</p>
    <button @click="logUserIn(email, password)">Login</button>
    <p>or</p>
    <router-link to="create-account">
      <button>Create New Account</button>
    </router-link>
  </div>
</template>
