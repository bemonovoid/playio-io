<template>
  <q-footer success bordered class="bg-green ">
    <q-toolbar>
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
      </q-avatar>

      <q-toolbar-title v-if="playlist.queue.length > 0">{{playlist.queue[0].name}}</q-toolbar-title>
      <q-toolbar-title v-else>Playlist is empty</q-toolbar-title>

    </q-toolbar>

    <q-item>
      <q-item-section side>
        <q-item-label class="text-white" caption>{{playingSongTimeFormatted}}</q-item-label>
      </q-item-section>
      <q-item-section>
        <q-slider :step="1" color="red" :model-value="playlist.playingSongCurrentTime" :min="0" :max="playlist.playingSongDuration" @change="setPlayFromTime"/>
      </q-item-section>
      <q-item-section side>
        <q-item-label class="text-white" caption> - {{playingSongReverseTimeFormatted}}</q-item-label>
      </q-item-section>
    </q-item>

    <q-toolbar inset>
      <div class="row">
        <div class="col-auto absolute-center">
          <q-btn flat round dense v-if="playlist.isPlaying" icon="pause" @click="pause"/>
          <q-btn flat round dense v-else icon="play_arrow" @click="play"/>
          <q-btn flat round dense icon="skip_next" @click="playNext" :disable="playlist.queue.length === 1"/>
        </div>
      </div>
    </q-toolbar>
  </q-footer>
</template>

<script>
import {ref, inject} from "vue";

export default {
  name: "PlayerFooter",
  setup() {
    const setPlayFromTime = inject('setPlayFromTime');
    const playlist = inject('playlist')
    const playNext = inject('playNext')
    const pause = inject('pause')
    const play = inject('play')

    const volume = ref(0);

    const playingSongTimeFormatted = inject('playingSongTimeFormatted');
    const playingSongReverseTimeFormatted = inject('playingSongReverseTimeFormatted');

    return {
      playlist, playNext, pause, play, volume, playingSongTimeFormatted, playingSongReverseTimeFormatted, setPlayFromTime
    }
  }

}
</script>

<style scoped>

</style>