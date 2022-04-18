<template>
  <div class="q-pa-md q-gutter-md">

    <q-toolbar>
      <q-icon size="md" name="groups" color="primary"></q-icon>
      <q-toolbar-title>
        Artists
        <q-item-label caption>All artists in the library</q-item-label>
        <q-item-label caption>Total: {{pagination.total_elements}}</q-item-label>
      </q-toolbar-title>

    </q-toolbar>

    <q-separator spaced/>
    </div>

  <q-input dense clearable clear-icon="close" label="Artist name" v-model="artistNameLike" @update:model-value="searchPageableArtists">
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input>

  <q-scroll-area style="height: 900px;">
    <q-list padding>
      <q-item v-for="artist in artists.data" :key="artist.id">
<!--      <q-item v-for="artist in artists.data" :key="artist.id" clickable :to="{name: 'ArtistAlbumsComponent', params: {'artistId': artist.id}}">-->
        <q-item-section avatar class="q-pr-sm col-shrink">
          <q-icon size="sm" name="person_outline" />
        </q-item-section>
<!--        <q-item-section class="cursor-pointer ellipsis">-->
        <q-item-section>
          <q-item-label>{{artist.name}}</q-item-label>
          <q-item-label caption>Albums: {{artist.albums_count}}, songs: {{artist.songs_count}}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right"></q-icon>
        </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>



  <q-separator color="green"/>

  <div class="row justify-center">
    <div class="col-md-1">
      <q-pagination input color="black"
                    v-model="pagination.page"
                    :min="1"
                    :max="pagination.total_pages"
                    @update:model-value="searchPageableArtists"/>
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
    let artistNameLike = ref(null);

    const pagination = reactive({
      page: 1,
      page_size: 20,
      total_pages: 0,
      total_elements: 0
    });

    const searchPageableArtists = () => {
      apiClient.getArtists({
        page: pagination.page,
        page_size: pagination.page_size,
        artist_name_like: artistNameLike.value ? artistNameLike.value : null}).then(response => {
          artists.value = response.data;
          pagination.total_pages = response.data.pagination.total_pages;
          pagination.total_elements = response.data.pagination.total_elements;
      });
    }

    onMounted(searchPageableArtists);

    return {artists, artistNameLike, pagination, searchPageableArtists}
  }
}
</script>

<style scoped lang="css">

</style>