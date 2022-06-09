<template>
  <div class="row justify-start">
    <q-item clickable :to="{name: 'artists'}">
      <q-item-section side class="q-pr-xs">
        <q-icon size="xs" name="arrow_back_ios_new"/>
      </q-item-section>
      <q-item-section side>
        <q-item-label caption>Artists</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label class="text-overline text-white text-bold">{{artistName}}</q-item-label>
      </q-item-section>
    </q-item>
  </div>

  <div class="row justify-start">
    <div class="col-auto">
      <q-list>
        <q-item v-for="album in albums" :key="album.id" clickable :to="{name: 'albumTracks', params: {'albumId': album.id}}">
          <q-item-section side>
            <q-avatar square size="50px">
              <q-icon size="lg" class="text-grey" v-if="albumArtworkNotFound(album.id)" name="album"></q-icon>
              <q-img v-else :src="getAlbumArtworkUrl(album.id)" @error="updateAlbumDefault(album.id)"/>
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1" class="text-overline ellipsis">{{ album.name }}</q-item-label>
            <q-item-label><small class="text-grey-6">{{ album.genre }} | {{ album.year }} | {{album.songs_count}} song(s)</small></q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

  </div>

</template>

<script>
import {ref, reactive, onMounted, inject} from "vue";
import apiClient from "../../../http/apiClient";
import {useRoute} from "vue-router";

export default {
  name: "Albums",
  setup() {
    const route = useRoute();
    const artistName = ref('');
    const albums = ref([]);

    let defaultAlbumImage = reactive([]);
    const getAlbumArtworkUrl = (albumId) => apiClient.buildAlbumArtworkUrl(albumId);

    const getAlbums = () => {
      apiClient.getArtistAlbums(route.params.artistId).then(response => {
        albums.value = response.data.data;
        artistName.value = response.data.data[0].artist_name;
      });
    };

    onMounted(getAlbums);

    return {artistName, albums, defaultAlbumImage, getAlbumArtworkUrl}
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