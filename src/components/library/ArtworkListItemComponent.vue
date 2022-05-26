<template>
  <q-avatar square size="55px">
    <q-img v-if="showDefaultAlbumImage" src="default-album-cover.png">
      <TrackListItemPlayButton :source-id="sourceId" :source-kind="'library'"/>
    </q-img>
    <q-img v-else :src="artWorkUrl"  @error="showDefaultAlbumImage = true">
      <TrackListItemPlayButton :source-id="sourceId" :source-kind="'library'"/>
    </q-img>
  </q-avatar>
</template>

<script>

import {ref} from "vue"

import TrackListItemPlayButton from "../player/TrackListItemPlayButton.vue";

export default {
  name: "ArtworkListItemComponent",
  components: {TrackListItemPlayButton},
  props: ["sourceId", "artWorkUrl"],
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