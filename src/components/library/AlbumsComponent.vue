<template>
  <div class="row items-center">
    <div class="col-xs-auto">
      <q-item>
        <q-item-section avatar thumbnail class="q-pr-sm col-shrink">
          <q-icon size="sm" name="arrow_back_ios" @click="$router.back()"></q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-h5">
            Albums
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label caption>{{albums.length}} album(s)</q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </div>

  <q-input dense clearable clear-icon="close" label="Album name" v-model="albumNameLike" @update:model-value="searchPageableAlbums">
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input>

  <AlbumsListComponent :albums="albums"/>

  <q-separator color="green"/>

  <div class="row justify-center">
    <div class="col-md-1">
      <q-pagination input color="black"
                    v-model="pagination.page"
                    :min="1"
                    :max="pagination.total_pages"
                    @update:model-value="searchPageableAlbums"/>
    </div>
  </div>

</template>

<script>
import apiClient from "../../http/apiClient";
import {ref, reactive, onMounted} from "vue";

import AlbumsListComponent from "./AlbumsListComponent.vue";

export default {
  name: "AlbumsComponent",
  components: {AlbumsListComponent},
  setup() {
    let albumNameLike = ref(null);

    const pagination = reactive({
      page: 1,
      page_size: 10,
      total_pages: 0,
      total_elements: 0
    });

    let albums = ref([]);

    const searchPageableAlbums = () => {
      apiClient.getAlbums({
        page: pagination.page,
        page_size: pagination.page_size,
        name: albumNameLike.value ? albumNameLike.value : null}).then(response => {
          albums.value = response.data.data;
          pagination.total_pages = response.data.pagination.total_pages;
          pagination.total_elements = response.data.pagination.total_elements;
        });
    };

    onMounted(searchPageableAlbums);

    return {
      albums, albumNameLike, pagination, searchPageableAlbums
    }
  }
}
</script>

<style scoped>

</style>