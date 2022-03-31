<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/account-page" v-if="store.state.loggedIn">Account</router-link> |
      <router-link to="/login" v-if="!store.state.loggedIn">Login</router-link>
      <button @click="logOut" v-if="store.state.loggedIn">Log Out</button>
    </div>
    <router-view/>
  </div>
</template>
<script setup lang="ts">
import { userStore } from "./store/user"
import { auth } from "./firebase/setup"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const store = userStore()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function logOut() {
  await auth.signOut()
  .then(() => {
    store.loggedOut()
  })
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
