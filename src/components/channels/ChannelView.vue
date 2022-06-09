<template>

  <ChannelHeader :channel="channel"/>

  <q-table
      hide-pagination
      virtual-scroll
      :rows-per-page-options="[0]"
      title="Playback history"
      :rows="table.rows"
      :columns="table.columns"
      row-key="id">

    <template v-slot:top-left>
      <q-item>
        <q-item-section top side>
          <q-item-label class="text-overline">Playback history</q-item-label>
          <q-item-label caption class="text-accent">({{channel.total_track_count.count - table.rows.length}} left)</q-item-label>
        </q-item-section>
      </q-item>
    </template>

    <template v-slot:top-right>
      <q-btn :disable="table.rows.length === 0" flat round icon="delete_sweep" color="grey" @click="confirmDeleteHistoryDialog = true"></q-btn>

      <q-dialog v-model="confirmDeleteHistoryDialog" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h6">Playback history</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            This will permanently delete all channel history. Are you sure?
          </q-card-section>

          <q-separator/>

          <q-card-actions align="right">
            <q-btn no-caps flat label="Cancel" color="primary" v-close-popup />
            <q-btn no-caps flat label="Delete" color="primary" class="text-bold" @click="deleteHistory()"/>
          </q-card-actions>
        </q-card>
      </q-dialog>

    </template>

    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-grey">
          <q-icon class="q-mb-sm" v-if="col.name === 'artwork'" name="lens_blur" disabled size="md"/>
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>

    <template v-slot:body-cell-artwork="props">
      <q-td :props="props" class="artworkIcon">
        <div id="artworkIconDiv">
          <TrackArtworkAvatar :track-id=" props.value.id" :art-work-url="getAlbumArtworkUrl(props.value.album_id)"/>
        </div>
        <TrackPlayButton :track-id="props.value.id"/>
      </q-td>
    </template>

    <template v-slot:body-cell-name="props">
      <q-td :props="props" class="no-padding no-margin">
        <div>
          <q-item dense>
            <q-item-section side>
              <q-item-label class="text-bold text-body2">{{props.value.name}}</q-item-label>
              <q-item-label caption class="cursor-pointer underline-on-hover" @click="viewArtist(props.value.artist_id)">{{props.value.artist_name}}</q-item-label>
            </q-item-section>
            <q-item-section v-if="!player.isEmpty() && props.value.id === player.track.id" side style="min-width: 150px">
              <q-chip v-if="player.state.isPlaying" outline dense color="red" text-color="white" label=" Now playing " />
              <q-chip v-else outline dense color="red" text-color="white" label=" Paused " />
            </q-item-section>
          </q-item>
        </div>
      </q-td>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <TrackMenuItems :track-id="props.value.id"/>
      </q-td>
    </template>
  </q-table>

</template>

<script>

import {ref, inject, onMounted} from "vue";
import apiClient from "../../http/apiClient";
import moment from "moment";

import ChannelHeader from "./ChannelHeader.vue";
import TrackArtworkAvatar from "../artwork/TrackArtworkAvatar.vue";
import TrackPlayButton from "../artwork/TrackPlayButton.vue";
import TrackMenuItems from "../track/TrackMenuItems.vue";

export default {
  name: "ChannelView",
  components: {TrackArtworkAvatar, TrackPlayButton, ChannelHeader, TrackMenuItems},
  props: ['channelId'],
  setup(props) {
    const player = inject('player');
    const audioLengthFormatted = inject('audioLengthFormatted');

    const confirmDeleteHistoryDialog = ref(false);
    const channel = ref({
      id: null,
      name: null,
      total_track_count: {
        count: 0,
        length_in_seconds:  0
      }
    });
    const table = ref ({
      columns: [
        { name: 'artwork', required: true, align: 'center', field: row => row, style: 'width: 60px', },
        { name: 'name', required: true, label: 'ARTIST / TRACK NAME', align: 'left', field: row => row },
        { name: 'duration', required: true, label: 'DURATION', align: 'center', field: row => audioLengthFormatted(row.length_in_seconds) },
        { name: 'date', required: true, label: 'PLAYED', align: 'center', field: row => getPlayedAgo(row.playback_timestamp) },
        { name: 'actions', required: true, label: 'ACTIONS', align: 'center', field: row => row }
      ],
      rows: []
    });

    const getChannel = () => {
      if (props.channelId) {
        apiClient.getChannelWithPlaybackHistoryItems(props.channelId).then(res => {
          channel.value = res.data;
          table.value.rows = res.data.played_tracks;
        });
      }
    };

    const getAlbumArtworkUrl = (albumId) => apiClient.buildAlbumArtworkUrl(albumId);

    const getPlayedAgo = (playedAtTimestamp) => {
      return moment(playedAtTimestamp, moment.DATETIME_LOCAL_MS).fromNow();
    }

    onMounted(getChannel);

    return {confirmDeleteHistoryDialog, channel, getChannel, audioLengthFormatted, table, getAlbumArtworkUrl, getPlayedAgo, player}
  },
  methods: {
    viewArtist(artistId) {
      this.$router.push({name: "artists"});
      // this.$router.push({name: "artists", params: {artistId: artistId}});
    },
    playSelected(evt, row, idx) {

    },
    deleteHistory() {
      apiClient.deletePlaybackHistory(this.channelId).then(res => {
        this.table.rows = [];
        this.confirmDeleteHistoryDialog = false;
      });
    }
  },
  watch: {
    'player.track': {
      handler(val, oldVal) {
        this.getChannel();
      }
    }
  }
}
</script>

<style scoped>
.underline-on-hover:hover {
  text-decoration: underline;
}
.artworkIcon #artworkIconDiv {
  opacity: 1;
}
.artworkIcon:hover #artworkIconDiv {
  opacity: 0;
}
</style>