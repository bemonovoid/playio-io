<template>
  <q-form autofocus @submit="onSubmit" class="q-gutter-md">
    <q-input clearable label="Name" hint = "The name of the playlist" v-model="playlistModel.name"/>
  </q-form>
</template>

<script>

import {ref} from 'vue';

export default {
  name: "CreatePlaylist",
  setup() {
    const playlistModel = ref({name});
    return {playlistModel};
  }
}
</script>

<style scoped>

</style>