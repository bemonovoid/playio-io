<template>
  <q-layout view="hhh lpR fFf" class="desktop-only">

    <q-header bordered class="bg-black text-amber">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          playqd
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered  class="bg-grey-2">
      <q-list>
        <q-item clickable :to="{name: 'channels'}">
          <q-item-section avatar>
            <q-icon name="podcasts" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Channels</q-item-label>
            <q-item-label caption>Manage channels</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/sources">
          <q-item-section avatar>
            <q-icon name="source" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sources</q-item-label>
            <q-item-label caption>Manage sources</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  name: "DesktopAppComponent",
  setup () {
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
  },
  methods: {

  }
}
</script>

<style scoped>

</style>