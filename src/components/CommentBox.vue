<template>
  <div>
    <div>
      <h3>{{ comment.userId }}: {{ comment.date }}</h3>
      <p class="videoTime">{{ comment.videoTime }}</p>
      <p class="commentTxt">
        {{ comment.commentTxt }}
      </p>
    </div>
  </div>
</template>
<script>
import { Comment } from "../firebase/setup";
export default {
  props: {
    comment: Comment,
  },
};
</script>