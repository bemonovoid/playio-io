<template>

  <q-table class="q-pa-md q-ma-lg inset-shadow"
           separator="horizontal"
           hide-pagination
           :rows-per-page-options="[0]"
           :rows="contentItems"
           :columns="columns"
           row-key="name">

    <template v-slot:top>
      <q-breadcrumbs gutter="md">
        <q-breadcrumbs-el icon="storage" label=".."/>
        <q-breadcrumbs-el v-for="breadcrumbsEl in breadcrumbsEls" :label=breadcrumbsEl />
      </q-breadcrumbs>
      <q-space />
<!--      <q-input borderless dense debounce="300" color="primary" v-model="filter">-->
<!--        <template v-slot:append>-->
<!--          <q-icon name="search" />-->
<!--        </template>-->
<!--      </q-input>-->
    </template>

    <template v-slot:body-cell-sourceItemTypeIcon="props">
      <q-td :props="props">
        <q-icon size="sm" v-if="props.value" name="audio_file"/>
        <q-icon size="sm" v-else name="folder_open"/>
      </q-td>
    </template>

    <template v-slot:body-cell-name="props">
      <q-td :props="props">
        <q-item class="q-px-none q-mx-none">
          <q-item-section side>
            <q-item-label class="cursor-pointer text-overline underline-on-hover" @click="openItem(props.value)">
<!--              :disabled="!breadcrumbsEls.length"-->
              {{props.value}}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-td>
    </template>
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
    const contentItems = ref([]);
    const breadcrumbsEls = ref([]);

    const getSourceContent = (path) => {
      apiClient.getSourceWithContent(route.params.sourceId, path).then(res => {
        source.value = res.data.source;
        contentItems.value = [{name: '..'}, ...res.data.content.items];
      });
    };

    const openItem = (contentItemName) => {
      let path = null;
      if (contentItemName === '..') {
        breadcrumbsEls.value.pop();
      } else {
        breadcrumbsEls.value.push(contentItemName);
      }
      if (breadcrumbsEls.value.length > 0) {
        path = breadcrumbsEls.value.join("/");
      }
      getSourceContent(path);
    };

    onMounted(getSourceContent);

    const columns = [
      { name: 'sourceItemTypeIcon', required: true, label: 'Type', align: 'left', style: "width: 20px",field: row => row.is_file},
      { name: 'name', required: true, label: 'Name', align: 'left', field: row => row.name},
      { name: 'extension', required: true, label: 'Extension', align: 'left', field: row => row.extension }
    ]

    return {columns, source, contentItems, breadcrumbsEls, openItem}
  }
}
</script>

<style scoped>

</style>