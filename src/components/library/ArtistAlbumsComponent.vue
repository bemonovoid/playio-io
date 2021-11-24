<template>
  <div class="row items-center">
    <div class="col-xs-auto">
      <q-item>
        <q-item-section avatar thumbnail class="q-pr-sm col-shrink">
          <q-icon size="sm" name="arrow_back_ios" @click="$router.back()"></q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-h5">
            {{artistName}}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label caption>{{albums.length}} album(s)</q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </div>

  <AlbumsListComponent :albums="albums"/>

</template>

<script>
import apiClient from "../../http/apiClient";
import {ref, onMounted} from "vue";
import {useRoute} from 'vue-router';

import AlbumsListComponent from "./AlbumsListComponent.vue";

export default {
  name: "ArtistAlbumsComponent",
  components: {AlbumsListComponent},
  setup() {
    const route = useRoute();
    let artistName = ref(null);
    let albumNameLike = ref(null);

    let albums = ref([]);

    const getAlbums = () => {
      apiClient.getArtistAlbums(route.params.artistId).then(response => {
        albums.value = response.data.data;
        artistName.value = response.data.data[0].artist_name;
      });
    };

    onMounted(getAlbums);

    return {
      artistName, albumNameLike, albums, getAlbums
    }
  }
}
</script>

<style scoped>

</style>