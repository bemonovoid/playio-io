<template>
  <div>
    <audio ref="audioPlayerDOMElementRef" autoplay
           v-on:loadstart="onAudioLoadStart()"
           v-on:loadedmetadata="onAudioLoadedMetadata()"
           v-on:timeupdate="onAudioTimeUpdate()"
           v-on:ended="onAudioEnded()"
           v-on:canplay="onAudioCanPlay()"
           v-on:play="onAudioPlay()"
           v-on:pause="onAudioPause()">
    </audio>
  </div>
  <AppView/>
</template>

<script>

import apiClient from "./http/apiClient";
import AppView from "./components/AppView.vue";
import {onMounted, computed, provide, reactive, ref, toRefs} from "vue";
import moment from "moment";
export default {
  name: "App",
  components: {AppView},
  setup() {
    const audioPlayerDOMElementRef = ref(null);
    const playlist = reactive({
      isPlaying: false,
      playingSongDuration: 0,
      playingSongCurrentTime: 0,
      queue: []
    });

    const loadSong = (songId) => {
      audioPlayerDOMElementRef.value.src = apiClient.getSongAudioStreamUrl(songId);
      audioPlayerDOMElementRef.value.load();
    }

    const play = (songId) => {
      if (isNaN(songId)) {
        audioPlayerDOMElementRef.value.play();
      } else {
        loadSong(songId);
      }
      playlist.isPlaying = true;
    }

    const playNewPlaylist = (songs) => {
      playlist.queue = songs;
      play(playlist.queue[0].id);
    }

    const playNext = () => {
      if (playlist.queue.length > 1) {
        playNewPlaylist(playlist.queue.slice(1));
      }
    }

    const pause = () => {
      audioPlayerDOMElementRef.value.pause();
      playlist.isPlaying = false;
    };

    const setPlayFromTime = (playFromTime) => {
      audioPlayerDOMElementRef.value.currentTime = playFromTime;
    }

    const volume = (vol) => audioPlayerDOMElementRef.value.volume = vol;

    const songTimeFormatted = (lengthInSeconds) => {
      let format = 'mm:ss';
      if (lengthInSeconds >= 3600) {
        format = 'HH:mm:ss';
      }
      return moment().startOf('day').seconds(lengthInSeconds).format(format);
    }

    const playingSongTimeFormatted = computed(() => {
      return songTimeFormatted(playlist.playingSongCurrentTime);
    });

    const playingSongReverseTimeFormatted = computed(() => {
      if (audioPlayerDOMElementRef.value) {
        return songTimeFormatted(audioPlayerDOMElementRef.value.duration - playlist.playingSongCurrentTime);
      }
      return '00:00'
    })

    onMounted(() => {
      audioPlayerDOMElementRef.value.volume = 0.5
    });

    provide('play', play);
    provide('pause', pause);
    provide('volume', volume);
    provide('playNext', playNext)
    provide('playNewPlaylist', playNewPlaylist);
    provide('setPlayFromTime', setPlayFromTime);

    provide('playlist', playlist);

    provide('songTimeFormatted', songTimeFormatted);
    provide('playingSongTimeFormatted', playingSongTimeFormatted);
    provide('playingSongReverseTimeFormatted', playingSongReverseTimeFormatted);

    return {audioPlayerDOMElementRef, playlist}
  },

  methods: {
    audioLoadSong(songId) {

    },
    onAudioLoadStart() {

    },
    onAudioCanPlay() {
      console.log("onAudioCanPlay")
    },
    onAudioPlay() {

    },
    onAudioPause() {

    },
    onAudioEnded() {

    },
    onAudioTimeUpdate() {
      this.playlist.playingSongCurrentTime = this.audioPlayerDOMElementRef.currentTime;
    },
    onAudioLoadedMetadata() {
      this.playlist.playingSongDuration = this.audioPlayerDOMElementRef.duration;
    }
  }
}
</script>

<style scoped>

</style>