<template>
  <div class="row q-gutter-xs justify-start">
    <q-item clickable v-for="item in settingsItems" :to="item.to">
      <q-item-section class="items-center">
        <q-item-label>
          <q-avatar size="75px">
            <q-icon size="lg" :name=item.icon></q-icon>
          </q-avatar>
        </q-item-label>
        <q-item-label caption>{{item.label}}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  name: "Settings",
  setup() {
    const settingsItems = [
      {
        icon: "podcasts",
        label: "Channels",
        to: 'channels'
      },
      {
        icon: "storage",
        label: "Sources",
        to: 'sources'
      }
    ];

    return {settingsItems};
  }
}
</script>

<style scoped>

</style>