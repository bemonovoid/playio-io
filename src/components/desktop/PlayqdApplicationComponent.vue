<template>

  <div>

    <audio ref="audioPlayerDOMElementRef" autoplay
           v-on:loadstart="onAudioLoadStart()"
           v-on:loadedmetadata="onAudioLoadedMetadata()"
           v-on:timeupdate="onAudioTimeUpdate()"
           v-on:ended="onAudioEnded()"
           v-on:canplay="onAudioCanPlay()"
           v-on:play="onAudioPlay()"
           v-on:pause="onAudioPause()"
           v-on:error="onAudioError()">
    </audio>

  </div>

  <LayoutComponent/>

</template>

<script>

import moment from "moment";
import {onMounted, computed, provide, reactive, ref, toRefs} from "vue";
import apiClient from "../../http/apiClient";
import LayoutComponent from "./LayoutComponent.vue";

export default {
  name: "PlayqdApplicationComponent",
  components: {
    LayoutComponent
  },
  setup() {
    const SOURCE_KIND_CHANNEL = 'channel';
    const SOURCE_KIND_LIBRARY = 'library';
    const SOURCE_KIND_ALBUM = 'album';

    const audioPlayerDOMElementRef = ref(null);

    const player = reactive({
      source: {
        id: null,
        name: null,
        kind: SOURCE_KIND_LIBRARY, // library, channel, user_playlist
      },
      state: {
        muted: false,
        volume: 0.5,
        isPlaying: false,
        currentlyPlayingItemDuration: 0,
        currentlyPlayingItemSecond: 0,
      },
      queue: [],
      play: (source) => {
        play(source);
      },
      pause: () => pause(),
      isEmpty: () => !(player.queue.length > 0),
      isNowPlayingThisItem: (sourceId) => {
        return isNowPlayingThisItem(sourceId);
      }
    });

    const isNowPlayingThisItem = (sourceId) => {
      return player.state.isPlaying && player.queue[0].id === sourceId;
    };

    const playlist = reactive({
      info: {
        kind: SOURCE_KIND_CHANNEL, // library, channel, user_playlist
        id: null,
        name: null,
      },
      state: {
        muted: false,
        volume: 0.5,
        isPlaying: false,
        currentlyPlayingItemDuration: 0,
        currentlyPlayingItemSecond: 0,
      },
      queue: []
    });

    const playNextInChannel = () => {
      setTimeout(() => {
        apiClient.getChannelNowPlayingTrack(player.source.id).then(res => {
          player.queue = [res.data.track];
          player.state.currentlyPlayingItemSecond = 0;
          loadAudioTrackFrom(player.queue[0].id, 0);
        });
      }, 1000);
    };

    const loadAudioChannel = (channelId) => {
      apiClient.getChannelNowPlayingTrack(channelId).then(res => {
        let nowPlayingTrack = res.data.track;
        let playStartedAt = res.data.play_start_date; // 2022-04-15T13:19:34.974526
        let playStartedAtMoment = moment(playStartedAt, moment.DATETIME_LOCAL_MS);
        let momentDiffInSeconds = moment.duration(moment().diff(playStartedAtMoment)).as('seconds');

        player.queue = [nowPlayingTrack];
        player.state.currentlyPlayingItemSecond = momentDiffInSeconds;

        loadAudioTrackFrom(player.queue[0].id, player.state.currentlyPlayingItemSecond);
      });
    };

    const play = (source) => {
      if (source) {
        player.source.id = source.id;
        player.source.name = source.name;
        player.source.kind = source.kind;
        if (player.source.kind === SOURCE_KIND_LIBRARY) {
          player.queue = []
          loadAudioTrackFrom(source.id, 0);
        } else if (player.source.kind === SOURCE_KIND_ALBUM) {
          player.queue = source.id;
          loadAudioTrackFrom(player.queue[0].id, 0);
        } else if (player.source.kind === SOURCE_KIND_CHANNEL) {
          loadAudioChannel(player.source.id);
        }
      } else {
        audioPlayerDOMElementRef.value.play(); // When play a song that was set on pause
      }
    };

    const loadAudioTrackFrom = (trackId, fromSeconds) => {
      audioPlayerDOMElementRef.value.src = apiClient.buildStreamingItemUrl(trackId);
      audioPlayerDOMElementRef.value.currentTime = fromSeconds;
      audioPlayerDOMElementRef.value.load();
    };

    const playNewPlaylist = (songs) => {
      player.queue = songs;
      play(player.queue[0].id);
    }

    const playNext = () => {
      if (player.queue.length > 1) {
        playNewPlaylist(player.queue.slice(1));
      }
    };

    const pause = () => {
      audioPlayerDOMElementRef.value.pause();
    };

    const setMuteOnOff = () => {
      audioPlayerDOMElementRef.value.muted = player.state.muted = !player.state.muted;
    };

    const setVolume = () => {
      if (audioPlayerDOMElementRef.value.muted) {
        setMuteOnOff();
      }
      audioPlayerDOMElementRef.value.volume = player.state.volume;
    };

    const setPlayFromTime = (playFromTime) => {
      audioPlayerDOMElementRef.value.currentTime = playFromTime;
    };

    const audioLengthFormatted = (lengthInSeconds) => {
      let format = 'mm:ss';
      if (lengthInSeconds >= 3600) {
        format = 'HH:mm:ss';
      }
      return moment().startOf('day').seconds(lengthInSeconds).format(format);
    };

    const currentlyPlayingSongTime = computed(() => {
      return audioLengthFormatted(player.state.currentlyPlayingItemSecond);
    });

    const currentlyPlayingSongTimeReversed = computed(() => {
      if (audioPlayerDOMElementRef.value) {
        return audioLengthFormatted(audioPlayerDOMElementRef.value.duration - player.state.currentlyPlayingItemSecond);
      }
      return '00:00'
    });

    onMounted(() => {
      audioPlayerDOMElementRef.value.volume = player.state.volume;
    });

    provide('play', play);
    provide('pause', pause);
    provide('playNext', playNext)
    provide('playNewPlaylist', playNewPlaylist);

    provide('player', player);

    provide('setMuteOnOff', setMuteOnOff);
    provide('setVolume', setVolume);
    provide('setPlayFromTime', setPlayFromTime);

    provide('audioLengthFormatted', audioLengthFormatted);

    provide('currentlyPlayingSongTime', currentlyPlayingSongTime);
    provide('currentlyPlayingSongTimeReversed', currentlyPlayingSongTimeReversed);

    return {
      SOURCE_KIND_CHANNEL, audioPlayerDOMElementRef,
      playNext, playNextInChannel, player
    }
  },

  methods: {
    onAudioLoadStart() {

    },
    onAudioCanPlay() {

    },
    onAudioPlay() {
      this.player.state.isPlaying = true;
    },
    onAudioPause() {
      this.player.state.isPlaying = false;
    },
    onAudioEnded() {
      if (this.player.source.kind === this.SOURCE_KIND_CHANNEL) {
        this.playNextInChannel();
      } else {
        this.playNext();
      }
    },
    onAudioTimeUpdate() {
      this.player.state.currentlyPlayingItemSecond = this.audioPlayerDOMElementRef.currentTime;
    },
    onAudioLoadedMetadata() {
      this.player.state.currentlyPlayingItemDuration = this.audioPlayerDOMElementRef.duration;
    },
    onAudioError() {
      console.error("Failed to play audio. Something went wrong, probably io error");
    }
  }

}
</script>

<style scoped>

</style>