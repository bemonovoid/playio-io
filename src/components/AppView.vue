<template>
  <div class="q-pa-sm">
    <q-layout view="hHh lpR fFf">

      <q-header bordered class="bg-green" elevated>
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
            </q-avatar>
            Playio
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

      <q-page-container>
        <router-view />
      </q-page-container>

      <PlayerFooter/>

    </q-layout>
  </div>
</template>
<script>

import {ref} from 'vue'

import PlayerFooter from "./player/PlayerFooter.vue";
import ArtistsComponent from "./library/ArtistsComponent.vue";

export default {
  name: 'AppView',
  components: {
    PlayerFooter,
    ArtistsComponent
  },
  setup() {
    const menuList = [
      {
        icon: 'inbox',
        label: 'Inbox',
        separator: true,
        toView: "ArtistsComponent"
      }
    ];

    return {
      drawer: ref(true),
      menuList
    }
  }
}
</script>

<style>
</style>
