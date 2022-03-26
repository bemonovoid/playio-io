<template>
  <div class="q-pa-md q-gutter-md">

    <q-toolbar>
      <q-icon size="md" name="source" color="primary"></q-icon>
      <q-toolbar-title>
        Sources
        <q-item-label caption>Description what is sources</q-item-label>
      </q-toolbar-title>

      <q-btn v-if="$route.name === 'sourceList'" color="blue" flat round icon="add" to="/sources/new"/>

    </q-toolbar>

    <q-separator spaced/>

    <router-view/>

  </div>
</template>

<script>

export default {
  name: "SourceView"
}
</script>

<style scoped>

</style>