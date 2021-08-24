<template>
  <div class="row items-center">
    <div class="col-xs-auto">
      <div class="text-h5">Artists</div>
      <q-item-label caption>Total: {{pagination.totalElements}}</q-item-label>
    </div>
  </div>

  <q-input dense clearable clear-icon="close" label="Artist name" v-model="searchString" @update:model-value="getArtists">
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input>

  <q-list separator>
    <q-item v-for="artist in artists.data" :key="artist.id" clickable :to="{name: 'ArtistAlbumsComponent', params: {'artistId': artist.id}}">
      <q-item-section avatar class="q-pr-sm col-shrink">
        <q-avatar size="md" color="teal" text-color="white" icon="play_arrow" />
      </q-item-section>
      <q-item-section class="cursor-pointer ellipsis">
        {{artist.name}}
        <q-item-label caption>Albums: {{artist.totalAlbums}}, songs: {{artist.totalSongs}}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-icon name="chevron_right"></q-icon>
      </q-item-section>
    </q-item>
  </q-list>

  <q-separator color="green"/>

  <div class="row justify-center">
    <div class="col-md-1">
      <q-pagination input color="black"
                    v-model="pagination.page"
                    :min="1"
                    :max="pagination.totalPages"
                    @update:model-value="getArtists"/>
    </div>
  </div>


</template>

<script>

import {onMounted, reactive, ref} from 'vue'
import apiClient from "../../http/apiClient";

export default {
  name: "ArtistsComponent",
  setup() {
    let artists = ref([]);
    let searchString = ref(null);

    const pagination = reactive({
      page: 1,
      pageSize: 10,
      totalPages: 0,
      totalElements: 0
    });

    const searchPageableArtists = () => {
      apiClient.getArtists({
        page: pagination.page - 1,
        pageSize: pagination.pageSize,
        search: searchString.value ? searchString.value : ''}).then(response => {
          artists.value = response.data;
          pagination.page = response.data.pagination.page + 1;
          pagination.totalPages = response.data.pagination.totalPages;
          pagination.totalElements = response.data.pagination.totalElements;
      });
    }

    onMounted(searchPageableArtists);

    return {artists, searchString, pagination, searchPageableArtists}
  },
  methods: {
    clearSearchInput() {
      if (!this.searchString) {
        this.getArtists();
      }
    },
    getArtists() {
      console.log("Search for: " + this.searchString)
      this.searchPageableArtists();
    }
  }
}
</script>

<style scoped lang="css">

</style>