<template>
  <div class="row justify-start">
    <q-item clickable :to="{name: 'settings'}">
      <q-item-section side class="q-pr-xs">
        <q-icon size="xs" name="arrow_back_ios_new"/>
      </q-item-section>
      <q-item-section side>
        <q-item-label caption>Settings</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label class="text-overline text-white text-bold">Sources</q-item-label>
      </q-item-section>
    </q-item>
  </div>

  <div class="row justify-start">
    <div class="col-12">
      <q-list separator>
        <q-item v-for="source in sources" :key="source.id" clickable >
          <q-item-section top side>
            <q-avatar square size="50px">
              <q-icon size="lg" name="folder" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1" class="ellipsis text-overline">{{source.name}}</q-item-label>
            <q-item-label v-if="source.last_scan_date"><small class="text-grey-6">last scan {{calculateLastScanDateAgo(source.last_scan_date)}}</small></q-item-label>
          </q-item-section>

        </q-item>
      </q-list>
    </div>
  </div>

</template>

<script>

import {onMounted, ref} from "vue";
import moment from "moment";
import apiClient from "../../../http/apiClient";

export default {
  name: "Sources",
  setup() {
    const sources = ref([]);

    const getSources = () => {
      apiClient.getSources().then(res => {
        sources.value = res.data;
      });
    };

    const calculateLastScanDateAgo = (timestamp) => {
      return moment(timestamp, moment.DATETIME_LOCAL_MS).fromNow();
    }

    onMounted(getSources);

    return {sources, calculateLastScanDateAgo};
  }
}
</script>

<style scoped>

</style>