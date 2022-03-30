<template>
  <div>
    <div>
      <h3>{{ userName }}: {{ comment.date }}</h3>
      <p class="videoTime">{{ comment.videoTime }}</p>
      <p class="commentTxt">
        {{ comment.commentTxt }}
      </p>
    </div>
  </div>
</template>
<script>
import firebase from "../firebase/setup"
export default {
  props: {
    comment: null,
  },
  data() {
    return {
      userName: ""
    }
  },
  methods: {
    async getUserName(id) {
      const userSnapShot = await firebase.getUser(id)
      userSnapShot.forEach((doc) => {
        this.userName = doc.data().name
      })
    }
  },
  async created() {
    this.getUserName(this.comment.userId)
  }
};
</script>