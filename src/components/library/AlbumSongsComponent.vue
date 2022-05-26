<template>
  <div class="row items-center">
    <div class="col-xs-auto">
      <q-item>
        <q-item-section avatar thumbnail class="q-pr-sm col-shrink">
          <q-btn flat round size="sm" icon="arrow_back_ios" @click="$router.back()"></q-btn>
        </q-item-section>
        <q-item-section v-if="album.id">
          <q-item-label class="text-h5 ellipsis">{{album.name}}</q-item-label>
          <q-item-label caption lines="2" class="ellipsis">{{album.artist.name}}</q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </div>

  <q-card v-if="album.id" flat>
    <q-img v-if="artworkNotFound" height="175px" src=""></q-img>
    <q-img v-else class="q-pb-none" height="175px" fit="cover" :src="getAlbumArtworkUrl(album.id)" @error="artworkNotFound=true"/>
<!--    <q-parallax :height="175">-->
<!--    </q-parallax>-->
    <q-item>
      <q-item-section top>
        <q-item-label caption>Release date: {{album.year}}</q-item-label>
        <q-item-label caption lines="2">Genre: {{album.genre}}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label caption>{{album.songs_count}} song(s)</q-item-label>
        <q-item-label caption lines="2">Play time: {{songTimeFormatted(album.total_time_in_seconds)}}</q-item-label>
      </q-item-section>
    </q-item>

    <q-card-actions align="left" class="q-pt-none">
      <q-btn v-if="playlist.isPlaying" flat round icon="pause" @click="pause"/>
      <q-btn v-else flat round icon="play_arrow" @click="playNewPlaylistFromIdx(0)"/>
      <q-btn flat round icon="replay"/>
      <q-btn flat round icon="shuffle"/>
    </q-card-actions>
  </q-card>

  <q-list separator padding class="q-pt-none">
    <q-item v-for="(song, idx) in songs.data" :key="song.id" v-ripple>
      <q-item-section side class="q-pr-sm">
        <q-item-label>{{(idx + 1) + '. '}}</q-item-label>
<!--        <q-badge outline rounded color="grey">-->
<!--           <q-icon name="star" color="black" class="q-ml-xs" />-->
<!--        </q-badge>-->
      </q-item-section>

      <q-item-section class="cursor-pointer ellipsis" @click="playNewPlaylistFromIdx(idx)">
        <q-item-label class="ellipsis">{{song.name}}</q-item-label>
        <q-item-label caption class="ellipsis" lines="2">{{song.album.name}}</q-item-label>
        <q-item-label caption style="font-size: xx-small" lines="2">{{song.extension}} | {{song.bit_rate}} kbps | {{song.sample_rate}}</q-item-label>
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
    let artworkNotFound = ref(false);
    let getSongs = async () => {
      await apiClient.getAlbumSongs(route.params.albumId).then(response => {
        songs.value = response.data;
        album.value = response.data.data[0].album;
      });
    };

    const pause = inject('pause')
    const playlist = inject('playlist');
    const playNewPlaylist = inject('playNewPlaylist');
    const songTimeFormatted = inject('audioLengthFormatted');
    const playingSongTimeFormatted = inject('playingSongTimeFormatted');
    const getAlbumArtworkUrl = inject('getAlbumArtworkUrl')

    onMounted(getSongs);

    return {
      album, songs, playlist, artworkNotFound, pause, playNewPlaylist, songTimeFormatted, playingSongTimeFormatted, getAlbumArtworkUrl
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