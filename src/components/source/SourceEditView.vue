<template>
  <div class="q-pa-md" style="max-width: 600px">
    <q-form autofocus @submit="onSubmit" class="q-gutter-md">
      <q-input clearable label="Name" hint = "The name of the audio source" v-model="sourceModel.name"/>
      <q-input clearable label="Path" hint="Absolute path to local directory containing audio content" v-model="sourceModel.path"></q-input>

      <q-list padding>
        <q-item-label class="text-caption disabled">Scan options</q-item-label>
        <q-item v-ripple>
          <q-item-section>
            <q-item-label>Auto scan on create</q-item-label>
            <q-item-label caption>Starts scanning directory immediately</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-toggle v-model="sourceModel.auto_scan_on_create"/>
          </q-item-section>
        </q-item>
        <q-item v-ripple>
          <q-item-section>
            <q-item-label>Auto scan on restart</q-item-label>
            <q-item-label caption>Rescan source on server restart</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-toggle v-model="sourceModel.auto_scan_on_restart"/>
          </q-item-section>
        </q-item>

      <q-separator spaced/>

        <q-item v-ripple>
          <q-item-section>
            <q-item-label>Delete all before scan</q-item-label>
            <q-item-label caption>Deletes all items from index before scan</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-toggle v-model="sourceModel.delete_all_before_scan"/>
          </q-item-section>
        </q-item>
        <q-item v-ripple>
          <q-item-section>
            <q-item-label>Delete missing</q-item-label>
            <q-item-label caption>Deletes items from index that does not exist in source directory</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-toggle v-model="sourceModel.delete_missing"/>
          </q-item-section>
        </q-item>

        <q-separator spaced/>

      </q-list>


      <div>
        <q-btn flat rounded no-caps label="Submit" type="submit" color="primary"/>
        <q-btn flat rounded no-caps label="Close" color="primary" class="q-ml-sm" to="/sources"/>
      </div>

    </q-form>
  </div>

  <q-dialog persistent v-model="errorDialogModel">
    <q-card>
      <q-card-section class="q-pt-none bg-red">
        <div class="row items-center">Error</div>
      </q-card-section>

      <q-card-section>
        <p>{{errorMessageModel}}</p>
      </q-card-section>

      <q-card-actions align="right" class="bg-white">
        <q-btn no-caps flat label="Close" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>

import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import apiClient from "../../http/apiClient";

export default {
  name: "SourceEditView",
  props: ['sourceId'],
  setup(props) {
    const router = useRouter();
    const sourceModel = ref({
      id: null,
      name: null,
      path: null,
      auto_scan_on_create: false,
      auto_scan_on_restart: false,
      delete_all_before_scan: false,
      delete_missing: false,
      last_scan_date: null
    });

    const errorDialogModel = ref(false);
    const errorMessageModel = ref(null);

    const onSubmit = () => {
      apiClient.editSource(sourceModel.value)
          .then(res => {router.push('/sources')})
          .catch(error => {
            if (error.response) {
              errorDialogModel.value = true;
              errorMessageModel.value = error.response.data;
            }
          })
    }

    const getSource = () => {
      if (props.sourceId) {
        apiClient.getSource(props.sourceId).then(res => {
            sourceModel.value = res.data;
        });
      }
    };

    onMounted(getSource);

    return {sourceModel, errorDialogModel, errorMessageModel, onSubmit}
  }
}
</script>

<style scoped>

</style>