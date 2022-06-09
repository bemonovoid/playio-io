<template>
  <q-icon v-if="useDefaultArtwork" name="album" size="xl" class="no-padding"></q-icon>
<!--  <q-img v-if="useDefaultArtwork" src="default-album-cover.png"></q-img>-->
  <q-img loading="eager" no-spinner no-transition v-else :src="getArtworkUrl(albumId)" @error="useDefaultArtwork = true"></q-img>
</template>

<script>

import {ref} from "vue";
import apiClient from "../../http/apiClient";

export default {
  name: "ArtworkImage",
  props: ["albumId"],
  setup(props) {
    const useDefaultArtwork = ref(false);
    const getArtworkUrl = () => apiClient.buildAlbumArtworkUrl(props.albumId);
    return {getArtworkUrl, useDefaultArtwork}
  },
  watch: {
    albumId(newUrl, oldUrl) {
      this.useDefaultArtwork = false;
    }
  }
}
</script>

<style scoped>

</style>