<template>
  <nav class="grey lighten-4">
    <v-toolbar flat dark>
      <v-app-bar-nav-icon
        class="grey--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Dot</span>
        <span>http</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat>
        git-hub
        <!-- TODO Github icon -->
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" temporary app class="white">
      <!--
            <v-list>
             <v-list-tile>
            <v-list-tile-action>
                <v-icon class="black--text">mdi-history</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
            <v-list-tile-title class="black--text">  History</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile> 
        </v-list>
        -->

      <v-toolbar dark>
        <!-- <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn> -->
      </v-toolbar>

      <v-list>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="child in item.items" :key="child.title">
            <v-list-item-content>
              <v-list-item-title
                v-text="child.title"
                :class="child.title ? 'red--text' : child.tilte == 102"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
const statusCategories = [
  {
    name: "informational",
    statusCodeRegex: new RegExp(/[1][0-9]+/),
    className: "info--text",
  },
  {
    name: "successful",
    statusCodeRegex: new RegExp(/[2][0-9]+/),
    className: "green--text",
  },
  {
    name: "redirection",
    statusCodeRegex: new RegExp(/[3][0-9]+/),
    className: "orange--text",
  },
  {
    name: "client error",
    statusCodeRegex: new RegExp(/[4][0-9]+/),
    className: "red--text",
  },
  {
    name: "server error",
    statusCodeRegex: new RegExp(/[5][0-9]+/),
    className: "yellow--text",
  },
  {
    name: "unknown",
    statusCodeRegex: new RegExp(/.*/),
    className: "missing-data-response",
  },
];
export const findStatusGroup = (responseStatus) =>
  statusCategories.find((status) => status.items.statusCodeRegex.test(responseStatus));
export default {
  data() {
    return {
      drawer: false,
      items: [
        {
          action: "mdi-folder-multiple",
          items: [{ title: "List Item" }],
          title: "Folder",
        },
        {
          action: "mdi-history",
          active: true,
          items: [
            { title: "/get", status: "101" },
            {
              title: "/post",
              status: "201",
            },
            { title: "303" },
            { title: "403" },
            { title: "502" },
          ],
          title: "History",
        },
      ],
    };
  },
  computed: {
    responseColor1() {
      console.log("Hello");
      return 1;
    },
  },
};
</script>

<style>
</style>
 