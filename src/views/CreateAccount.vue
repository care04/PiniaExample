<script setup lang="ts">
import { onMounted, ref } from "vue";
import { userStore } from "../store/user"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorAlert from "../components/ErrorAlert.vue";
const store = userStore()
const name = ref();
const email = ref();
const password = ref();
const creator = ref(false);
function greatorThanZero(text: Array<string>) {
  text.forEach((item) => {
    if (item.length === 0) {
      return false;
    }
  });
  return true;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createAccount() {
  if (greatorThanZero([name.value, email.value, password.value])) {
    store.createUser(name.value, email.value, password.value, creator.value)
  }
}
onMounted(() => {
  store.state.error = false
  store.state.errorAlert = ""
})
</script>
<template>
  <div>
    <h4>Create Account</h4>
    <ErrorAlert :error="store.state.errorAlert" v-if="store.state.error"/>
    <p>Name</p>
    <input v-model="name" />
    <p>Email</p>
    <input v-model="email" />
    <p>Password</p>
    <input v-model="password" />
    <h5>Creator</h5>
    <p>{{ creator }}</p>
    <input type="checkbox" @click="creator = true" v-model="creator" /><br />
    <button @click="createAccount">Create</button>
  </div>
</template>
