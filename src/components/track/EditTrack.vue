<template>
  <p class="text-h1">Editing track</p>

  <q-form class="q-pa-sm">

    <q-list dense class="q-gutter-lg">
      <q-item>
        <q-item-section>
          <q-input dark filled stack-label hide-bottom-space
                   label="Title" maxlength="30" v-model="track.name"
                   :rules="[val => !!val || 'Field is required']"/>
        </q-item-section>
      </q-item>
    </q-list>
  </q-form>

</template>

<script>

import {ref, reactive, onMounted} from "vue";
import {useRoute} from "vue-router";
import apiClient from "../../http/apiClient";

export default {
  name: "EditTrack",
  setup() {
    const route = useRoute();
    const track = ref({});
    let getTrack = async () => {
      await apiClient.getTrack(route.params.trackId).then(res => {
        track.value = res.data;
      })
    };
    onMounted(getTrack);
    return {track};
  }
}
</script>

<style scoped>
.track-editor {
  max-width: 40%;
}
</style>