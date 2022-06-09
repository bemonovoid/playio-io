<template>
  <q-toolbar class="bg-black text-white">
    <q-toolbar-title v-if="player.queue.length > 0">
      <q-item>
        <q-item-section side v-if="player.channel">
          <q-avatar square size="xl">
            <q-img class="q-my-none" src="channel-3.png"></q-img>
          </q-avatar>
        </q-item-section>
        <q-item-section side v-if="player.channel" style="width: 215px">
          <q-item-label class="text-caption text-grey">Channel</q-item-label>
          <q-item-label class="text-grey-3 cursor-pointer underline-on-hover" @click="viewChannel(player.channel.id)">{{player.channel.name}}</q-item-label>
        </q-item-section>

        <q-item-section avatar side v-if="player.channel">
          <q-btn size="sm" color="grey" flat round icon="favorite_border"></q-btn>
<!--          <q-avatar icon="favorite_border"></q-avatar>-->
        </q-item-section>

        <q-item-section side>
          <q-avatar square size="xl">
            <ArtworkImage :album-id="player.track.album.id"/>
          </q-avatar>
        </q-item-section>

        <q-item-section side style="padding-left: 5px;">
          <div class="row justify-center q-pt-20">
            <q-btn size="lg" flat color="white" round dense v-if="player.state.isPlaying" icon="pause" @click="player.pause()"/>
            <q-btn size="lg" flat color="white" round dense v-else icon="play_arrow" @click="player.resume()"/>
            <q-btn size="lg" flat color="white" round dense @click="player.playNextTrack" :disable="player.queue.length === 1">
              <q-icon size="sm" name="skip_next"/>
            </q-btn>
          </div>
        </q-item-section>

        <q-item-section>

          <q-item-label caption lines="1">
            <span class="text-grey-3 cursor-pointer underline-on-hover">{{player.track.artist.name}}</span>
            <span class="text-white"> - </span>
            <span class="text-grey">{{player.track.name}}</span>
          </q-item-label>

          <q-slider dark dense
                    :readonly="player.channel !== null && player.channel !== undefined"
                    :thumb-size="player.channel ? '0px': '20px'"
                    :step="1" color="red"
                    :model-value="player.state.currentlyPlayingItemSecond"
                    :min="0"
                    :max="player.state.currentlyPlayingItemDuration"
                    @change="setPlayFromTime"/>

          <q-item-label caption lines="1">
            <span class="text-grey">{{player.track.bit_rate}} kbps  | {{player.track.sample_rate}} Hz | {{player.track.extension}}</span>
          </q-item-label>

        </q-item-section>

        <q-item-section avatar side>
          <q-item-label caption class="text-grey">{{playbackTime}} / {{audioLengthFormatted(player.state.currentlyPlayingItemDuration)}}</q-item-label>
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
          <q-btn flat round :icon="player.state.muted ? 'volume_off' : 'volume_up'" color="grey" @click="setMuteOnOff"/>
        </q-item-section>
        <q-item-section style="width: 150px" side>
          <q-slider dark
              color="grey"
              v-model="player.state.volume"
              :step="0.1"
              :min="0.0"
              :max="1.0"
              @change="setVolume"
          />
        </q-item-section>
      </q-item>

    </q-toolbar-title>

    <q-toolbar-title v-else>Playlist is empty</q-toolbar-title>

  </q-toolbar>
</template>

<script>

import {ref, inject} from "vue";

import ArtworkImage from "./ArtworkImage.vue";

export default {
  name: "PlayerToolbar",
  components: {ArtworkImage},
  setup() {

    const player = inject('player');

    const setPlayFromTime = inject('setPlayFromTime');
    const setVolume = inject('setVolume');
    const setMuteOnOff = inject('setMuteOnOff');

    const audioLengthFormatted = inject('audioLengthFormatted');
    const playbackTime = inject('currentlyPlayingSongTime');
    const playbackTimeReversed = inject('currentlyPlayingSongTimeReversed');

    const showDefaultAlbumImage = ref(false);

    return {
      setVolume, setMuteOnOff,
      setPlayFromTime, showDefaultAlbumImage, audioLengthFormatted, playbackTime, playbackTimeReversed, player
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
.underline-on-hover:hover {
  text-decoration: underline;
}
</style>