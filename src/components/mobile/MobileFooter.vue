<template>

  <q-footer bordered class="bg-black text-white">
    <q-toolbar>
      <q-toolbar-title>

        <MobileFooterPlayer/>
<!--        <q-avatar>-->
<!--          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">-->
<!--        </q-avatar>-->
<!--        Title-->
      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>

<script>

import MobileFooterPlayer from "./MobileFooterPlayer.vue";

export default {
  name: "MobileFooter",
  components: {MobileFooterPlayer}
}
</script>

<style scoped>

</style>