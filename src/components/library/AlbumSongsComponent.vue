<template>
  <div class="row items-center">
    <div class="col-xs-auto">
      <q-item>
        <q-item-section avatar thumbnail class="q-pr-sm col-shrink">
          <q-icon size="sm" name="arrow_back_ios" @click="$router.back()"></q-icon>
        </q-item-section>
        <q-item-section v-if="album.id">
          <q-item-label class="text-h5">{{album.name}}</q-item-label>
          <q-item-label caption lines="2">{{album.artist.name}}</q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </div>
  <q-card v-if="album.id" class="my-card" flat>
    <q-parallax :height="175">
          <q-img fit="cover" :src="getAlbumArtworkUrl(album.id)"/>
    </q-parallax>
    <q-card-actions align="left">
      <q-btn flat round color="red" icon="favorite" />
      <q-btn flat round color="teal" icon="bookmark" />
      <q-btn flat round color="primary" icon="share" />
    </q-card-actions>
  </q-card>
  <q-list separator padding>
    <q-item v-for="(song, idx) in songs.data" :key="song.id" v-ripple>
      <q-item-section side>{{(idx + 1) + '. '}}</q-item-section>

      <q-item-section class="cursor-pointer ellipsis" @click="playNewPlaylistFromIdx(idx)">
        {{song.name}}
        <q-item-label caption class="ellipsis">{{song.album.name}}</q-item-label>
      </q-item-section>

      <q-item-section side top>
        <q-item-label caption class="text-red" v-if="isCurrentSong(song.id)">{{playingSongTimeFormatted}}</q-item-label>
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
    let album = ref({});
    let getSongs = async () => {
      await apiClient.getAlbumSongs(route.params.albumId).then(response => {
        songs.value = response.data;
        album.value = response.data.data[0].album;
      });
    };

    const playlist = inject('playlist');
    const playNewPlaylist = inject('playNewPlaylist');
    const songTimeFormatted = inject('songTimeFormatted');
    const playingSongTimeFormatted = inject('playingSongTimeFormatted');
    const getAlbumArtworkUrl = inject('getAlbumArtworkUrl')

    onMounted(getSongs);

    return {
      album, songs, playlist, playNewPlaylist, songTimeFormatted, playingSongTimeFormatted, getAlbumArtworkUrl
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