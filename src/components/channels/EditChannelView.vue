<template>
  <div class="q-gutter-lg">

    <div class="q-pa-md">
      <q-item class="q-pl-none">
        <q-item-section side>
          <q-item-label class="text-h3">Create channel</q-item-label>
        </q-item-section>
      </q-item>

    </div>

    <q-form class="q-pa-sm channel-editor">

      <q-list dense class="q-gutter-lg">
        <q-item>
          <q-item-section>
            <q-input dark filled stack-label clearable counter hide-bottom-space
                     maxlength="30" v-model="channel.name" label="Name" hint="Unique name of the channel"
                     :rules="[val => !!val || 'Field is required']"/>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-input dark filled stack-label clearable autogrow maxlength="200" type="textarea" counter v-model="channel.description" label="Description" hint="Helpful informative channel description"/>
          </q-item-section>
        </q-item>

        <q-item-label header class="q-pb-none">Channel type</q-item-label>

        <q-item>

          <q-list dense class="q-gutter-sm">

            <q-item tag="label">
              <q-item-section avatar>
                <q-radio v-model="channel.type" val="GENRE" color="green" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Genre</q-item-label>
                <q-item-label caption>Channel by genres. Can be multiple genres comma seperated</q-item-label>
              </q-item-section>
            </q-item>

            <q-item v-if="channel.type === 'GENRE'">
              <q-item-section avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  <q-select filled multiple dark stack-label use-chips
                            v-model="channel.sources"
                            :options="genreOptions"
                            label="Genres"/>
                </q-item-label>
                <!--                <q-input v-if="channel.type === 'folder'" dark filled stack-label v-model="channel.source" label="Source" hint="The source values"/>-->
              </q-item-section>
            </q-item>

            <q-item tag="label">
              <q-item-section avatar>
                <q-radio v-model="channel.type" val="DIRECTORY" color="green" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Folder</q-item-label>
                <q-item-label caption>Channel by location. Can be multiple genres comma seperated</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>

        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label>Repeat</q-item-label>
            <q-item-label caption>Repeat when all tracks played</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-toggle size="lg" v-model="channel.repeat" color="green" icon="repeat"/>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label>Random selection</q-item-label>
            <q-item-label caption>Play in random order</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-toggle size="lg" v-model="channel.randomTrackSelection" color="green" icon="shuffle"/>
          </q-item-section>
        </q-item>

        <q-separator spaced/>

        <q-item>
          <q-item-section>
            <q-item-label>
              <q-btn label="Submit" type="submit" color="grey" @click="submit"/>
            </q-item-label>
          </q-item-section>
        </q-item>

      </q-list>

    </q-form>
  </div>

</template>

<script>

import {ref} from "vue";
import apiClient from "../../http/apiClient";

export default {
  name: "EditChannelView",
  setup() {
    const editChannelDialog = ref(false);
    const channel = ref({
      name: '',
      description: '',
      type: null,
      sources: null,
      repeat: true,
      randomTrackSelection: true
    });
    const genreOptions = ref([]);
    return { editChannelDialog, channel, genreOptions }
  },
  watch: {
    'channel.type': {
      handler(val, oldVal) {
        if (val === 'GENRE' && !this.genreOptions.length) {
          apiClient.getGenres().then(res => {
            this.genreOptions = res.data.map(g => g.genre);
          })
        }
      }
    }
  },
  methods: {
    submit() {
      apiClient.createChannel(this.channel).then(res => {
        this.$router.push({name: 'channels'});
      })
    }
  }
}
</script>

<style scoped>
.channel-editor {
  max-width: 40%;
}
</style>