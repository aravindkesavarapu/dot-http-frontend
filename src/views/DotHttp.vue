<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="8" md="8">
        <v-text-field
          label="Request Title"
          placeholder=""
          solo
          clearable
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col class="d-flex" cols="12" md="2" sm="2">
        <v-select :items="items" label="METHOD" solo></v-select>
      </v-col>
      <v-col class="d-flex" cols="12" md="8" sm="8">
        <v-text-field
          label="URL"
          placeholder="https://www.dothttp.dev/"
          solo
          clearable
        ></v-text-field>
      </v-col>
      <v-col class="d-flex mt-n8 pt-n1" cols="12" md="2" sm="2">
        <v-btn color="success" large>
          Send
          <v-icon class="ml-1" left> mdi-send </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <section>
      <input id="tab-one" type="radio" name="grp" checked="checked" />
      <label for="tab-one">Parameter</label>
      <div class="tab">
        <pw-section class="cyan" label="Authentication">
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-row>
                <div
                  v-for="(textField, i) in textFields"
                  :key="i"
                  class="text-fields-row"
                >
                  <v-row>
                    <v-col cols="12" sm="5" md="5">
                      <v-text-field
                        label="key"
                        v-model="textField.value1"
                        placeholder="userName"
                        solo
                        clearable
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="5" md="5">
                      <v-text-field
                        label="value"
                        placeholder="John"
                        solo
                        clearable
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2" md="2">
                      <v-btn @click="remove">
                        <v-icon class="d-flex">mdi-delete</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </div>
                <v-col cols="12" sm="12" md="12">
                  <v-btn block @click="add">
                    <v-icon>mdi-plus-thick</v-icon>
                    Add New
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-textarea
                background-color="black"
                color="white"
                label="Parameter List"
              ></v-textarea>
            </v-col>
          </v-row>
        </pw-section>
      </div>
    </section>
  </v-container>
</template>
<script>
// import section from "../components/section";

export default {
  name: "DotHttp",
  //   components: {
  //     "pw-section": section,
  //   },
  data: () => ({
    isHidden: false,
    textFields: [],
    items: ["GET", "PUT", "POST", "DELETE", "HEAD", "OPTION", "PATCH"],
  }),
  methods: {
    add() {
      this.textFields.push({
        value1: "",
        value2: "",
      });
    },
    remove(index) {
      this.textFields.splice(index, 1);
    },
  },
};
</script>

<style>
</style>