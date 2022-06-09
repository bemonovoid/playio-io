<template>
  <q-avatar rounded>
    <q-icon v-if="showDefaultAlbumImage" name="album" size="lg"/>
    <q-img v-else :src="artWorkUrl"  @error="showDefaultAlbumImage = true"/>
  </q-avatar>
</template>

<script>

import {ref} from "vue"

export default {
  name: "TrackArtworkAvatar",
  props: ["artWorkUrl"],
  setup() {
    const showDefaultAlbumImage = ref(false);
    return {
       showDefaultAlbumImage
    }
  }
}
</script>

<style scoped>

</style>