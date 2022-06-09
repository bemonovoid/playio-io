<template>
  <div class="absolute-center playButtonIconContainer transparent">
    <q-btn v-if="player.isNowPlayingTrack(trackId)"
           flat round color="red" icon="pause" @click="player.pause()" />
    <q-btn v-else
           flat round color="red" icon="play_arrow" @click="playTrack()"/>
  </div>
</template>

<script>

import {inject} from "vue";
import apiClient from "../../http/apiClient";

export default {
  name: "TrackPlayButton",
  props: ['trackId', 'trackIdx', 'tracks'],
  setup() {
    const player = inject('player');
    return {player}
  },
  methods: {
    playTrack() {
      if (this.trackIdx !== null && this.trackIdx !== undefined) {
        this.player.playAllTracks(this.tracks, this.trackIdx);
      } else {
        apiClient.getTrack(this.trackId).then(res => {
          this.player.playTrack(res.data);
        });
      }
    }
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