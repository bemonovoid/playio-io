<template>

  <q-tabs align="left" v-model="tab" inline-label indicator-color="blue" no-caps>
    <q-route-tab :ripple=false name="all" label="All" :to="{name: 'channelsList', params: {filter: 'all'}}"/>
    <q-tab :ripple=false name="alarms" label="Featured"/>
  </q-tabs>

  <div class="q-pa-md row items-start q-gutter-md">

    <q-card v-for="channel in channels" :key="channel.id" class="channelCard" flat bordered>
      <q-img src="channel-3.png" class="q-hoverable cursor-pointer" @click="viewChannel(channel.id)">
        <div class="absolute-bottom">
          <q-item-section>
            <q-item-label class="text-body2 text-weight-bold">{{channel.name}}</q-item-label>
          </q-item-section>
        </div>
      </q-img>

      <q-card-actions align="left">
        <q-btn flat round color="primary" icon="play_arrow" @click="playChannel(channel)"/>
        <q-btn flat round color="red" icon="favorite" />
      </q-card-actions>
    </q-card>

  </div>

</template>

<script>

import {onMounted, inject, ref} from "vue";
import apiClient from "../../http/apiClient";

export default {
  name: "ChannelsList",
  setup() {
    const tab =  ref('all');
    const playerPlayChannel = inject('playChannel');

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
      console.log(deleteChannelIdModel.value)
      apiClient.deleteChannel(deleteChannelIdModel.value).then(res => {
        getChannels();
      })
    }

    const playChannel = (channel) => {
      playerPlayChannel(channel);
    }

    onMounted(getChannels);

    return {tab, channels, confirmDeleteModel, deleteChannelIdModel, onDeleteChannel, getChannels, deleteChannel, playChannel}
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
    max-width: 250px;
  }
</style>