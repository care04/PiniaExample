<script setup lang="ts">
import { userStore } from "../store/user";
const store = userStore()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function logUserIn(email: string, password: string) {
  store.logIn(email, password)
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
