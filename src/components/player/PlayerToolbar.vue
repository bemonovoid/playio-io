<template>
  <q-toolbar class="bg-black text-white">
    <q-toolbar-title v-if="playlist.queue.length > 0">

      <q-item>
<!--        <q-item-section side style="padding-left: 5px; padding-bottom: 15px">-->
<!--          <FavoriteSongComponent :song="playlist.queue[0]"></FavoriteSongComponent>-->
<!--        </q-item-section>-->

        <q-item-section side v-if="playlist.info.kind === 'channel'">
          <q-avatar square size="xl" color="red">
<!--            <q-img class="q-my-none" src="channel-3.png"></q-img>-->
          </q-avatar>
        </q-item-section>
        <q-item-section side v-if="playlist.info.kind === 'channel'">
          <q-item-label class="text-caption text-grey">Channel</q-item-label>
          <q-item-label class="text-grey-3 q-focusable q-hoverable q-link--focusable q-link cursor-pointer" @click="viewChannel(playlist.info.id)">{{playlist.info.name}}</q-item-label>
        </q-item-section>

        <q-item-section avatar side v-if="playlist.info.kind === 'channel'">
          <q-btn size="sm" color="grey" flat round icon="favorite_border"></q-btn>
<!--          <q-avatar icon="favorite_border"></q-avatar>-->
        </q-item-section>

        <q-item-section side>
          <q-avatar square size="xl">
            <q-img v-if="showDefaultAlbumImage" src="default-album-cover.png"></q-img>
            <q-img v-else :src="getAlbumArtwork(playlist.queue[0].album.id)" @error="showDefaultAlbumImage = true"></q-img>
          </q-avatar>
        </q-item-section>

        <q-item-section side style="padding-left: 5px;">
          <div class="row justify-center q-pt-20">
            <q-btn size="lg" flat color="white" round dense v-if="playlist.state.isPlaying" icon="pause" @click="pause"/>
            <q-btn size="lg" flat color="white" round dense v-else icon="play_arrow" @click="play"/>
            <q-btn flat color="white" round dense icon="skip_next" @click="playNext" :disable="playlist.queue.length === 1"/>
          </div>
        </q-item-section>

        <q-item-section>

          <q-item-label caption lines="1">
            <span class="text-grey-3 q-focusable q-hoverable q-link--focusable q-link cursor-pointer">{{playlist.queue[0].artist.name}}</span>
            <span class="text-white"> - </span>
            <span class="text-grey">{{playlist.queue[0].name}}</span>
          </q-item-label>

          <q-slider dark dense :readonly="playlist.info.kind === 'channel'"
                    :step="1" color="red"
                    :model-value="playlist.state.currentlyPlayingItemSecond"
                    :min="0"
                    :max="playlist.state.currentlyPlayingItemDuration"
                    @change="setPlayFromTime"/>

          <q-item-label caption lines="1">
            <span class="text-grey">{{playlist.queue[0].bit_rate}} kbps  | {{playlist.queue[0].sample_rate}} Hz | {{playlist.queue[0].extension}}</span>
          </q-item-label>

        </q-item-section>

        <q-item-section avatar side>
          <q-item-label caption class="text-grey">{{playbackTime}} / {{playbackDuration(playlist.state.currentlyPlayingItemDuration)}}</q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-btn flat round icon="thumb_up_off_alt" color="grey"/>
        </q-item-section>

        <q-item-section avatar>
          <q-btn flat round icon="thumb_down_off_alt" color="grey"/>
        </q-item-section>

        <q-item-section avatar side>
          <q-btn flat round icon="settings" color="grey"/>
        </q-item-section>

        <q-item-section side>
          <q-btn flat round icon="volume_down" color="grey"/>
        </q-item-section>
        <q-item-section style="width: 150px" side>
          <q-slider dark
              color="grey"
              v-model="playlist.state.volume"
              :step="0.1"
              :min="0.0"
              :max="1.0"
          />
        </q-item-section>
      </q-item>

    </q-toolbar-title>

    <q-toolbar-title v-else>Playlist is empty</q-toolbar-title>

  </q-toolbar>
</template>

<script>

import {ref, inject} from "vue";
import apiClient from "../../http/apiClient";

export default {
  name: "PlayerToolbar",
  setup() {
    const setPlayFromTime = inject('setPlayFromTime');
    const playlist = inject('playlist');
    const playNext = inject('playNext');
    const pause = inject('pause');
    const play = inject('play');
    const volume = inject('volume');

    const playbackDuration = inject('songTimeFormatted');
    const playbackTime = inject('currentlyPlayingSongTime');
    const playbackTimeReversed = inject('currentlyPlayingSongTimeReversed');

    const showDefaultAlbumImage = ref(false);

    const getAlbumArtwork = (albumId) => apiClient.getAlbumArtworkUrl(albumId);

    return {
      playlist,volume,
      playNext, pause, play,  setPlayFromTime, showDefaultAlbumImage, getAlbumArtwork, playbackDuration, playbackTime, playbackTimeReversed
    }
  },
  methods: {
    viewChannel(channelId) {
      this.$router.push({name: "channel", params: {channelId: channelId}});
    }
  }
}
</script>

<style scoped>

</style>