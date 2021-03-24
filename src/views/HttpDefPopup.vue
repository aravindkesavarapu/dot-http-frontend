<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Http Def's
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline"> HTTP File </v-card-title>
        <v-card-text>
          <v-form class="px-3">
            <v-textarea v-model="httpdef" disabled label="Http file"></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn color="green darken-1" text @click="dialog = false">
            Disagree
          </v-btn> -->
          <v-btn color="green darken-1" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: ["httpdef"],

  data() {
    return {
      dialog: false,
      title: "",
    };
  },
};
</script>