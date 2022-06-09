<template>
  <div class="row q-gutter-xs justify-start">
    <q-item clickable v-for="item in libraryItems" :to="item.to">
      <q-item-section class="items-center">
        <q-item-label>
            <q-avatar size="75px">
              <q-icon size="lg" :name=item.icon></q-icon>
            </q-avatar>
        </q-item-label>
        <q-item-label caption>{{item.label}}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  name: "Library",
  setup() {
    const libraryItems = [
      {
        icon: "groups",
        label: "Artists",
        to: 'artists'
      },
      {
        icon: "album",
        label: "Albums",
        to: 'artists'
      },
      {
        icon: "piano",
        label: "Genres",
        to: 'artists'
      },
      {
        icon: "audiotrack",
        label: "Tracks",
        to: 'artists'
      },
      {
        icon: "folder_open",
        label: "Folders",
        to: 'folders'
      }
    ];

    return {libraryItems};
  }
}
</script>

<style scoped>

</style>