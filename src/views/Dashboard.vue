<template>
  <div>
    <h1>Dashboard</h1>
    <template v-if="!isLoading">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </template>
    <p v-else>Loading events</p>
  </div>
</template>

<script>
import EventCard from '../components/EventCard'
import { mapState } from 'vuex'
export default {
  components: { EventCard },
  computed: {
    ...mapState(['events', 'isLoading'])
  },
  created() {
    this.$store.dispatch('fetchEvents')
    // axios.get('//localhost:3000/dashboard').then(({ data }) => {
    //   this.events = data.events.events
    //   this.isLoading = false
    // })
  }
}
</script>
