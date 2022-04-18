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
    const CHANNEL_KIND_CHANNEL = 'channel';
    const CHANNEL_KIND_LIBRARY = 'library';

    const audioPlayerDOMElementRef = ref(null);

    const playlist = reactive({
      info: {
        kind: CHANNEL_KIND_CHANNEL, // library, channel, user_playlist
        id: null,
        name: null,
      },
      state: {
        volume: 0.5,
        isPlaying: false,
        currentlyPlayingItemDuration: 0,
        currentlyPlayingItemSecond: 0,
      },
      queue: []
    });

    const playChannel = (channel) => {
      apiClient.getChannelStreamInfo(channel.id).then(res => {
        playlist.info.kind = CHANNEL_KIND_CHANNEL;
        playlist.info.id = channel.id;
        playlist.info.name = channel.name;

        loadChannelAudio(res.data);
      });
    };

    const playNextInChannel = () => {
      setTimeout(() => {
        apiClient.getChannelStreamInfo(playlist.info.id).then(res => {
          playlist.queue = [res.data.streaming_item];
          playlist.state.currentlyPlayingItemSecond = 0;
          loadAudio(playlist.queue[0].id);
        });
      }, 1000);
    };

    const loadChannelAudio = (channelStreamingItemInfo) => {
      let streaming_item = channelStreamingItemInfo.streaming_item;
      let streamStartedAt = channelStreamingItemInfo.streaming_timestamp; // 2022-04-15T13:19:34.974526
      let streamStartedAtMoment = moment(streamStartedAt, moment.DATETIME_LOCAL_MS);
      let momentDiffInSeconds = moment.duration(moment().diff(streamStartedAtMoment)).as('seconds');

      playlist.queue = [streaming_item];
      playlist.state.currentlyPlayingItemSecond = momentDiffInSeconds;

      loadAudio(streaming_item.id);
    };

    const loadAudio = (songId) => {
      audioPlayerDOMElementRef.value.src = apiClient.getStreamingItemUrl(songId);
      audioPlayerDOMElementRef.value.currentTime = playlist.state.currentlyPlayingItemSecond;
      audioPlayerDOMElementRef.value.load();
    };

    const play = (songId) => {
      if (isNaN(songId)) {
        audioPlayerDOMElementRef.value.play(); // When play a song that was set on pause
      } else {
        playlist.info.kind = CHANNEL_KIND_LIBRARY;
        loadAudio(songId);
      }
    };

    const playNewPlaylist = (songs) => {
      playlist.queue = songs;
      play(playlist.queue[0].id);
    }

    const playNext = () => {
      if (playlist.queue.length > 1) {
        playNewPlaylist(playlist.queue.slice(1));
      }
    };

    const pause = () => {
      audioPlayerDOMElementRef.value.pause();
    };

    const setPlayFromTime = (playFromTime) => {
      audioPlayerDOMElementRef.value.currentTime = playFromTime;
    };

    const songTimeFormatted = (lengthInSeconds) => {
      let format = 'mm:ss';
      if (lengthInSeconds >= 3600) {
        format = 'HH:mm:ss';
      }
      return moment().startOf('day').seconds(lengthInSeconds).format(format);
    };

    const currentlyPlayingSongTime = computed(() => {
      return songTimeFormatted(playlist.state.currentlyPlayingItemSecond);
    });

    const currentlyPlayingSongTimeReversed = computed(() => {
      if (audioPlayerDOMElementRef.value) {
        return songTimeFormatted(audioPlayerDOMElementRef.value.duration - playlist.state.currentlyPlayingItemSecond);
      }
      return '00:00'
    });

    const getAlbumArtworkUrl = (albumId) => {
      return apiClient.getAlbumArtworkUrl(albumId);
    };

    onMounted(() => {
      audioPlayerDOMElementRef.value.volume = playlist.state.volume;
    });

    provide('playChannel', playChannel);
    provide('play', play);
    provide('pause', pause);
    provide('playNext', playNext)
    provide('playNewPlaylist', playNewPlaylist);

    provide('setPlayFromTime', setPlayFromTime);

    provide('playlist', playlist);
    provide('songTimeFormatted', songTimeFormatted);

    provide('currentlyPlayingSongTime', currentlyPlayingSongTime);
    provide('currentlyPlayingSongTimeReversed', currentlyPlayingSongTimeReversed);

    provide('getAlbumArtworkUrl', getAlbumArtworkUrl)

    return {
      CHANNEL_KIND_CHANNEL, audioPlayerDOMElementRef, playlist,
      playNext, playNextInChannel
    }
  },

  methods: {
    onAudioLoadStart() {

    },
    onAudioCanPlay() {

    },
    onAudioPlay() {
      this.playlist.state.isPlaying = true;
    },
    onAudioPause() {
      this.playlist.state.isPlaying = false;
    },
    onAudioEnded() {
      if (this.playlist.info.kind === this.CHANNEL_KIND_CHANNEL) {
        this.playNextInChannel();
      } else {
        this.playNext();
      }
    },
    onAudioTimeUpdate() {
      this.playlist.state.currentlyPlayingItemSecond = this.audioPlayerDOMElementRef.currentTime;
    },
    onAudioLoadedMetadata() {
      this.playlist.state.currentlyPlayingItemDuration = this.audioPlayerDOMElementRef.duration;
    },
    onAudioError() {
      console.error("Failed to play audio. Something went wrong, probably io error");
    }
  }

}
</script>

<style scoped>

</style>