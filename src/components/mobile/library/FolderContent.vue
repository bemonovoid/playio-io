<template>

  <div class="row justify-start">
    <q-item clickable :to="{name: 'folders'}">
      <q-item-section side class="q-pr-xs">
        <q-icon size="xs" name="arrow_back_ios_new"/>
      </q-item-section>
      <q-item-section side>
        <q-item-label caption>Folders</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label class="text-overline text-white text-bold">{{source.name}}</q-item-label>
      </q-item-section>
    </q-item>
  </div>

  <div class="row justify-start">
    <div class="col-12">
      <q-list dense separator>

        <q-slide-item v-for="contentItem in contentItems" :key="contentItem.id" @right="onSlideRight" right-color="black">
          <template v-slot:right>
            <q-btn-group outline>
              <q-btn flat icon="play_arrow" color="grey" no-caps :label="contentItem.is_file ? 'Play file' : 'Play folder'" @click="playContentItem(contentItem)"/>
              <q-btn flat icon="playlist_add" color="grey" no-caps label="Add to playlist"/>
              <q-btn flat icon="playlist_play" color="grey" no-caps label="Enqueue"/>
            </q-btn-group>

          </template>
          <q-item clickable @click="contentItem.is_file ? playContentItem(contentItem) : openItem(contentItem.name)">
            <q-item-section side>
              <q-avatar square>
                <q-icon v-if="contentItem.isReturn" size="xs" name="keyboard_return"/>
                <q-icon size="xs" v-else-if="contentItem.is_file" name="audio_file"/>
                <q-icon v-else size="sm" name="folder" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label caption lines="1" class="ellipsis text-overline">{{contentItem.name}}</q-item-label>
              <q-item-label ><small class="text-grey-6">{{contentItem.is_file ? '.' + contentItem.extension + ', ' : ''}} {{contentItem.file_size}}</small></q-item-label>
            </q-item-section>
          </q-item>

        </q-slide-item>


      </q-list>
    </div>
  </div>

</template>

<script>

import {ref, onMounted, inject} from "vue";
import {useRoute, useRouter} from "vue-router";
import apiClient from "../../../http/apiClient";

export default {
  name: "FolderContent",
  setup() {
    const player = inject('player');

    const route = useRoute();
    const router = useRouter();

    const pathElements = ref([]);
    const source = ref({});
    const contentItems = ref([]);

    const getSourceContent = (path) => {
      apiClient.getSourceWithContent(route.params.sourceId, path).then(res => {
        source.value = res.data.source;
        contentItems.value = [{name: '..', isReturn: true}, ...res.data.content.items];
      });
    };

    const openItem = (itemName) => {
      let path = null;
      if (itemName === '..') {
        if (pathElements.value.length === 0) {
          router.replace('/folders');
          return;
        }
        pathElements.value.pop();
      } else {
        pathElements.value.push(itemName);
      }
      if (pathElements.value.length > 0) {
        path = pathElements.value.join("/");
      }
      getSourceContent(path);
    };

    const playContentItem = (contentItem) => {
      let path = pathElements.value.join('/') + '/' + contentItem.name;
      if (contentItem.is_file) {
        path += '.' + contentItem.extension;
      }
      player.playAllFromSourcePath(route.params.sourceId, path);
    }

    const onSlideRight = ({reset}) => {
      setTimeout(() => {
        reset()
      }, 2000)
    };

    onMounted(getSourceContent);

    return {playContentItem, source, contentItems, openItem, onSlideRight}
  }
}
</script>

<style scoped>

</style>