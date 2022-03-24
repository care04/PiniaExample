<script setup lang="ts">
import { createUserWithEmailAndPassword } from "firebase/auth";
import firebase, { auth } from "../firebase/setup";
import { User } from "../types/Video";
import { ref } from "vue";
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
function createAccount() {
  if (greatorThanZero([name.value, email.value, password.value])) {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user: User = {
          name: name.value,
          id: userCredential.user.uid,
          creator: creator.value,
          password: password.value,
          email: email.value,
        };
        firebase.addUser(user);
      })
      .catch((error) => {
        console.log("error", error.code, ": ", error.message);
      });
  }
}
</script>
<template>
  <div>
    <h4>Create Account</h4>
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
