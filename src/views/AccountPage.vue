<script lang="ts" setup>
import { onMounted, ref } from "@vue/runtime-core"
import { userStore } from "../store/user"
const store = userStore()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const user = store.state.user
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const videos = ref();
onMounted(() => {
  videos.value = store.state.videos
  console.log("state",store.state.videos, "videos on page",videos.value[0])
})
</script>
<template>
  <div>
    <h1>{{ user.name }}</h1>
    <p>{{ user.id }}</p>
    <h4>{{ user.email }}</h4>
    <button>Edit Account</button>
    <div v-if="user.creator == true">
      <h1>Video's Created</h1> 
      <router-link to="/add-video"><button> + </button></router-link>
      <div v-for="video in videos" :key="video.id">
        <h4>{{ video }}</h4>
      </div>
    </div>
  </div>
</template>