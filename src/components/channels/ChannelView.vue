<template>
  <q-item>
    <q-item-section>
      <q-item-label caption>Channel</q-item-label>
      <q-item-label class="text-h4 text-weight-bold">{{channel.name}}</q-item-label>
    </q-item-section>
  </q-item>

  <q-table
      hide-pagination
      title="Playback history"
      :rows="table.rows"
      :columns="table.columns"
      row-key="name">

    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-grey">
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>

    <template v-slot:top-right>
      <q-btn flat round icon="refresh" @click="refreshHistory"></q-btn>
      <q-btn :disable="table.rows.length === 0" flat round icon="delete_sweep" @click="confirmDeleteHistoryDialog = true"></q-btn>

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
            <q-btn no-caps flat label="Delete" color="primary" class="text-bold" @click="deleteHistory"/>
          </q-card-actions>
        </q-card>
      </q-dialog>

    </template>

    <template v-slot:body-cell-artwork="props">
      <q-td :props="props">
        <div>
          <q-avatar square size="55px">
            <q-img :src="getAlbumArtwork(props.value)">
            </q-img>
          </q-avatar>
        </div>
      </q-td>
    </template>

    <template v-slot:body-cell-name="props">
      <q-td :props="props">
        <div>
          <q-item dense>
            <q-item-section side>
              <q-item-label class="text-bold text-body2">{{props.value.name}}</q-item-label>
              <q-item-label caption class="cursor-pointer" @click="viewArtist(props.value.artist_id)">{{props.value.artist_name}}</q-item-label>
            </q-item-section>
            <q-item-section v-if="props.value.id === playlist.queue[0].id" side style="min-width: 150px">
              <q-chip v-if="playlist.state.isPlaying" outline dense color="red" text-color="white" label=" Now playing " />
              <q-chip v-else outline dense color="red" text-color="white" label=" Paused " />
            </q-item-section>
          </q-item>
        </div>
      </q-td>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <div>
          <q-icon size="sm" name="more_vert" class="cursor-pointer">

            <q-menu anchor="bottom left" self="top left">

              <q-list dense>

                <q-item class="text-red" v-if="playlist.state.isPlaying && props.value.id === playlist.queue[0].id" clickable v-close-popup @click="pause">
                  <q-item-section>Pause</q-item-section>
                  <q-item-section avatar side><q-icon size="xs" name="pause"></q-icon></q-item-section>
                </q-item>

                <q-item v-else clickable v-close-popup @click="play">
                  <q-item-section>Play</q-item-section>
                  <q-item-section avatar side><q-icon size="xs" name="play_arrow"></q-icon></q-item-section>
                </q-item>

                <q-item clickable v-close-popup>
                  <q-item-section>Edit</q-item-section>
                  <q-item-section avatar side><q-icon size="xs" name="edit"></q-icon></q-item-section>
                </q-item>

                <q-item clickable v-close-popup>
                  <q-item-section>Like</q-item-section>
                  <q-item-section avatar side><q-icon size="xs" name="thumb_up_off_alt"></q-icon></q-item-section>

                </q-item>

                <q-separator />

                <q-item clickable>
                  <q-item-section>Add to playlist</q-item-section>
                  <q-item-section side>
                    <q-icon name="keyboard_arrow_right" />
                  </q-item-section>
                  <q-menu anchor="top end" self="top start">
                    <q-list>
                      <q-item dense clickable>
                        <q-item-section>2rd level Label 1</q-item-section>
                      </q-item>
                      <q-item dense clickable>
                        <q-item-section>2rd level Label 2</q-item-section>
                      </q-item>
                      <q-item dense clickable>
                        <q-item-section>2rd level Label 3</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-item>
              </q-list>
            </q-menu>
          </q-icon>
        </div>
      </q-td>
    </template>
  </q-table>

</template>

<script>

import {ref, inject, onMounted} from "vue";
import apiClient from "../../http/apiClient";
import moment from "moment";

export default {
  name: "ChannelView",
  props: ['channelId'],
  setup(props) {
    const playlist = inject('playlist');
    const songTimeFormatted = inject('songTimeFormatted');
    const play = inject('play');
    const pause = inject('pause');

    const confirmDeleteHistoryDialog = ref(false);
    const channel = ref({
      id: null,
      name: null
    });
    const table = ref ({
      columns: [
        { name: 'artwork', required: true, align: 'left', field: row => row.album_id, style: 'width: 60px', },
        { name: 'name', required: true, label: 'ARTIST / TRACK NAME', align: 'left', field: row => row },
        { name: 'duration', required: true, label: 'DURATION', align: 'left', field: row => songTimeFormatted(row.length_in_seconds) },
        { name: 'date', required: true, label: 'PLAYED', align: 'left', field: row => getPlayedAgo(row.playback_timestamp) },
        { name: 'actions', required: true, label: 'ACTIONS', align: 'left', field: row => row }
      ],
      rows: []
    });

    const getChannel = () => {
      if (props.channelId) {
        apiClient.getChannelWithPlaybackHistoryItems(props.channelId).then(res => {
          channel.value = res.data;
          table.value.rows = res.data.playback_history_items;
        });
      }
    };
    const getAlbumArtwork = (albumId) => {
      return  apiClient.getAlbumArtworkUrl(albumId);
    };
    const getPlayedAgo = (playedAtTimestamp) => {
      return moment(playedAtTimestamp, moment.DATETIME_LOCAL_MS).fromNow();
    }

    onMounted(getChannel);

    return {confirmDeleteHistoryDialog, channel, songTimeFormatted, table, getAlbumArtwork, getPlayedAgo, playlist, play, pause}
  },
  methods: {
    viewArtist(artistId) {
      this.$router.push({name: "artists"});
      // this.$router.push({name: "artists", params: {artistId: artistId}});
    },
    playSelected(evt, row, idx) {
      console.log(row);
    },
    deleteHistory() {
      apiClient.deletePlaybackHistory(this.channelId).then(res => {
        this.table.rows = [];
        this.confirmDeleteHistoryDialog = false;
      });
    },
    refreshHistory() {
      console.log(this.playlist.state.isPlaying)
      apiClient.getPlaybackHistory(this.channelId).then(res => {
        this.table.rows = res.data;
      });
    }
  }
}
</script>

<style scoped>

</style>