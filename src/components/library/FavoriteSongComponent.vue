<template>
  <q-icon v-if="song.favorite" size="xs" name="star" color="gray" @click="updateSongFavoriteStatus" />
  <q-icon v-else size="xs" name="star_border" color="gray" @click="updateSongFavoriteStatus" />
</template>

<script>

import apiClient from "../../http/apiClient";

export default {
  name: "FavoriteSongComponent",
  props: ['song'],
  methods: {
    updateSongFavoriteStatus() {
      apiClient.updateSongFavoriteStatus(this.song.id).then(response => {
        this.song.favorite = !this.song.favorite;
      });
    }
  }

}
</script>

<style scoped>

</style>