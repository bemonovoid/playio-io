<template>
  <q-card class="channelCard q-pa-md q-ma-lg inset-shadow" flat>
    <q-card-section horizontal class="q-pb-sm">

      <ArtworkImage :album-id="album.id" width="270px"/>

      <q-list class="q-pt-lg q-mt-lg">

        <q-item>
          <q-item-section side>
            <q-item-label caption>Album</q-item-label>
            <q-item-label class="text-h4 text-weight-bold">{{ album.name }}</q-item-label>
            <q-item-label class="cursor-pointer underline-on-hover text-overline">by {{artist.name}}</q-item-label>
          </q-item-section>
        </q-item>

<!--        <q-item class="q-pt-lg">-->
<!--          <q-item-section side>-->
<!--            <q-item-label>{{album.year}}</q-item-label>-->
<!--            <q-item-label>{{album.genre}}</q-item-label>-->
<!--            <q-item-label disabled class="q-pt-sm">{{albumLengthFormatted(tracks.map(t => t.track_length_in_seconds).reduce((a, b) => a + b, 0))}}</q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item>-->

        <q-item dense class="q-pt-xl">
          <q-item-section side class="q-pr-xs">
            <q-item-label><small>Year:</small></q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label>{{album.year}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item dense>
          <q-item-section side class="q-py-none q-pr-xs">
            <q-item-label><small>Genre:</small></q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label>{{album.genre}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item dense>
          <q-item-section side class="q-py-none q-pr-xs">
            <q-item-label><small>Length:</small></q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label class="text-subtitle2">{{albumLengthFormatted(tracks.map(t => t.track_length_in_seconds).reduce((a, b) => a + b, 0))}}</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>

    </q-card-section>

    <q-separator spaced />

    <q-card-actions>
      <div>
        <q-btn round flat size="20px" icon="play_arrow" color="red" @click=""></q-btn>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>

import moment from "moment";
import ArtworkImage from "../player/ArtworkImage.vue";

export default {
  name: "AlbumHeader",
  components: {ArtworkImage},
  props: ["artist", "album", "tracks"],
  setup() {
    const albumLengthFormatted = (lengthInSeconds) => {
      let m = moment().startOf('day').seconds(lengthInSeconds);
      let res = '';
      if (m.hours() > 0) res = m.hours() + 'h '
      if (m.minutes() > 0) res += m.minutes() + 'min '
      if (m.seconds() > 0) res += m.seconds() + 'sec'
      return res;
    }
    return {albumLengthFormatted}
  }
}
</script>

<style scoped>

</style>