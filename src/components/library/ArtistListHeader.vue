<template>
  <div class="q-pa-md">
    <q-item class="q-pl-none">
      <q-item-section side>
        <q-icon size="lg" name="smart_toy"/>
      </q-item-section>
      <q-item-section side>
        <q-item-label class="text-h3">Artists</q-item-label>
        <q-item-label caption>Total: {{totalCount}}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  name: "ArtistListHeader",
  props: ['totalCount']
}
</script>

<style scoped>

</style>