<template>
  <div class="absolute-center playButtonIconContainer transparent">
    <q-btn v-if="player.isNowPlayingThisItem(sourceId)" flat round icon="pause" @click="player.pause()"/>
    <q-btn v-else flat round icon="play_arrow" @click="player.play({id: sourceId, kind: sourceKind})"/>
  </div>
</template>

<script>

import {inject} from "vue";

export default {
  name: "TrackListItemPlayButton",
  props: ["sourceId", "sourceKind"],
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