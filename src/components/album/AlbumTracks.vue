<template>
  <q-table class="q-pa-md q-ma-lg inset-shadow"
           dense
           hide-pagination
           :rows-per-page-options="[0]"
           title="Tracks"
           :rows="tracks"
           :columns="table.columns"
           v-model:selected="selected"
           row-key="id">

    <template v-slot:body-cell-index="props">
      <q-td :props="props" class="trackIndex">
        <div id="trackIndexDiv">
          {{props.rowIndex + 1}}
        </div>
        <TrackPlayButton :tracks="tracks" :track-id="props.value.id" :track-idx="props.rowIndex"/>
      </q-td>
    </template>

    <template v-slot:body-cell-name="props">
      <q-td :props="props">
        <q-item class="q-px-none q-mx-none">
          <q-item-section side>
            <q-item-label class="text-white text-bold text-body2">{{props.value.name}}</q-item-label>
            <q-item-label class="cursor-pointer text-overline underline-on-hover">{{props.value.artist.name}}</q-item-label>
          </q-item-section>
          <q-item-section v-if="player.isNowPlayingTrack(props.value.id)" side style="min-width: 150px">
            <q-chip v-if="player.state.isPlaying" outline dense color="red" text-color="white" label=" Now playing " />
          </q-item-section>
        </q-item>
      </q-td>
    </template>

  </q-table>

</template>

<script>

import {ref, inject, onMounted} from "vue";
import TrackPlayButton from "../artwork/TrackPlayButton.vue";

export default {
  name: "AlbumTracks",
  components: {TrackPlayButton},
  props: ["tracks"],
  setup(props) {
    const player = inject('player');
    const audioLengthFormatted = inject('audioLengthFormatted');
    const selected = ref([]);

    const setSelected = () => {
      if (player.state.isPlaying) {
        selected.value = [player.track];
      }
    };

    const table = ref ({
      columns: [
          { name: 'index', required: true, label: '#', align: 'center', style: 'width: 60px', field: row => row},
          { name: 'name', required: true, label: 'TITLE', align: 'left', field: row => row},
          { name: 'duration', required: true, label: 'DURATION', align: 'center', field: row => audioLengthFormatted(row.track_length_in_seconds) },
          { name: 'extension', required: true, label: 'FORMAT', align: 'center', field: row =>  row.extension }
        ]
    });

    onMounted(setSelected);

    return {table, player, selected}
  },
  watch: {
    'player.track': {
      handler(val, oldVal) {
        this.selected = [val];
      }
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