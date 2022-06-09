<template>

  <div class="row justify-start">
    <q-item clickable :to="{name: 'library'}">
      <q-item-section side class="q-pr-xs">
        <q-icon size="xs" name="arrow_back_ios_new"/>
      </q-item-section>
      <q-item-section side>
        <q-item-label caption>Library</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label class="text-overline text-white text-bold">Artists</q-item-label>
      </q-item-section>
    </q-item>
  </div>

  <div class="row justify-start">

    <div class="col-auto">
        <div class="row" v-for="char in alphabet">
          <q-btn size="sm" flat color="grey" :label="char" @click="searchPageableArtists(char)"/>
        </div>
        <div class="row"><q-btn size="xs" flat color="grey" label="0-9" @click="searchPageableArtists('number')" /></div>
        <div class="row"><q-btn size="xs" flat color="grey" label="!#?" @click="searchPageableArtists('special')"/></div>
    </div>

    <div class="col-xs-10">

      <q-list>
        <q-item class="no-padding no-margin" v-for="artist in artists.data" :key="artist.id" clickable :to="{name: 'artistAlbums', params: {'artistId': artist.id}}">
          <q-item-section>
            <q-item-label class="text-overline ellipsis">{{artist.name}}</q-item-label>
            <q-item-label><small class="text-grey-6">Albums: {{artist.albums_count}}, songs: {{artist.songs_count}}</small></q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

  </div>

</template>

<script>

import {ref, reactive, onMounted, inject} from "vue";
import apiClient from "../../../http/apiClient";

export default {
  name: "Artists",
  setup() {
    let artists = ref([]);
    let artistNameLike = ref(null);
    let alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    const searchInput = inject('searchInput');

    const pagination = reactive({
      page: 1,
      page_size: 20,
      total_pages: 0,
      total_elements: 0
    });

    const searchPageableArtists = (nameStartsWith) => {
      apiClient.getArtists({
        page: pagination.page,
        page_size: pagination.page_size,
        name_starts_with: nameStartsWith ? nameStartsWith : null,
        name_like: artistNameLike.value ? artistNameLike.value : null}).then(response => {
        artists.value = response.data;
        pagination.total_pages = response.data.pagination.total_pages;
        pagination.total_elements = response.data.pagination.total_elements;
      });
    };

    onMounted(searchPageableArtists);

    return {alphabet, artists, pagination, searchPageableArtists, artistNameLike, searchInput};
  },
  watch: {
    searchInput(newUrl, oldUrl) {
      console.log(newUrl);
    }
  }
}
</script>

<style scoped>

</style>