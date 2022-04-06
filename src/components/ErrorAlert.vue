<template>
  <div class="error-wrapper">
    <div class="error">
      {{ error }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    error: null
  }
}
</script>

<style>
  .error-wrapper {
    width: 100%;
    top: 20px;
  }
  .error {
    padding: 20px;
    color: white;
    background: #ff0062;
    border-radius: 10px;
    box-shadow: 1px 3px 5px rgba(0,0,0,0.2);
    max-width: 400px;
    margin: 0 auto;
  }
</style>