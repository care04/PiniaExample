
<script lang="ts" setup>
import {ref} from "vue";
import firebase, {auth} from "../firebase/setup";
import { FirebaseVieo } from "../types/Video";
import { userStore } from "../store/user";
const store = userStore()
const name = ref()
const YTUrl = ref()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function saveVideo() {
  const videoId = "_" + Math.random().toString(36).substr(2, 9);
  const currentUserId = auth.currentUser?.uid
  if (name.value != undefined && YTUrl.value != undefined) {
    const video: FirebaseVieo = {
      name: name.value,
      id: videoId,
      ytUrl: YTUrl.value,
      creators: [currentUserId ?? ""],
    }
    const id = await firebase.addVideo(video)
    const VIDEO = {
      name: video.name,
      id: video.id,
      YTUrl: video.ytUrl,
      creators: video.creators,
      docId: id ?? ""
    }
    store.addVideo(VIDEO)
  } else {
    console.log("must enter a value for both name and YTUrl")
  }
}
</script>
<template>
  <div>
    <h1>Add New Video</h1>
    <p>Name</p>
    <input type="text" v-model="name">
    <p>YTUrl</p>
    <input type="text" v-model="YTUrl"><br/>
    <button @click="saveVideo">Save</button>
  </div>
</template>