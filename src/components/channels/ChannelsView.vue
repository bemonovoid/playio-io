<template>

  <div class="q-pa-md">
    <q-item class="q-pl-none">
      <q-item-section side>
        <q-icon size="lg" name="podcasts"/>
      </q-item-section>
      <q-item-section side>
        <q-item-label class="text-h3">Channels</q-item-label>
      </q-item-section>
    </q-item>

  </div>

  <div class="q-pa-md q-gutter-sm">
    <q-tabs
        inline-label
        align="left"
        v-model="filterTab"
        indicator-color="transparent"
        active-color="red"
        class="text-grey-4 no-shadow no-box-shadow">

      <q-tab name="all" label="ALL" />
      <q-tab name="featured" label="Featured" />

      <q-space/>

      <q-route-tab no-caps name="new" icon="playlist_add" class="text-green" :to="{name: 'newChannel'}"/>
    </q-tabs>

    <div class="q-px-md">
      <q-separator spaced/>
    </div>

  </div>

  <div class="q-pa-md row items-start q-gutter-lg inset-shadow">

    <q-card v-for="channel in channels" :key="channel.id" class="channelCard" bordered>
      <q-img src="channel-3.png" class="q-hoverable cursor-pointer" @click="viewChannel(channel.id)">
        <div class="absolute-bottom">
          <q-item-section>
            <q-item-label class="text-subtitle2 text-weight-bold">{{channel.name}}</q-item-label>
          </q-item-section>
        </div>
      </q-img>

      <q-card-actions align="left" class="q-py-none">
        <q-btn flat round color="grey" icon="play_arrow" @click="player.playChannel(channel)"/>
      </q-card-actions>
    </q-card>

  </div>

</template>

<script>

import {onMounted, inject, ref} from "vue";
import apiClient from "../../http/apiClient";
import EditChannelView from "./EditChannelView.vue";

export default {
  name: "ChannelsView",
  components: { EditChannelView },
  setup() {
    const filterTab =  ref('all');

    const player = inject('player');

    let channels = ref([]);

    const deleteChannelIdModel = ref(-1);
    const confirmDeleteModel = ref(false);

    const getChannels = () => {
      apiClient.getChannels().then(res => {
        channels.value = res.data;
      });
    };

    const onDeleteChannel = (channelId) => {
      confirmDeleteModel.value = true;
      deleteChannelIdModel.value = channelId;
    }

    const deleteChannel = () => {
      apiClient.deleteChannel(deleteChannelIdModel.value).then(res => {
        getChannels();
      })
    };

    onMounted(getChannels);

    return {filterTab, player, channels, confirmDeleteModel, deleteChannelIdModel, onDeleteChannel, getChannels, deleteChannel}
  },
  methods: {
    viewChannel(channelId) {
      this.$router.push({name: "channel", params: {channelId: channelId}});
    }
  }

}
</script>

<style scoped>
.channelCard {
  width: 100%;
  max-width: 225px;
}
</style>