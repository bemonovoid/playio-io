<template>

  <div>

    <q-breadcrumbs gutter="md">
      <q-breadcrumbs-el icon="storage" :label="source.name"/>
      <q-breadcrumbs-el v-for="breadcrumbsEl in breadcrumbsEls"/>
    </q-breadcrumbs>

  </div>

  <q-separator/>

  <q-table class="q-pa-md q-ma-lg inset-shadow"
           separator="horizontal"
           hide-pagination
           :rows-per-page-options="[0]"
           title="Folders"
           :rows="folders"
           :columns="columns"
           row-key="name">

<!--    <template v-slot:body-cell-name="props">-->
<!--      <q-td :props="props">-->
<!--        <q-item class="q-px-none q-mx-none">-->
<!--          <q-item-section side>-->
<!--            <q-item-label class="text-white text-bold text-body2">{{props.value.name}}</q-item-label>-->
<!--&lt;!&ndash;            <q-item-label class="cursor-pointer text-overline underline-on-hover">{{props.value.name}}</q-item-label>&ndash;&gt;-->
<!--          </q-item-section>-->
<!--        </q-item>-->
<!--      </q-td>-->
<!--    </template>-->

  </q-table>
</template>

<script>

import {ref, onMounted} from "vue";
import {useRoute} from "vue-router";
import apiClient from "../../http/apiClient";

export default {
  name: "SourceContent",
  setup() {
    const route = useRoute();
    const source = ref({});
    const folders = ref([]);
    const breadcrumbsEls = ref([]);

    const getSource = () => {
      apiClient.getSource(route.params.sourceId).then(res => {
        source.value = res.data;

        apiClient.getSourceFolders(res.data.id).then(res => {
          folders.value = res.data;
        });
      });
    };

    const getFolders = () => {
      apiClient.getSourceFolders(route.params.sourceId).then(res => {
        folders.value = res.data;
      });
    };

    onMounted(getSource);

    const columns = [
      { name: 'name', required: true, label: 'Name', align: 'left', field: row => row.name},
      { name: 'extension', required: true, label: 'Extension', align: 'left', field: row => row.extension }
    ]

    return {source, breadcrumbsEls, folders, columns}
  }
}
</script>

<style scoped>

</style>