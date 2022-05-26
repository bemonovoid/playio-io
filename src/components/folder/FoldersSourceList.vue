<template>
  <q-item v-for="(source, index) in sources" :key="source.id" :to="{name: 'folderContentList', params: {sourceId: source.id}}">

    <q-item-section avatar>
      <q-avatar icon="storage" text-color="white" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{source.name}}</q-item-label>
    </q-item-section>

  </q-item>
</template>

<script>

import {onMounted, ref} from "vue";
import apiClient from "../../http/apiClient";

export default {
  name: "FoldersSourceList",
  setup() {
    let sources = ref([]);
    const getSources = () => {
      apiClient.getSources().then(res => {
        sources.value = res.data;
      });
    };

    onMounted(getSources);

    return {sources}
  }
}
</script>

<style scoped>

</style>