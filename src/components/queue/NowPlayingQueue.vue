<template>

  <q-input :disable="player.channel !== null" dense type="search" v-model="filter" label="Search in playlist" style="width: 100%" class="q-px-sm">
    <template v-slot:append>
      <q-icon size="xs" name="search" />
    </template>
  </q-input>

  <q-table class="q-px-sm"
           flat
           dense
           hide-pagination
           virtual-scroll
           row-key="id"
           separator="none"
           :rows-per-page-options="[0]"
           :rows="player.queue"
           :filter="filter"
           :filter-method="filterMethod"
           v-model:selected="selected"
           :columns="columns"
           @row-click="playItem">

    <template v-slot:body-cell-index="props">
      <q-td :props="props">
        <div class="text-secondary">
          {{props.rowIndex + 1}}.
        </div>
      </q-td>
    </template>

    <template v-slot:body-cell-title="props">
      <q-td :props="props" style="max-width: 350px" class="no-padding">
        <div v-if="player.channel !== null" class="text-secondary ellipsis">
          Channel - {{player.channel.name}}
        </div>
        <div v-else class="text-secondary ellipsis">
          {{props.value.artist.name}} - {{props.value.name}}
        </div>
      </q-td>
    </template>

    <template v-slot:no-data="{ icon, message, filter }">
      <div class="full-width row flex-center q-gutter-sm">
        <q-icon size="2em" name="sentiment_dissatisfied" />
        <span>
          Playlist is empty
        </span>
      </div>
    </template>

  </q-table>

  <q-separator spaced inset/>

</template>

<script>

import {ref, inject} from "vue";

export default {
  name: "NowPlayingQueue",
  setup() {
    const player = inject('player');
    const audioLengthFormatted = inject('audioLengthFormatted');
    const selected = ref([]);
    const activeTrackId = ref(false);
    const filter = ref('');
    const filterMethod = (rows, terms, cols, getCellValue) => {
      const filterBy = terms.toLocaleLowerCase();
      return rows.filter(track => track.name.toLocaleLowerCase().includes(filterBy));
    };
    const playItem = (evt, row, idx) => {
      if (player.channel === null) {
        player.playTrackFromQueue(idx);
      }
    };

    const columns = [
      { name: 'index', required: true, align: 'left', style: 'width:5px' },
      { name: 'title', required: true, align: 'left', field: row => row },
      { name: 'duration', required: true, align: 'right', field: row => player.channel === null ? audioLengthFormatted(row.track_length_in_seconds) :'--:--', classes: 'text-secondary' }
    ]

    return { player, columns, selected, audioLengthFormatted, activeTrackId, filter, filterMethod, playItem}
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

</style>