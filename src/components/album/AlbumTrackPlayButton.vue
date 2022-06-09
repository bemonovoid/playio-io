<template>
  <div class="absolute-center playButtonIconContainer transparent">
    <q-btn v-if="player.isNowPlayingTrack(trackId)" flat round icon="pause" @click="player.pause()"/>
    <q-btn v-else flat round icon="play_arrow" @click="player.playAllTracks(tracks, trackIdx)"/>
  </div>
</template>

<script>

import {inject} from "vue";

export default {
  name: "AlbumTrackPlayButton",
  props: ['tracks', 'trackId', 'trackIdx'],
  setup() {
    const player = inject('player');
    return {player}
  }
}
</script>

<style scoped>
.playButtonIconContainer button {
  opacity: 0;
}
.playButtonIconContainer:hover button {
  opacity: 1;
}
</style>