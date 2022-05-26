<template>
  <q-toolbar>
    <q-btn flat round @click="back()">
        <q-icon size="md" name="arrow_circle_left" color="grey" class="q-px-xs"></q-icon>
    </q-btn>
    <q-btn flat round @click="forward()">
      <q-icon size="md" name="arrow_circle_right" color="grey" class="q-px-xs"></q-icon>
    </q-btn>

  </q-toolbar>
</template>

<script>
export default {
  name: "NavigationToolbar",
  methods: {
    back() {
      this.$router.back();
    },
    forward() {
      this.$router.forward();
    }
  }
}
</script>

<style scoped>

</style>
