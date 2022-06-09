<template>

  <q-item>
    <q-item-section>
      <q-item-label header class="text-bold">{{source.name}}</q-item-label>
      <q-item-label header>
        <q-breadcrumbs>
          <q-breadcrumbs-el ripple class="text-red cursor-pointer underline-on-hover" label=".." @click="openBreadcrumbItem(-1)"/>
          <q-breadcrumbs-el v-for="(breadcrumbsEl, idx) in breadcrumbsEls" :label=breadcrumbsEl class="cursor-pointer underline-on-hover" @click="openBreadcrumbItem(idx)"/>
        </q-breadcrumbs>
      </q-item-label>
    </q-item-section>
    <q-item-section class="items-end">
      <q-input dense stack-label clearable color="primary" v-model="filter" label="Filter by name" style="width: 300px">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-item-section>
  </q-item>

  <q-table class="q-pa-md q-ma-lg" dense
           separator="horizontal"
           hide-pagination
           virtual-scroll
           :rows-per-page-options="[0]"
           :rows="contentItems"
           :columns="columns"
           :filter="filter"
           :filter-method="filterMethod"
           row-key="id">

    <template v-slot:body-cell-sourceItemTypeIcon="props">
      <q-td v-if="props.value.isReturn" :props="props" class="contentItemIcon">
        <q-icon size="xs" color="red" name="subdirectory_arrow_left"/>
      </q-td>
      <q-td v-else :props="props" class="contentItemIcon">
        <div id="contentItemIconDiv">
          <q-icon size="sm" v-if="props.value.is_file" name="audio_file"/>
          <q-icon size="sm" v-else name="folder_open"/>
        </div>
        <SourceContentPlayButton :source-id="source.id" :path="contentItemToFullPath(props.value)"/>
      </q-td>
    </template>

    <template v-slot:body-cell-name="props">
      <q-td :props="props">
        <q-item class="q-px-none q-mx-none">
          <q-item-section side>
            <q-item-label v-if="props.value.is_file" class="text-overline">
              {{props.value.name}}
            </q-item-label>
            <q-item-label v-else class="cursor-pointer underline-on-hover text-overline" @click="openItem(props.value.name)">
              {{props.value.name}}
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
import {useRouter} from "vue-router";
import apiClient from "../../http/apiClient";

import SourceContentPlayButton from "./SourceContentPlayButton.vue";

export default {
  name: "SourceContent",
  components: {SourceContentPlayButton},
  setup() {
    const route = useRoute();
    const router = useRouter();

    const source = ref({});
    const contentItems = ref([]);
    const breadcrumbsEls = ref([]);

    const filter = ref('');
    const filterMethod = (rows, terms) => {
      const filterBy = terms.toLowerCase();
      return contentItems.value.filter(item => item.name.toLowerCase().includes(filterBy));
    }

    const getSourceContent = (path) => {
      apiClient.getSourceWithContent(route.params.sourceId, path).then(res => {
        source.value = res.data.source;
        contentItems.value = [{name: '..', isReturn: true}, ...res.data.content.items];
      });
    };

    const openItem = (contentItemName) => {
      let path = null;
      if (contentItemName === '..') {
        if (breadcrumbsEls.value.length === 0) {
          router.replace('/sources');
          return;
        }
        breadcrumbsEls.value.pop();
      } else {
        breadcrumbsEls.value.push(contentItemName);
      }
      if (breadcrumbsEls.value.length > 0) {
        path = breadcrumbsEls.value.join("/");
      }
      getSourceContent(path);
    };

    const openBreadcrumbItem = (breadcrumbIdx) => {
      breadcrumbsEls.value = breadcrumbsEls.value.slice(0, breadcrumbIdx + 1);
      getSourceContent(breadcrumbsEls.value.join("/"));
    };

    const contentItemToFullPath = (contentItem) => {
      let path = breadcrumbsEls.value.join('/') + '/' + contentItem.name;
      if (contentItem.is_file) {
        path += '.' + contentItem.extension;
      }
      return path;
    };

    onMounted(getSourceContent);

    const columns = [
      { name: 'sourceItemTypeIcon', required: true, align: 'left', style: "width: 20px",field: row => row},
      { name: 'name', required: true, label: 'Name', align: 'left', field: row => row },
      { name: 'extension', required: true, label: 'Extension', align: 'center', classes: 'text-green', field: row => row.extension },
      { name: 'size', required: true, label: 'Size', align: 'center', classes: 'text-blue no-caps', field: row => row.file_size }
    ]

    return {columns, source, contentItems, breadcrumbsEls, filter, filterMethod, openItem, openBreadcrumbItem, contentItemToFullPath}
  }
}
</script>

<style scoped>
.contentItemIcon #contentItemIconDiv {
  opacity: 1;
}
.contentItemIcon:hover #contentItemIconDiv {
  opacity: 0;
}
</style>