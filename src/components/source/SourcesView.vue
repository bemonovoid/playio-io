<template>

  <div class="q-pa-md">
    <q-item class="q-pl-none">
      <q-item-section side>
        <q-icon size="lg" name="storage"/>
      </q-item-section>
      <q-item-section side>
        <q-item-label class="text-h3">Sources</q-item-label>
      </q-item-section>
      <q-item-section class="items-end">
        <q-btn v-if="$route.name === 'sourcesList'" color="green" flat round icon="add" to="/sources/new"/>
      </q-item-section>
    </q-item>

  </div>

  <div class="q-pa-md q-gutter-md">

<!--    <q-toolbar>-->
<!--      <q-icon size="md" name="source" color="primary"></q-icon>-->
<!--      <q-toolbar-title>-->
<!--        Sources-->
<!--        <q-item-label caption>Description what is sources</q-item-label>-->
<!--      </q-toolbar-title>-->

<!--      <q-btn v-if="$route.name === 'sourcesList'" color="blue" flat round icon="add" to="/sources/new"/>-->

<!--    </q-toolbar>-->

    <q-separator spaced/>

    <router-view/>

  </div>
</template>

<script>

export default {
  name: "SourcesView"
}
</script>

<style scoped>

</style>