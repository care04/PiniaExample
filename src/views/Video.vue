<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Video, Comment } from "../types/Video";
import firebase, { auth } from "../firebase/setup";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { YoutubeVue3 } from "youtube-vue3";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import CommentBox from "../components/CommentBox.vue";
import { serverTimestamp } from "firebase/firestore";
import { userStore } from "../store/user"
const store = userStore()
interface Props {
  videoId: string;
}
// eslint-disable-next-line no-undef
const props = defineProps<Props>();
const COMMENTS = ref();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let notLoggedInError = false
const commentText = ref();
const newCommentTimeStamp = ref();
const youtube = ref();
const video = ref<Video>({
  name: "",
  ytUrl: "",
  id: "",
  docId: "",
  creators: [""],
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function goToVideoTime(time: number) {
  youtube.value.player.pauseVideo();
  await youtube.value.player.seekTo(time, true);
}
async function VIDEO() {
  const v = await firebase.getVideo(props.videoId);
  const Video: Video = {
    name: v.data()?.name,
    ytUrl: v.data()?.ytUrl,
    id: v.data()?.id,
    docId: v.id,
    creators: v.data()?.creators,
  };
  return Video;
}
async function Comments() {
  const commentSnapshot = await firebase.comments(video.value.docId);
  const Comments = Array<Comment>();
  commentSnapshot.forEach((doc) => {
    const date = new Intl.DateTimeFormat("default", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format((doc.data().date.toDate() as Date) ?? Date());
    const comment: Comment = {
      commentTxt: doc.data().commentTxt,
      date: date,
      userId: doc.data().userId,
      id: doc.data().id,
      videoTime: doc.data().videoTime,
    };
    Comments.push(comment);
  });
  return Comments;
}
function formatDate(date: Date) {
  const DATE = new Intl.DateTimeFormat("default", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
  return DATE;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function commentStarted() {
  youtube.value.player.pauseVideo();
  newCommentTimeStamp.value = await youtube.value.player.getCurrentTime();
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function postComment() {
  if (store.state.loggedIn) {
    const date = new Date();
    const commentId = "_" + Math.random().toString(36).substr(2, 9);
    if (commentText.value.length > 0) {
      const comment: Comment = {
        commentTxt: commentText.value,
        userId: auth.currentUser?.uid ?? "",
        id: commentId,
        videoTime: newCommentTimeStamp.value,
        date: serverTimestamp(),
      };
      firebase.addComment(comment, video.value.docId);
      commentText.value = "";
      comment.date = formatDate(date);
      COMMENTS.value.push(comment);
    }
  } else {
    notLoggedInError = true
    console.log("must log in to post comments", notLoggedInError)
  }
}
onMounted(async() => {
  console.log(auth.currentUser?.uid)
  video.value = await VIDEO()
  COMMENTS.value = await Comments()
})
</script>
<template>
  <div>
    <h3>Video</h3>
    <h6>{{ video.name }}</h6>
    <YoutubeVue3
      :videoid="video.ytUrl"
      ref="youtube"
      :width="480"
      :height="320"
    />
    <br />
    <div v-if="store.state.loggedIn">
      <input @click="commentStarted" v-model="commentText" />
      <button @click="postComment">Post</button>
    </div>
    <div v-for="comment in COMMENTS" :key="comment.id">
      <CommentBox
        :comment="comment"
        class="commentBox"
        @click="goToVideoTime(comment.videoTime)"
      />
    </div>
  </div>
</template>