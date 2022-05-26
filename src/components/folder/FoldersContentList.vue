<template>
  <q-item v-for="folder in folders">
    <q-item-section>
      <q-item-label>{{folder}}</q-item-label>
    </q-item-section>

  </q-item>
</template>

<script>

import {onMounted, ref} from "vue";
import apiClient from "../../http/apiClient";
import {useRoute} from "vue-router";

export default {
  name: "FoldersContentList",
  setup() {
    const route = useRoute();
    let folders = ref([]);
    const getFolders = () => {
      apiClient.getSourceFolders(route.params.sourceId).then(res => {
        folders.value = res.data;
      });
    };

    onMounted(getFolders);

    return {folders}
  }
}
</script>

<style scoped>

</style>