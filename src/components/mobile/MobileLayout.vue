<template>
  <div>
    <q-layout view="hHh LpR fFf">
      <q-header bordered class="bg-black text-white">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" color="red"/>
          <q-toolbar-title class="text-overline">
            Playqd
          </q-toolbar-title>

          <q-input dense type="search" clearable borderless input-class="text-secondary" v-model="searchInput">
            <template v-slot:append>
              <q-icon size="xs" name="search" />
            </template>
          </q-input>

        </q-toolbar>
      </q-header>

      <q-drawer mini :width=100 :breakpoint="200" v-model="drawer">
        <q-scroll-area class="fit">
          <q-list padding>
            <q-item clickable v-ripple v-for="item in drawerItems" :to="{name: item.to}" @click="drawer = false">
              <q-item-section avatar>
                <q-icon :name="item.icon" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>

      <MobileFooter/>

    </q-layout>
  </div>
</template>

<script>

import MobileFooter from "./MobileFooter.vue";
import {ref, provide} from "vue";

export default {
  name: "MobileLayout",
  components: {MobileFooter},
  setup() {
    const drawer = ref(false);
    const drawerItems = [
      {icon: "headset", to: 'library'},
      {icon: "queue_music", to: 'library'},
      {icon: "settings", to: 'settings'},
    ];

    const searchInput = ref(null);

    provide('searchInput', searchInput);

    return {drawer, drawerItems, searchInput};
  }
}
</script>

<style scoped>

</style>