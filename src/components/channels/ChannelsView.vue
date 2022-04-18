<template>
  <div class="q-pa-md q-gutter-md">

    <q-toolbar>
      <q-icon size="md" name="podcasts" color="primary"></q-icon>
      <q-toolbar-title>
        Channels
        <q-item-label caption>Description what is channels</q-item-label>
      </q-toolbar-title>

      <q-btn v-if="$route.name === 'channelsList'" color="blue" flat round icon="add" to="/channels/new"/>

    </q-toolbar>

    <q-separator spaced/>

    <router-view/>

  </div>

</template>

<script>

import { } from 'vue'

export default {
  name: "ChannelsView",
  setup () {

  }

}
</script>

<style scoped>

</style>