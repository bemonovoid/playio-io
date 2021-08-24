<template>
  <q-list bordered separator>
    <q-item v-for="(song, idx) in songs.data" :key="song.id" v-ripple>
      <q-item-section side>{{(idx + 1) + '. '}}</q-item-section>

      <q-item-section class="cursor-pointer ellipsis" @click="playNewPlaylistFromIdx(idx)">
        {{song.name}}
        <q-item-label caption class="ellipsis">{{song.album.name}}</q-item-label>
      </q-item-section>

      <q-item-section side top>
        <q-item-label class="text-blue" caption v-if="isCurrentSong(song.id)">{{playingSongTimeFormatted}}</q-item-label>
        <q-item-label caption side v-else>{{songTimeFormatted(song.trackLengthInSeconds)}}</q-item-label>
        <FavoriteSongComponent :song="song"/>
      </q-item-section>

    </q-item>
  </q-list>
</template>

<script>

import FavoriteSongComponent from "./FavoriteSongComponent.vue";

import {useRoute} from "vue-router";
import {onMounted, ref, inject} from "vue";
import apiClient from "../../http/apiClient";

export default {
  name: "AlbumSongsComponent",
  components: {FavoriteSongComponent},
  setup() {
    const route = useRoute();
    let songs = ref([]);
    let getSongs = async () => {
      await apiClient.getAlbumSongs(route.params.albumId).then(response => {
        songs.value = response.data;
      });
    };

    const playlist = inject('playlist');
    const playNewPlaylist = inject('playNewPlaylist');
    const songTimeFormatted = inject('songTimeFormatted');
    const playingSongTimeFormatted = inject('playingSongTimeFormatted');

    onMounted(getSongs);

    return {
      songs, playlist, playNewPlaylist, songTimeFormatted, playingSongTimeFormatted
    }
  },
  methods: {
    playNewPlaylistFromIdx(fromIdx) {
      this.playNewPlaylist(this.songs.data.slice(fromIdx));
    },
    isCurrentSong(songId) {
      return this.playlist.queue.length > 0 && this.playlist.queue[0].id === songId;
    }
  }
}
</script>

<style scoped>

</style>