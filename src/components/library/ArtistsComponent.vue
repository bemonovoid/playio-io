<template>

  <ArtistListHeader :total-count="pagination.total_elements"/>

  <q-list padding>

    <q-item-label header>

      <q-item>
        <q-item-section side>
          <q-btn-group outline flat>
            <q-btn v-for="char in alphabet" size="sm" flat color="grey" :label="char" @click="searchPageableArtists(char)"/>
            <q-btn size="sm" flat color="grey" label="[0-9]" @click="searchPageableArtists('number')" />
            <q-btn size="sm" flat color="grey" label="!#>_*?" @click="searchPageableArtists('special')"/>
          </q-btn-group>
        </q-item-section>
<!--        <q-item-section>-->
<!--          <q-input dense clearable clear-icon="close" label="Artist name" v-model="artistNameLike" @update:model-value="searchPageableArtists">-->
<!--            <template v-slot:prepend>-->
<!--              <q-icon name="search" />-->
<!--            </template>-->
<!--          </q-input>-->
<!--        </q-item-section>-->
      </q-item>
    </q-item-label>

    <q-item v-for="artist in artists.data" :key="artist.id" clickable :to="{name: 'ArtistAlbumsComponent', params: {'artistId': artist.id}}">
      <q-item-section avatar class="q-pr-sm col-shrink">
        <q-icon size="sm" name="person_outline" />
      </q-item-section>
      <!--        <q-item-section class="cursor-pointer ellipsis">-->
      <q-item-section>
        <q-item-label class="cursor-pointer">{{artist.name}}</q-item-label>
        <q-item-label caption>Albums: {{artist.albums_count}}, songs: {{artist.songs_count}}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-icon name="chevron_right"></q-icon>
      </q-item-section>
    </q-item>
  </q-list>

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

import ArtistListHeader from "./ArtistListHeader.vue";

export default {
  name: "ArtistsComponent",
  components: {ArtistListHeader},
  setup() {
    let artists = ref([]);
    let artistNameLike = ref(null);
    let alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

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
    }

    onMounted(searchPageableArtists);

    return {artists, artistNameLike, pagination, searchPageableArtists, alphabet}
  }
}
</script>

<style scoped lang="css">

</style>