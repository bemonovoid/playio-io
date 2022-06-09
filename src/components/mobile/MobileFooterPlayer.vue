<template>
  <q-item v-if="player.queue.length" class="no-padding">

    <q-item-section side class="no-padding">
      <q-avatar square size="xl">
        <ArtworkImage :album-id="player.track.album.id"/>
      </q-avatar>
    </q-item-section>

    <q-item-section side class="no-padding">
      <div class="row justify-start">
        <q-btn size="md" flat color="white" class="no-padding no-margin" dense v-if="player.state.isPlaying" icon="pause" @click="player.pause()"/>
        <q-btn size="md" flat color="white" class="no-padding no-margin" dense v-else icon="play_arrow" @click="player.resume()"/>
        <q-btn size="md" flat color="white" class="no-padding no-margin" round dense icon="skip_next" @click="player.playNextTrack()" :disable="player.queue.length === 1"/>
      </div>
    </q-item-section>

    <q-item-section>

      <q-item-label caption lines="1" class="ellipsis cursor-pointer underline-on-hover" @click="viewAlbumTracks()">
        <small class="text-grey-3">{{player.track.artist.name}}</small>
        <small class="text-white"> - </small>
        <small class="text-grey">{{player.track.name}}</small>
      </q-item-label>

      <q-slider dense
                :thumb-size="'10px'"
                :track-size="'3px'"
                :step="1" color="red"
                :model-value="player.state.currentlyPlayingItemSecond"
                :min="0"
                :max="player.state.currentlyPlayingItemDuration"
                @change="setPlayFromTime"/>

      <q-item-label caption>
        <div class="row justify-between">
          <small class="text-grey">{{player.track.bit_rate}} kbps | {{player.track.sample_rate}} Hz | {{player.track.extension}}</small>
          <small>{{playbackTime}}</small>
        </div>

      </q-item-label>

    </q-item-section>

    <q-item-section side>
      <q-btn size="sm" flat round icon="tune" :color="(player.repeat.one || player.repeat.all || player.state.muted) ? 'red' : 'grey' ">
        <q-menu fit anchor="top left" self="bottom middle">
          <q-btn size="sm" flat round icon="repeat_one" :color="player.repeat.one ? 'red': 'grey'" @click="player.setRepeatOnOff()" v-close-popup/>
          <q-btn size="sm" flat round icon="repeat" :color="player.repeat.all ? 'red': 'grey'" @click="player.setRepeatOnOff(true)" v-close-popup/>
          <q-btn size="sm" flat round icon="playlist_add" color="grey" v-close-popup/>
          <q-btn size="sm" flat round :icon="player.state.muted ? 'volume_off' : 'volume_up'" :color="player.state.muted ? 'red': 'grey'" @click="player.setMuteOnOff()" v-close-popup/>
          <q-btn size="sm" flat round icon="thumb_up_alt" color="grey" v-close-popup/>
        </q-menu>
      </q-btn>
    </q-item-section>

  </q-item>

</template>

<script>

import ArtworkImage from "../player/ArtworkImage.vue";
import {inject, ref} from "vue";

export default {
  name: "MobileFooterPlayer",
  components: {ArtworkImage},
  setup() {
    const player = inject('player');
    const setPlayFromTime = inject('setPlayFromTime');

    // const audioLengthFormatted = inject('audioLengthFormatted');
    const playbackTime = inject('currentlyPlayingSongTime');
    // const playbackTimeReversed = inject('currentlyPlayingSongTimeReversed');

    const showDefaultAlbumImage = ref(false);

    return {player, playbackTime, setPlayFromTime}
  },
  methods: {
    viewAlbumTracks() {
      this.$router.push({name: "albumTracks", params: {albumId: this.player.track.album.id}});
    }
  }
}
</script>

<style scoped>

</style>