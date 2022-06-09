<template>
  <div class="absolute-center playButtonIconContainer transparent">
    <q-btn flat round icon="play_arrow" color="red" @click="player.playAllFromSourcePath(sourceId, path)"/>
  </div>
</template>

<script>

import {inject} from "vue";

export default {
  name: "SourceContentPlayButton",
  props: ['sourceId', 'path'],
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