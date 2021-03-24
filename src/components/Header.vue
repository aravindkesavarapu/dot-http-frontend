<template>
  <nav class="grey lighten-4">
    <v-toolbar text dark>
      <v-app-bar-nav-icon
        class="grey--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Dot</span>
        <span>http</span>
      </v-toolbar-title>
        <v-btn :click="getRequestData(1)" primary>request1 edit</v-btn>
      <v-spacer></v-spacer>
      <v-btn text>
        git-hub
        <!-- TODO Github icon -->
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" temporary app class="white">
      <v-toolbar dark> </v-toolbar>
      <template>
        <v-list>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-group :value="true" prepend-icon="mdi-folder-multiple">
            <template v-slot:activator>
              <v-list-item-title>Folders</v-list-item-title>
            </template>

            <v-list-group
              v-for="collection in collections"
              :key="collection.id"
              :value="collectionCheck"
              sub-group
            >
              <!-- @click="collectionCheckMethod($event)" -->

              <template v-slot:activator>
                <v-list-item-content v-on:click="getRequests(collection.id)">
                  <v-list-item-title>{{ collection.name }}</v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item v-for="request in requests" :key="request.id" link>
                <v-list-item-content :click="getRequestData(request.id)">
                  <v-list-item-title
                    v-text="request.method"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    v-text="request.name"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list-group>
        </v-list>
      </template>
    </v-navigation-drawer>
  </nav>
</template>


<script>
export default {
  data() {
    return {
      // open:false,
      drawer: false,
      collectionCheck: false,
      requestData: [],
      collections: [],
      requests: [],
    };
  },
  methods: {
    collectionCheckMethod() {
      this.collectionCheck != this.collectionCheck;
    },
    getRequests(collectionId) {
      // TODO change url after connecting to backend
      //  this.$http.get("requests/"+collectionId).then(res => {
      this.$http.get("requests/?collectionid=" + collectionId).then((res) => {
        if (res.status == 200) {
          this.requests = res.data;
          console.log("req", this.requests);
        }
      });
    },
    getRequestData(requestId) {
      console.log("in get requst dayta", requestId);
      this.$http.get("requests/" + requestId).then((res) => {
        if (res.status == 200) {
          this.requestData = res.data;
          console.log("req: ", requestId, this.requestData);
        }
      });
    },
  },
  computed: {
    responseColor1() {
      console.log("Hello");
      return 1;
    },
  },
  mounted() {
    this.$http
      .get("collection")
      .then((res) => {
        if (res.status == 200) {
          this.collections = res.data;
        }
      })
      .catch((err) => console.log(err.message));
  },
};
</script>

<style>
</style>
 