<template>
  <div class="q-pa-md">
    <q-item class="q-pl-none">
      <q-item-section side>
        <q-item-label class="text-h3">Folders</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-breadcrumbs gutter="md">
          <q-breadcrumbs-el icon="storage" label="List of sources"/>
          <q-breadcrumbs-el v-for="breadcrumbsEl in breadcrumbsEls" />
        </q-breadcrumbs>
      </q-item-section>
    </q-item>

  </div>

  <div class="q-pa-md row items-start q-gutter-lg inset-shadow">

    <q-list padding class="rounded-borders">

      <router-view />

    </q-list>

  </div>

</template>

<script>

import {onMounted, ref} from "vue";
import apiClient from "../../http/apiClient";

export default {
  name: "FoldersView",
  setup() {
    const breadcrumbsEls = ref([]);

    return {breadcrumbsEls}
  }
}
</script>

<style scoped>

</style>