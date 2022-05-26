<template>
  <q-table class="q-pa-md q-ma-lg inset-shadow"
           hide-pagination
           :rows-per-page-options="[0]"
           title="Tracks"
           :rows="tracks"
           :columns="table.columns"
           row-key="index">

    <template v-slot:body-cell-index="props">
      <q-td :props="props" class="trackIndex">
        <div id="trackIndexDiv">
          {{props.rowIndex + 1}}
        </div>
        <TrackListItemPlayButton :source-id="tracks.slice(props.rowIndex)" :source-kind="'album'"/>
      </q-td>
    </template>

    <template v-slot:body-cell-name="props">
      <q-td :props="props">
        <q-item class="q-px-none q-mx-none">
          <q-item-section side>
            <q-item-label class="text-white text-bold text-body2">{{props.value.name}}</q-item-label>
            <q-item-label class="cursor-pointer text-overline underline-on-hover">{{props.value.artist.name}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-td>
    </template>

  </q-table>

</template>

<script>

import {ref, inject} from "vue";
import TrackListItemPlayButton from "../player/TrackListItemPlayButton.vue";

export default {
  name: "AlbumTracks",
  components: {TrackListItemPlayButton},
  props: ["tracks"],
  setup() {
    const audioLengthFormatted = inject('audioLengthFormatted');

    const table = ref ({
      columns: [
          { name: 'index', required: true, label: '#', align: 'center', style: 'width: 60px', field: row => row},
          { name: 'name', required: true, label: 'TITLE', align: 'left', field: row => row},
          { name: 'duration', required: true, label: 'DURATION', align: 'left', field: row => audioLengthFormatted(row.track_length_in_seconds) }
          // { name: 'date', required: true, label: 'PLAYED', align: 'left', field: row => getPlayedAgo(row.playback_timestamp) },
          // { name: 'actions', required: true, label: 'ACTIONS', align: 'left', field: row => row }
        ]
    });
    return {table}
  },
  methods: {
    onRowClick(evt, row, idx) {
      console.log(evt);
      console.log(row);
    }
  }
}
</script>

<style scoped>
.trackIndex #trackIndexDiv {
  opacity: 1;
}
.trackIndex:hover #trackIndexDiv {
  opacity: 0;
}
</style>