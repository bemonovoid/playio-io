<template>
  <div>
    <AlbumHeader :artist="artist" :album="album" :tracks="tracks"/>
    <AlbumTracks :tracks="tracks"/>
  </div>
</template>

<script>

import {useRoute} from "vue-router";
import {onMounted, ref} from 'vue'

import apiClient from "../../http/apiClient";
import AlbumHeader from "./AlbumHeader.vue";
import AlbumTracks from "./AlbumTracks.vue";

export default {
  name: "AlbumView",
  components: {AlbumHeader, AlbumTracks},
  props: ["albumId"],
  setup() {
    const route = useRoute();
    const artist = ref({});
    const album = ref({});
    const tracks = ref([]);

    let initAlbum = () => {
      apiClient.getAlbumTracks(route.params.albumId).then(res => {
        artist.value = res.data[0].artist;
        album.value = res.data[0].album;
        tracks.value = res.data;
      });
    };

    onMounted(initAlbum)

    return {artist, album, tracks}
  }
}
</script>

<style >
.underline-on-hover:hover {
  text-decoration: underline;
}
</style>