<template></template>

<script>
export default {
  created() {
    this.$store.dispatch('logout')
    this.$router.push({ name: 'login' })
  }
}
</script>

<style>
</style>