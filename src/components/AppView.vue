<template>
  <div class="q-pa-sm">

<!--    <q-layout class="desktop-only" view="hHh lpR fFf">-->
<!--      <q-header elevated class="bg-primary text-white">-->
<!--        <q-toolbar>-->
<!--          <q-toolbar-title>-->
<!--            <q-avatar>-->
<!--              <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">-->
<!--            </q-avatar>-->
<!--            Title-->
<!--          </q-toolbar-title>-->
<!--        </q-toolbar>-->
<!--      </q-header>-->

<!--      <q-page-container>-->
<!--        <router-view/>-->
<!--      </q-page-container>-->

<!--      <q-footer elevated class="bg-grey-8 text-white">-->
<!--        <q-toolbar>-->
<!--          <q-toolbar-title>-->
<!--            <q-avatar>-->
<!--              <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">-->
<!--            </q-avatar>-->
<!--            <div>Title</div>-->
<!--          </q-toolbar-title>-->
<!--        </q-toolbar>-->
<!--      </q-footer>-->
<!--    </q-layout>-->

    <q-layout view="hHh lpR fFf">

      <q-header bordered elevated>
        <q-toolbar class="bg-black text-white">
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title class="text-overline">
            Playqd
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
          v-model="drawer"
          side="left"
          behavior="mobile"
          overlay
          bordered
      >
        <q-scroll-area class="fit">
          <q-list>

            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple :to="{name: menuItem.toView}">
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index" v-if="menuItem.separator" />
            </template>

          </q-list>
        </q-scroll-area>
      </q-drawer>

<!--      <q-page-container>-->
<!--        <router-view />-->
<!--      </q-page-container>-->

      <PlayerFooter/>

    </q-layout>
  </div>
</template>
<script>

import {computed, reactive, ref} from 'vue'
import {useHead} from '@vueuse/head'

import PlayerFooter from "./player/PlayerFooter.vue";
import ArtistsComponent from "./library/ArtistsComponent.vue";
import AlbumsComponent from "./library/AlbumsComponent.vue";

export default {
  name: 'AppView',
  components: {
    PlayerFooter,
    ArtistsComponent
  },
  setup() {
    const headData = reactive({
      title: 'Title',
      description: 'Some descr'
    });
    const menuList = [
      {
        icon: 'person_outline',
        label: 'Artists',
        separator: true,
        toView: "ArtistsComponent"
      },
      {
        icon: 'album',
        label: 'Albums',
        separator: true,
        toView: "AlbumsComponent"
      }
    ];

    useHead({
      // Can be static or computed
      title: computed(() => headData.title),

      meta: [
        {
          name: `description`,
          content: computed(() => headData.description),
        },
      ],
    })

    return {
      drawer: ref(true),
      menuList
    }
  }
}
</script>

<style>
</style>
