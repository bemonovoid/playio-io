<!--<template>-->
<!--  <q-footer>-->
<!--    <q-toolbar class="bg-black text-white">-->
<!--      <q-toolbar-title v-if="playlist.queue.length > 0">-->
<!--        <q-item class="q-px-none">-->
<!--          <q-item-section side>-->
<!--            <q-avatar square>-->
<!--              <q-img :src="getAlbumArtworkUrl(playlist.queue[0].album.id)"></q-img>-->
<!--            </q-avatar>-->
<!--          </q-item-section>-->
<!--          <q-item-section side>-->
<!--            <q-item-label class="text-h6 text-white ellipsis">{{playlist.queue[0].name}}</q-item-label>-->
<!--            <q-item-label class="text-grey ellipsis" caption lines="2" @click="goToArtist">{{playlist.queue[0].artist.name}}</q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item>-->

<!--        <q-item class="q-pt-none q-mt-none q-px-none">-->
<!--          <q-item-section side style="padding-left: 5px; padding-bottom: 15px">-->
<!--            <FavoriteSongComponent :song="playlist.queue[0]"></FavoriteSongComponent>-->
<!--          </q-item-section>-->
<!--          <q-item-section>-->
<!--            <div class="row">-->
<!--              <q-slider readonly dark dense :step="1" color="red" :model-value="playlist.playingSongCurrentTime" :min="0" :max="playlist.playingSongDuration" @change="setPlayFromTime"/>-->
<!--            </div>-->
<!--            <div class="row">-->
<!--              <div class="col-6">-->
<!--                <q-item-label class="text-left text-grey-8" caption>{{playingSongTimeFormatted}}</q-item-label>-->
<!--              </div>-->
<!--              <div class="col-6">-->
<!--                <q-item-label class="text-right text-grey-8" caption>-{{playingSongReverseTimeFormatted}}</q-item-label>-->
<!--              </div>-->
<!--            </div>-->
<!--          </q-item-section>-->
<!--          <q-item-section side style="padding-left: 5px; padding-bottom: 15px">-->
<!--            <div class="row justify-center q-pt-20">-->
<!--              <q-btn flat color="white" round dense v-if="playlist.isPlaying" icon="pause" @click="pause"/>-->
<!--              <q-btn flat color="white" round dense v-else icon="play_arrow" @click="play"/>-->
<!--              <q-btn flat color="white" round dense icon="skip_next" @click="playNext" :disable="playlist.queue.length === 1"/>-->
<!--            </div>-->
<!--          </q-item-section>-->
<!--        </q-item>-->

<!--      </q-toolbar-title>-->

<!--      <q-toolbar-title v-else>Playlist is empty</q-toolbar-title>-->

<!--    </q-toolbar>-->

<!--  </q-footer>-->
<!--</template>-->

<!--<script>-->
<!--import FavoriteSongComponent from "../library/FavoriteSongComponent.vue";-->
<!--import {ref, inject} from "vue";-->
<!--import apiClient from "../../http/apiClient";-->

<!--export default {-->
<!--  name: "PlayerFooter",-->
<!--  components: {FavoriteSongComponent},-->
<!--  setup() {-->
<!--    const setPlayFromTime = inject('setPlayFromTime');-->
<!--    const playlist = inject('playlist')-->
<!--    const playNext = inject('playNext')-->
<!--    const pause = inject('pause')-->
<!--    const play = inject('play')-->
<!--    const getAlbumArtworkUrl = inject('getAlbumArtworkUrl')-->

<!--    const volume = ref(0);-->

<!--    const playingSongTimeFormatted = inject('playingSongTimeFormatted');-->
<!--    const playingSongReverseTimeFormatted = inject('playingSongReverseTimeFormatted');-->

<!--    return {-->
<!--      playlist, playNext, pause, play, volume, playingSongTimeFormatted, playingSongReverseTimeFormatted, setPlayFromTime, getAlbumArtworkUrl-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    goToArtist() {-->
<!--      this.$router.push({name: "ArtistAlbumsComponent", params: {artistId: this.playlist.queue[0].artist.id}});-->
<!--    }-->
<!--  }-->

<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->