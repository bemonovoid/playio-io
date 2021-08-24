<template>
  <div class="row">
    <div class="col-xs-auto">
      <q-icon size="sm" name="arrow_back_ios"></q-icon>
    </div>
    <div class="col-xs-auto">
      <q-item-section side>
        <q-item-label>{{artist.name}}</q-item-label>
        <q-item-label caption>{{albums.length}} album(s)</q-item-label>
      </q-item-section>

    </div>
  </div>
  <div class="row q-col-gutter-sm">
    <div class="col-xs-6" v-for="album in albums" :key="album.id">
      <q-card bordered flat>
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg"/>
        <q-list>
          <q-item clickable :to="{name: 'AlbumSongsComponent', params: {'albumId': album.id}}">
            <q-item-section>
              <q-item-label class="ellipsis">{{ album.name }}</q-item-label>
              <q-item-label caption>
                {{album.year}}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>

  </div>
</template>

<script>
import apiClient from "../../http/apiClient";
import {ref, onMounted, reactive} from "vue";
import {useRoute} from 'vue-router';

export default {
  name: "ArtistAlbumsComponent",
  setup() {
    const route = useRoute();
    let albums = ref([]);
    const artist = reactive({id: '', name: ''});
    let getAlbums = () => {
      apiClient.getArtistAlbums(route.params.artistId).then(response => {
        albums.value = response.data.data;
        artist.id = response.data.data[0].artist.id;
        artist.name = response.data.data[0].artist.name;
      });
    };

    onMounted(getAlbums);

    return {
      artist, albums
    }
  }
}
</script>

<style scoped>
.card-album-image {
  width: auto;
  height: auto;
}
</style>