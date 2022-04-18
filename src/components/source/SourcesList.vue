<template>
  <q-list padding class="rounded-borders">

    <q-item-label header>Folders</q-item-label>

    <q-item v-for="source in sources" :key="source.id">
      <q-item-section avatar top>
        <q-avatar icon="folder" color="grey" text-color="white" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{source.name}}</q-item-label>
        <q-item-label caption>{{source.path}}</q-item-label>
        <q-item-label v-if="source.last_scan_date" caption>last scan {{source.last_scan_date}}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <div class="q-gutter-md">
          <q-btn flat round dense icon="refresh" />
          <q-btn flat round dense icon="edit" :to="{name: 'sourceEdit', params: {sourceId: source.id}}"/>
          <q-btn flat round dense icon="delete" @click="onDeleteSource(source.id)"/>
        </div>
      </q-item-section>

    </q-item>

  </q-list>

  <q-dialog v-model="confirmDeleteModel" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="warning" color="alert" text-color="red" />
        <span class="q-ml-sm">Source will be permanently deleted</span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn no-caps flat dense label="Cancel" color="primary" v-close-popup />
        <q-btn no-caps flat dense label="Delete" color="red" v-close-popup @click="deleteSource"/>
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>

import {onMounted, ref} from "vue";
import apiClient from "../../http/apiClient";

export default {
  name: "SourcesList",
  setup() {
    let sources = ref([]);
    const deleteSourceIdModel = ref(-1);
    const confirmDeleteModel = ref(false);
    const searchSources = () => {
      apiClient.getSources().then(res => {
        sources.value = res.data;
      });
    };
    const onDeleteSource = (sourceId) => {
      confirmDeleteModel.value = true;
      deleteSourceIdModel.value = sourceId;
    }
    const deleteSource = () => {
      console.log(deleteSourceIdModel.value)
      apiClient.deleteSource(deleteSourceIdModel.value).then(res => {
        searchSources();
      })
    }

    onMounted(searchSources);

    return {sources, confirmDeleteModel, deleteSourceIdModel, onDeleteSource, searchSources, deleteSource}
  }
}
</script>

<style scoped>

</style>