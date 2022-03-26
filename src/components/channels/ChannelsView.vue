<template>
  <div>
    <q-tabs align="left" v-model="tab" inline-label indicator-color="amber" no-caps>
    <q-tab name="all" label="All"/>
    <q-tab name="alarms" label="Featured" />
    <q-route-tab name="new" label="Create new channel" :to="{name: 'newChannel'}"></q-route-tab>
    </q-tabs>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </div>


</template>

<script>

import { ref } from 'vue'

export default {
  name: "ChannelsView",
  setup () {
    return {
      tab: ref('all')
    }
  }
}
</script>

<style scoped>

</style>