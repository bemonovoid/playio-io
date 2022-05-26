<template>
  <div>
    <q-icon size="sm" name="more_vert" class="cursor-pointer">

      <q-menu anchor="bottom left" self="top left">

        <q-list dense>

          <q-item class="text-red" v-if="player.state.isPlaying && trackId === player.queue[0].id" clickable v-close-popup @click="player.pause">
            <q-item-section>Pause</q-item-section>
            <q-item-section avatar side><q-icon size="xs" name="pause"></q-icon></q-item-section>
          </q-item>

          <q-item v-else clickable v-close-popup @click="player.play(trackId)">
            <q-item-section>Play</q-item-section>
            <q-item-section avatar side><q-icon size="xs" name="play_arrow"></q-icon></q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="editTrack">
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
</template>

<script>

import {ref, inject} from "vue";

export default {
  name: "TrackMenuItems",
  props: ['trackId'],
  setup(props) {
    const player = inject('player');
    return {player}
  },
  methods: {
    editTrack() {
      console.log("asdasds")
      this.$router.push({name: 'editTrack', params: {trackId: this.trackId}})
    }
  }
}
</script>

<style scoped>

</style>