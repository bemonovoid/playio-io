<template>
  <q-card class="channelCard q-pa-md">
    <q-card-section horizontal>

      <q-img loading="eager" width="250px" src="channel-3.png"/>

      <q-item>
        <q-item-section top>
          <q-item-label caption>Channel</q-item-label>
          <q-item-label class="text-h4 text-weight-bold">{{ channel.name }}</q-item-label>
        </q-item-section>
      </q-item>

    </q-card-section>

    <q-separator spaced />

    <q-card-actions>
      <div style="width: 300px">
        <q-btn round flat icon="play_circle_outline" size="30px" color="red" @click="playChannel(channel)"></q-btn>
      </div>

      <q-separator vertical spaced inset/>

      <q-item dense>
        <q-item-section>
          <q-item-label caption class="text-grey">Channel length</q-item-label>
            <q-item dense class="q-pl-none">
              <q-item-section side class="q-pr-xs">
                <q-icon color="grey" size="xs" name="list"></q-icon>
              </q-item-section>
              <q-item-section side>
                <q-item-label caption>{{channel.total_track_count.count}} tracks ({{humanizeChannelLengthInSeconds(channel.total_track_count.length_in_seconds)}})</q-item-label>
              </q-item-section>
            </q-item>
        </q-item-section>
      </q-item>

    </q-card-actions>
  </q-card>
</template>

<script>

import {inject} from "vue";
import moment from "moment";

export default {
  name: "ChannelHeader",
  props: ["channel"],
  setup () {
    const player = inject('player');
    return {player}
  },
  methods: {
    humanizeChannelLengthInSeconds(seconds) {
      return moment.duration(seconds, 'seconds').humanize();
    },
    playChannel(channel) {
      this.player.play({id: channel.id, name: channel.name, kind: 'channel'});
    }
  }
}
</script>

<style scoped>
</style>