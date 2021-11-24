<template>

  <q-list separator padding>
    <q-item v-for="album in albums" :key="album.id" clickable :to="{name: 'AlbumSongsComponent', params: {'albumId': album.id}}">
      <q-item-section class="col-shrink">
        <q-avatar square size="75px">
          <q-icon size="xl" class="text-grey" v-if="albumArtworkNotFound(album.id)" name="album"></q-icon>
          <q-img v-else :src="getAlbumArtworkUrl(album.id)" @error="updateAlbumDefault(album.id)"/>
        </q-avatar>
      </q-item-section>
      <q-item-section top>
        <q-item-label class="ellipsis text-subtitle1">{{ album.name }}</q-item-label>
        <q-item-label caption lines="2" class="ellipsis">{{ album.genre }}</q-item-label>
        <q-item-label caption lines="3">{{ album.year }}</q-item-label>
        <q-item-label caption lines="4">{{album.songs_count}} song(s)</q-item-label>
      </q-item-section>
      <q-item-section side top>
        <q-item-label caption>{{songTimeFormatted(album.total_time_in_seconds)}}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>

</template>

<script>
import {inject, reactive} from "vue";

export default {
  name: "AlbumsListComponent",
  props: ['albums'],
  setup() {
    let defaultAlbumImage = reactive([]);
    const songTimeFormatted = inject('songTimeFormatted');
    const getAlbumArtworkUrl = inject('getAlbumArtworkUrl');

    return {
      defaultAlbumImage, songTimeFormatted, getAlbumArtworkUrl
    }
  },
  methods: {
    updateAlbumDefault(albumId) {
      this.defaultAlbumImage.push(albumId);
    },
    albumArtworkNotFound(albumId) {
      return this.defaultAlbumImage.includes(albumId);
    }
  }
}
</script>

<style scoped>

</style>