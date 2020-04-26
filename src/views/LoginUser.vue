<template>
  <div>
    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input v-model="email" type="email" name="email" value />

      <label for="password">Password:</label>
      <input v-model="password" type="password" name value />

      <button type="submit" name="button">Login</button>
      <p>{{this.error}}</p>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    login() {
      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: 'dashboard' })
        })
        .catch(err => {
          //console.log(err.response)
          this.error = err.response.data.error
          //console.log(this.error)
        })
    }
  }
}
</script>
<style  scoped>
p {
  color: red;
}
</style>