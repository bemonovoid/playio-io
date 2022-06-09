<template>
  <div class="row justify-start">
    <q-item clickable :to="{name: 'artistAlbums', params: {artistId: artist.id}}">
      <q-item-section side class="q-pr-xs">
        <q-icon size="xs" name="arrow_back_ios_new"/>
      </q-item-section>
      <q-item-section side>
        <q-item-label caption>Albums</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label class="text-overline text-white text-bold">{{artist.name}}</q-item-label>
      </q-item-section>
    </q-item>
  </div>

  <div class="row justify-center q-pb-lg">

    <q-img v-if="useDefaultArtwork" class="artworkImage"
           src="default-album-cover.png"
           fit="contain"
           @error="useDefaultArtwork = true">
      <div class="absolute-bottom text-caption no-padding">
        <q-item dense>
          <q-item-section>
            <q-item-label caption class="text-bold">{{ album.name }}</q-item-label>
            <q-item-label><small class="text-grey-6">{{ album.genre }} | {{ album.year }}</small></q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-img>

    <q-img v-else no-transition no-spinner class="artworkImage"
        :src="getArtworkUrl()"
        fit="cover"
        @error="useDefaultArtwork = true">
      <div class="absolute-bottom text-caption no-padding">
        <q-item dense>
          <q-item-section>
            <q-item-label caption class="text-bold">{{ album.name }}</q-item-label>
            <q-item-label><small class="text-grey-6">{{ album.genre }} | {{ album.year }}</small></q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-img>
  </div>

  <q-separator inset spaced/>

  <div class="row justify-start">
    <div class="col-12">
      <q-list dense separator>
        <q-item v-for="(track, idx) in tracks" :key="track.id" clickable @click="player.playAllTracks(tracks, idx)">

          <q-item-section side>
            <q-item-label style="width: 10px">{{idx + 1}}</q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1" class="text-overline ellipsis">{{track.name}}</q-item-label>
            <q-item-label><small class="text-grey-6">{{artist.name}}</small></q-item-label>
          </q-item-section>

          <q-item-section v-if="player.isNowPlayingTrack(track.id)" side >
            <q-chip dense v-if="player.state.isPlaying" outline color="red" text-color="white" label=" Now playing " />
          </q-item-section>

          <q-item-section side>
            <q-item-label caption>{{audioLengthFormatted(track.track_length_in_seconds)}}</q-item-label>
          </q-item-section>

        </q-item>
      </q-list>
    </div>
  </div>

</template>

<script>
import {ref, inject, onMounted} from "vue";
import {useRoute} from "vue-router";
import apiClient from "../../../http/apiClient";

import ArtworkImage from "../../player/ArtworkImage.vue";

export default {
  name: "Tracks",
  components: {ArtworkImage},
  setup(props) {
    const route = useRoute();

    const player = inject('player');
    const audioLengthFormatted = inject('audioLengthFormatted');

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

    const useDefaultArtwork = ref(false);
    const getArtworkUrl = () => apiClient.buildAlbumArtworkUrl(album.value.id);

    onMounted(initAlbum)

    return {player, artist, album, tracks, audioLengthFormatted, useDefaultArtwork, getArtworkUrl}
  },
  watch: {
    'player.track': {
      handler(val, oldVal) {

      }
    }
  }
}
</script>

<style scoped>
  .artworkImage {
    height: 150px;
    width: 95%;
  }
</style>