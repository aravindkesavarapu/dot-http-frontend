<template>
  <v-list>
    <v-list-item-group v-model="model" :mandatory="!!model">
      <v-list-item
        v-for="(item, i) in items"
        :key="`item-${i}`"
        :value="item"
        :disabled="lockSelection"
        @click="lockSelection = true"
      >
        <v-list-item-content>
          <v-list-item-title v-text="item"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>
<script>
export default {
  data: () => ({
    items: ["item1", "item2", "item3"],
    model: null,
    lockSelection: false,
  }),
  watch: {
    model(val, oldVal) {
      // This logic will change the value and trigger watcher again and again
      this.val = oldVal;
    },
  },
};
</script>