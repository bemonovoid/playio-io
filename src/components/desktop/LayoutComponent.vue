<template>

  <div  class="mobile-only"><p>Mobile</p></div>

<!--  <q-layout view="hhh lpR fFf" class="desktop-only">-->

<!--    <q-header bordered class="bg-black text-red">-->
<!--      <q-toolbar>-->
<!--        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer()"/>-->

<!--        <q-toolbar-title>-->
<!--          playqd-->
<!--        </q-toolbar-title>-->

<!--        <q-btn dense flat round icon="queue_music" @click="toggleRightDrawer()"/>-->
<!--      </q-toolbar>-->
<!--    </q-header>-->

<!--    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered >-->
<!--      <q-list>-->
<!--        <q-expansion-item default-opened-->
<!--                          icon="library_music"-->
<!--                          label="Library"-->
<!--                          caption="Media library content">-->

<!--          <q-item clickable class="q-pl-lg text-secondary" :to="{name: 'artists'}">-->
<!--            <q-item-section avatar>-->
<!--              <q-icon size="xs" name="groups" />-->
<!--            </q-item-section>-->
<!--            <q-item-section>-->
<!--              <q-item-label class="text-caption">Artists</q-item-label>-->
<!--            </q-item-section>-->
<!--          </q-item>-->

<!--          <q-item clickable class="q-pl-lg text-secondary">-->
<!--            <q-item-section avatar>-->
<!--              <q-icon size="xs" name="album" />-->
<!--            </q-item-section>-->
<!--            <q-item-section>-->
<!--              <q-item-label class="text-caption">Albums</q-item-label>-->
<!--            </q-item-section>-->
<!--          </q-item>-->

<!--          <q-item clickable class="q-pl-lg text-secondary" :to="{name: 'genres'}">-->
<!--            <q-item-section avatar>-->
<!--              <q-icon size="xs" name="piano"/>-->
<!--            </q-item-section>-->
<!--            <q-item-section>-->
<!--              <q-item-label class="text-caption">Genres</q-item-label>-->
<!--            </q-item-section>-->
<!--          </q-item>-->

<!--          <q-item clickable class="q-pl-lg text-secondary">-->
<!--            <q-item-section avatar>-->
<!--              <q-icon size="xs" name="headphones" />-->
<!--            </q-item-section>-->
<!--            <q-item-section>-->
<!--              <q-item-label class="text-caption">Songs</q-item-label>-->
<!--            </q-item-section>-->
<!--          </q-item>-->
<!--        </q-expansion-item>-->

<!--        <q-separator inset spaced/>-->

<!--        <q-expansion-item-->
<!--                          icon="queue_music"-->
<!--                          label="Playlists"-->
<!--                          caption="Library playlists">-->

<!--          <q-item clickable class="q-pl-lg text-secondary" :to="{name: 'playlistCreateNew'}">-->
<!--            <q-item-section avatar>-->
<!--              <q-icon size="xs" name="add" />-->
<!--            </q-item-section>-->
<!--            <q-item-section>-->
<!--              <q-item-label class="text-caption">Create new</q-item-label>-->
<!--            </q-item-section>-->
<!--          </q-item>-->

<!--          <q-item clickable class="q-pl-lg text-secondary" :to="{name: 'playlistManager'}">-->
<!--            <q-item-section avatar>-->
<!--              <q-icon size="xs" name="format_list_bulleted" />-->
<!--            </q-item-section>-->
<!--            <q-item-section>-->
<!--              <q-item-label class="text-caption">View all</q-item-label>-->
<!--            </q-item-section>-->
<!--          </q-item>-->

<!--        </q-expansion-item>-->

<!--        <q-separator inset spaced/>-->

<!--        <q-item clickable :to="{name: 'channels'}">-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="podcasts" />-->
<!--          </q-item-section>-->
<!--          <q-item-section>-->
<!--            <q-item-label>Channels</q-item-label>-->
<!--            <q-item-label caption>Manage channels</q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item>-->

<!--        <q-item clickable to="/sources">-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="storage" />-->
<!--          </q-item-section>-->
<!--          <q-item-section>-->
<!--            <q-item-label>Sources</q-item-label>-->
<!--            <q-item-label caption>Manage sources</q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item>-->

<!--      </q-list>-->

<!--    </q-drawer>-->

<!--    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered :width="500" style="max-height: 90%">-->
<!--      <NowPlayingQueue/>-->
<!--    </q-drawer>-->

<!--    <q-page-container>-->
<!--      <NavigationToolbar/>-->
<!--      <router-view />-->
<!--    </q-page-container>-->

<!--    <q-footer>-->
<!--      <PlayerToolbar/>-->
<!--    </q-footer>-->

<!--  </q-layout>-->

</template>

<script>

import { ref } from 'vue'
import PlayerToolbar from "../player/PlayerToolbar.vue";
import NavigationToolbar from "./NavigationToolbar.vue";
import NowPlayingQueue from "../queue/NowPlayingQueue.vue";

export default {
  name: "LayoutComponent",
  components: { PlayerToolbar, NavigationToolbar, NowPlayingQueue },
  setup() {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
}
</script>

<style scoped>

</style>