<template>
  <v-container fluid>
    
    <form ref="form">
    <section>
      <v-row>
        <v-col cols="12" sm="8" md="8">
          <v-text-field
            label="Request Title"
            v-model="request.name"
            solo
          ></v-text-field>
        </v-col>
        <v-col class="d-flex" cols="12" md="1" sm="8">
       

<v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600" @keydown.esc="dialog = false">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary"
         dark v-bind="attrs" v-on="on">
          Http Def's
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline"> HTTP File </v-card-title>
        <v-card-text>
          <v-form class="px-3">
            <v-textarea label="Http file"
             v-shortkey.once="{get:['ctrl','alt','g'],post:['ctrl','alt','p'],delete:['ctrl','alt','e'],put:['ctrl','alt','u']}" @shortkey.native="postMethod($event)"
            v-model="httpdef"
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="parse">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>



       
       
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col class="d-flex" cols="12" md="2" sm="2">
          <v-select
            :items="items"
            label="METHOD"
            v-model="request.method"
            solo
          ></v-select>
        </v-col>
        <v-col class="d-flex" cols="12" md="8" sm="8">
          <v-text-field
           v-model="request.name" 
          ></v-text-field>
        </v-col>
        <v-col class="d-flex mt-n8 pt-n1" cols="12" md="2" sm="2">
          <v-btn color="success" @click="sendRequest" large>
            Send
            <v-icon class="ml-1" left> mdi-send </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </section>
    <!-- radio button -->
    <v-radio-group v-model="row" row>
      <v-radio label="Params" value="params"></v-radio>
      <v-radio label="Authorization" value="authorization"></v-radio>
      <v-radio label="Header" value="header"></v-radio>
      <v-radio label="Body" value="body"></v-radio>
    </v-radio-group>
    <!-- radio button -->
    <section>
      <!-- Params -->
      <v-row label="Parameter List" v-if="row === 'params'">
        <v-col cols="12" sm="12" md="12">
          <div
            v-for="params in request.queryparams"
            :key="params"
            class="text-fields-row"
          >
            <v-row>
              <v-col cols="12" sm="6" md="5">
                <v-text-field
                  :label="'key ' + (i + 1)"
                  v-model="params.key"
                  solo
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="5">
                <v-text-field
                  :label="'value ' + (i + 1)"
                  v-model="params.value"
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
        </v-col>
      </v-row>
      <!-- Params ending -->
      <!-- Authorization -->
      <v-row label="Authorization" v-if="row === 'authorization'">
        <v-col class="d-flex" cols="12" md="2" sm="2">
          <v-select
            :items="authType"
            label="Authorization Type"
            v-model="authorizationType"
            solo
          ></v-select>
        </v-col>
        <v-col class="d-flex" cols="12" md="4" sm="4">
          <v-text-field label="User" placeholder="User" solo></v-text-field>
        </v-col>
        <v-col class="d-flex" cols="12" md="4" sm="4">
          <v-text-field
            type="passoword"
            label="Password"
            placeholder="Password"
            solo
          ></v-text-field>
        </v-col>
        <v-col class="d-flex" cols="12" md="8" sm="8">
          <v-text-field
            label="Bearer Token"
            placeholder="Bearer Token"
            solo
          ></v-text-field>
        </v-col>
      </v-row>
      <!-- Authorization -->
      <!-- Header -->
      <v-row label="Header" v-if="row === 'header'">
        <v-col cols="12" sm="12" md="12">
          <div
            v-for="header in request.headers"
            :key="header"
            class="text-fields-row"
          >
            <v-row>
              <v-col cols="12" sm="6" md="5">
                <v-text-field
                  :label="'key ' + (i + 1)"
                  v-model="header.key"
                  solo
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="5">
                <v-text-field
                  :label="'value ' + (i + 1)"
                  v-model="header.value"
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
        </v-col>
      </v-row>
      <!-- Header -->
      <!-- Body -->
      <v-row label="Body" v-if="row === 'body'">
        <v-col cols="12" md="12" sm="12">
          <v-textarea solo name="input-7-4" label="Body"></v-textarea>
        </v-col>
      </v-row>
      <!-- /Body -->
    </section>

    <!-- response Section -->
    <section>
      <v-card elevation="13" class="mx-auto" max-width="1250">
        <v-card-text class="text-primary">
          <v-card-title>
            <h4>Response</h4>
            <v-spacer></v-spacer>
            <div class="justify-end">
              <v-alert dense :type="statusColour">
                <!-- <input :class="statusCategory ? statusCategory.className : ''" :value="response.status || '(waiting to send request)'" ref="status" id="status" name="status" readonly type="text"> -->
                Status:
              </v-alert>
            </div>
          </v-card-title>
          <v-row label="Response Body">
            <v-col cols="12" md="12" sm="12">
              <v-textarea solo name="input-7-4" label="Body"></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </section>
    </form>
    <!-- /response Section -->
  </v-container>
</template>
<script>
import Vue from "vue";
import section from "../components/section";
import hljs from "highlight.js";

Vue.use(require('vue-shortkey'))

const statusCategories = [
  {
    name: "informational",
    statusCodeRegex: new RegExp(/[1][0-9]+/),
    statusColour: "info",
    className: "info-response",
  },
  {
    name: "successful",
    statusCodeRegex: new RegExp(/[2][0-9]+/),
    statusColour: "success",
    className: "success-response",
  },
  {
    name: "redirection",
    statusCodeRegex: new RegExp(/[3][0-9]+/),
    statusColour: "warning",
    className: "redir-response",
  },
  {
    name: "client error",
    statusCodeRegex: new RegExp(/[4][0-9]+/),
    statusColour: "warning",
    className: "cl-error-response",
  },
  {
    name: "server error",
    statusCodeRegex: new RegExp(/[5][0-9]+/),
    statusColour: "error",
    className: "sv-error-response",
  },
];
export const findStatusGroup = (responseStatus) =>
  statusCategories.find((status) =>
    status.statusCodeRegex.test(responseStatus)
  );

export default {
  name: "DotHttp",


  data() {
    return {
  out:'',
  httpdef:'',
      dialog:false,
      // view data delete after
      requestIdView: this.$route.params.id,
      // this.request.httpdef:this.httpdef,
      request: [
        {
          collectionid: "",
          name: "",
          id: "",
          createdDate: "",
          updatedDate: "",
          inbound: "",
          httpdef: "",
          curl: "",
          method: "",
          // row: "",
          url: "",
          queryparams: [
            {
              key: "",
              value: "",
              enabled: true,
              description: "",
            },
          ],
          headers: [
            {
              key: "",
              value: "",
              enabled: true,
              description: "",
            },
          ],
          payload: {},
          tag: [""],
        },
      ],
      backendResponse: [],
      //view data delete after
      statusColour: "info",
      response: {
        status: "400",
        headers: '{"userName":"header"}',
        body: '{"userName":"aravind"}',
      },
      // headers:[{text:'KEY',value:'key'},{text:'VALUE',value:'value'}],
      authType: ["None", "Basic", "Bearer Token"],
      // statusColour: "info",
      authorizationType: "",
      components: {
        "pw-section": section,
      },
      method: "GET",
      row: "",
      url: "",
      // isHidden: false,
      textFields: [],
      items: ["GET", "PUT", "POST", "DELETE", "HEAD", "OPTION", "PATCH"],
    };
  },
  computed: {
    statusCategory() {
      console.log(this.response);
      return findStatusGroup(this.response.status);
    },
  },
  watch: {
    contentType(val) {
      this.rawInput = !this.knownContentTypes.includes(val);
    },
    rawInput(status) {
      if (status && this.rawParams === "") this.rawParams = "{}";
      else this.setRouteQueryState();
    },
    "response.body": function () {
      var responseText =
        document.querySelector("div#response-details-wrapper pre code") != null
          ? document.querySelector("div#response-details-wrapper pre code")
          : null;
      if (responseText) {
        if (
          document.querySelector(".hljs") !== null &&
          responseText.innerHTML.indexOf('<span class="hljs') !== -1
        ) {
          responseText.removeAttribute("class");
          responseText.innerHTML = null;
          responseText.innerText = this.response.body;
        } else if (
          responseText &&
          this.response.body != "(waiting to send request)" &&
          this.response.body != "Loading..." &&
          this.response.body != "See JavaScript console (F12) for details."
        ) {
          // responseText.innerText = this.responseType == 'application/json' || 'application/hal+json' ? JSON.stringify(this.response.body,
          //   null, 2) : this.response.body;
          hljs.highlightBlock(
            document.querySelector("div#response-details-wrapper pre code")
          );
        } else {
          responseText.innerText = this.response.body;
        }
      }
    },
    params: {
      handler: function (newValue) {
        if (!this.paramsWatchEnabled) {
          this.paramsWatchEnabled = true;
          return;
        }
        let path = this.path;
        let queryString = newValue
          .filter(({ key }) => !!key)
          .map(({ key, value }) => `${key}=${value}`)
          .join("&");
        queryString = queryString === "" ? "" : `?${queryString}`;
        if (path.includes("?")) {
          path = path.slice(0, path.indexOf("?")) + queryString;
        } else {
          path = path + queryString;
        }

        this.path = path;
      },
      deep: true,
    },
  },
  
  methods: {
async parse(){
console.log(this.httpdef);
  this.dialog = !this.dialog;
  const outa = await this.run(this.httpdef);
  this.request.name = outa.name;
  this.request.url = outa.url;
  this.request.method = outa.method;
  // console.log(this.request.name +" "+this.request.url)
},
postMethod(event){
  console.log(event.srcKey)
  console.log(this.httpdef)
  // if(event.srcKey === 'get'){
  //   this.httpdef=`@name(Get Request)
  //               GET "https://dothttp.dev/get"
  //   `;  
  //   }
  switch(event.srcKey){
    
    case 'get':
    this.httpdef=`@name("Get Request")
    GET https://dothttp.dev/get`    
    break;
    case 'post':
    this.httpdef=`@name("POST Request")
    POST https://dothttp.dev/post
    data({
   "user": "adam",
   "height" : 8.8
   }) `
   break; 
    case 'delete':
    this.httpdef=`@name("DELETE Request")
    DELETE https://dothttp.dev/delete/1`
    break;
    case 'put':
    this.httpdef=`@name("PUT Request")
    PUT https://dothttp.dev/put/1`
    break;
      
  }
  // console.log(this.httpdef)
  // switch(event){
  //   case
  // }
},

    // delete all these after
    //  view request data
    // retrieveRequest(requestId) {
    //   this.$http.get("requests/" + requestId).then((res) => {
    //     if (res.status == 200) {
    //       // this.requestData = res.data;
    //       this.request = res.data;
    //       console.log(
    //         "I'm in dothttp view requestid: ",
    //         requestId,
    //         this.request
    //       );
    //     }
    //   });
    // },
theAction (event) {
  console.log("IN Action")
  console.log(event)
    switch (event.srcKey) {
      case 'up':
        this.request.name = "CTRL Short Key"
        console.log("UP")
        this.httpdef = `@name("UP")`
        break
      case 'down':
        console.log("Down")
        this.httpdef = `@name("DOWN")`
        break
    }
},
    async run(data) {
      const pycode = 'main("""' + data + '""")';
      const out = await window.pyodide.runPython(pycode);
      console.log("working fine");

  this.request.url = out.url;
  this.request.method = out.method;
      // console.log("method is ", this.out.method);
      // console.log("url is ", this.out.url);
      // console.log("headers are ", this.out.headers);
      // console.log("urlparams are ", this.out.query);
      // console.log("data is ", this.out.payload);
      return this.out;
    },

    // delete after ^
    add() {
      console.log("clcked");
      this.request.queryparams.push({
        key: "",
        value: "",
      });
    },
    remove(index) {
      this.textFields.splice(index, 1);
    },
    sendRequest() {
      console.log(this.httpdef);
      this.run(this.httpdef);
    },
    // sendRequestBackend(){
    //   this.$http.post('/requests',this.form).then((res)=>{
    //     console.log(res);
    //   })
    // }
  },
 
};
</script>

<style >
code {
  height: 336px;
  border-radius: 8px;
}

.hljs,
.hljs-subst {
  background-color: var(--bg-dark-color) !important;
  color: var(--fg-color) !important;
  font-family: "Roboto Mono", monospace;
}
</style>