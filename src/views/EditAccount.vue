<script lang="ts" setup>
import { ref } from "vue";
const name = ref();
const email = ref();

</script>
<template>
  <div>
    <h1>Edit Account</h1>
    <p>Name</p>
    <input v-model="name" />
    <p>Password</p>
    <input v-model="password" /><br/>
    <router-link to="/account-page">
      <button>Save Changes</button>
    </router-link>
  </div>
</template>