<script setup lang="ts">
import { userStore } from "../store/user"
const store = userStore()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loggedIn = store.state.loggedIn
</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>Logged In {{ loggedIn }}</p>
  </div>
</template>
