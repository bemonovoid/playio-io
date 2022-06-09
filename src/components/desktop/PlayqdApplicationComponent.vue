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

  <MobileLayout class="mobile-only"/>

</template>

<script>

import moment from "moment";
import {onMounted, computed, provide, reactive, ref} from "vue";
import apiClient from "../../http/apiClient";
import LayoutComponent from "./LayoutComponent.vue";
import MobileLayout from "../mobile/MobileLayout.vue";

export default {
  name: "PlayqdApplicationComponent",
  components: {
    LayoutComponent,
    MobileLayout
  },
  setup() {
    const audioPlayerDOMElementRef = ref(null);

    const player = reactive({
      track: null,
      channel: null,
      repeat: {
        one: false,
        all: false
      },
      state: {
        muted: false,
        volume: 0.5,
        isPlaying: false,
        currentlyPlayingItemDuration: 0,
        currentlyPlayingItemSecond: 0,
      },
      queue: [],
      playAllTracks: (tracks, playFromIdx) => playFromTracks(tracks, playFromIdx),
      playAllFromSourcePath: (sourceId, path) => playAllFromSourcePath(sourceId, path),
      playTrack: (track) => playTrack(track),
      playTrackFromQueue: (trackIdx) => playTrackFromQueue(trackIdx),
      playNextTrack: () => playNextTrack(false),
      playChannel: (channel) => {playChannel(channel)},
      pause: () => pause(),
      resume: () => resume(),
      setRepeatOnOff: (repeatAll) => setRepeatOnOff(repeatAll),
      setMuteOnOff: () => setMuteOnOff(),
      isEmpty: () => player.queue.length === 0,
      isNowPlayingTrack: (trackId) => isNowPlayingTrack(trackId),
      isNowPlayingChannel: (channelId) => isNowPlayingChannel(channelId)
    });

    const isNowPlayingTrack = (trackId) => {
      return player.state.isPlaying && player.track.id === trackId;
    };

    const isNowPlayingChannel = (channelId) => {
      return player.channel !== null && player.channel.id === channelId && player.state.isPlaying;
    }

    const playChannel = (channel) => {
      apiClient.getChannelNowPlayingTrack(channel.id).then(res => {
        let nowPlayingTrack = res.data.track;
        let playStartedAt = res.data.play_start_date; // 2022-04-15T13:19:34.974526
        let playStartedAtMoment = moment(playStartedAt, moment.DATETIME_LOCAL_MS);
        let momentDiffInSeconds = moment.duration(moment().diff(playStartedAtMoment)).as('seconds');

        player.track = nowPlayingTrack;
        player.queue = [nowPlayingTrack];
        player.channel = channel;
        player.state.currentlyPlayingItemSecond = momentDiffInSeconds;

        loadAudioTrackFrom(player.track.id, player.state.currentlyPlayingItemSecond);
      });
    };

    const playFromTracks = (tracks, playFromIdx, playFromExistingQueue) => {
      let trackToPlay = null;
      if (playFromExistingQueue) {
        trackToPlay = player.queue[playFromIdx];
      } else {
        trackToPlay = tracks[playFromIdx];
        player.queue = tracks;
      }
      player.track = trackToPlay;
      player.channel = null;
      loadAudioTrackFrom(trackToPlay.id, 0);
    };

    const playTrack = (track) => {
      playFromTracks([track], 0);
    };

    const playTrackFromQueue = (trackIdx) => {
      playFromTracks(null, trackIdx, true);
    };

    const playAllFromSourcePath = (sourceId, path) => {
      apiClient.getAudioTracksFromPathInSource(sourceId, path).then(res => {
        playFromTracks(res.data, 0);
      });
    };

    const playNextTrack = (autoNext) => {
      let currentIdx = player.queue.findIndex(track => track.id === player.track.id);
      if (currentIdx + 1 < player.queue.length) {
        let nextIdx = (player.repeat.one && autoNext) ? currentIdx : currentIdx + 1;
        playTrackFromQueue(nextIdx);
      } else if (player.repeat.one || player.repeat.all) {
        playTrackFromQueue(0);
      }
    };

    const playNextInChannel = () => {
      setTimeout(() => {
        apiClient.getChannelNowPlayingTrack(player.channel.id).then(res => {
          player.queue = [res.data.track];
          player.state.currentlyPlayingItemSecond = 0;
          loadAudioTrackFrom(player.queue[0].id, 0);
        });
      }, 1000);
    };

    const loadAudioTrackFrom = (trackId, fromSeconds) => {
      audioPlayerDOMElementRef.value.src = apiClient.buildStreamingItemUrl(trackId);
      audioPlayerDOMElementRef.value.currentTime = fromSeconds;
      audioPlayerDOMElementRef.value.load();
    };

    const resume = () => {
      audioPlayerDOMElementRef.value.play();
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

    const setRepeatOnOff = (repeatAll) => {
      if (repeatAll) {
        player.repeat.one = false;
        player.repeat.all = !player.repeat.all;
      } else {
        player.repeat.all = false;
        player.repeat.one = !player.repeat.one;
      }
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

    provide('player', player);

    provide('setVolume', setVolume);
    provide('setPlayFromTime', setPlayFromTime);

    provide('audioLengthFormatted', audioLengthFormatted);

    provide('currentlyPlayingSongTime', currentlyPlayingSongTime);
    provide('currentlyPlayingSongTimeReversed', currentlyPlayingSongTimeReversed);

    return { audioPlayerDOMElementRef, playNextTrack, playNextInChannel, player
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
      if (this.player.channel !== null) {
        this.playNextInChannel();
      } else {
        this.playNextTrack(true);
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
      this.onAudioEnded();
    }
  }

}
</script>

<style scoped>

</style>