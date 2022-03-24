<script setup lang="ts">
import { Video } from "../types/Video";
import { onMounted, ref } from "vue";
import firebase from "../firebase/setup";
const videos = ref()
async function getData() {
  const querySnapshot = await firebase.getCollection("Videos");
  const Videos = Array<Video>();
  querySnapshot.forEach((doc) => {
    const video: Video = {
      name: doc.data().name,
      ytUrl: doc.data().ytUrl,
      id: doc.data().id,
      docId: doc.id,
      creators: [""],
    };
    Videos.push(video);
  });
  return Videos;
}
onMounted(async () => {
  videos.value = await getData()
})
</script>
<template>
  <div class="home">
    <h2>Videos</h2>
    <div v-for="video in videos" :key="video.id" class="videoBox">
      <router-link
        :to="{
          name: 'Video',
          params: { videoId: video.docId },
        }"
      >
        <h5>{{ video.name }}</h5>
      </router-link>
    </div>
  </div>
</template>
