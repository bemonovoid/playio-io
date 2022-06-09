<template>
  <div class="row justify-start">
    <q-item clickable :to="{name: 'library'}">
      <q-item-section side class="q-pr-xs">
        <q-icon size="xs" name="arrow_back_ios_new"/>
      </q-item-section>
      <q-item-section side>
        <q-item-label caption>Library</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label class="text-overline text-white text-bold">Folders</q-item-label>
      </q-item-section>
    </q-item>
  </div>

  <div class="row justify-start">
    <div class="col-12">
      <q-list separator>
        <q-item v-for="source in sources" :key="source.id" clickable :to="{name: 'folderContent', params: {sourceId: source.id}}">
          <q-item-section top side>
            <q-avatar square size="50px">
              <q-icon size="lg" name="folder" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1" class="ellipsis text-overline">{{source.name}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>

</template>

<script>
import {onMounted, ref} from "vue";
import apiClient from "../../../http/apiClient";

export default {
  name: "Folders",
  setup() {
    const sources = ref([]);
    const getSources = () => {
      apiClient.getSources().then(res => {
        sources.value = res.data;
      });
    };

    onMounted(getSources);

    return {sources};
  }
}
</script>

<style scoped>

</style>