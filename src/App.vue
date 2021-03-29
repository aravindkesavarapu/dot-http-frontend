<template>
  <v-app>
    <Header />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import Header from "./components/Header";
import Vue from "vue";
import LoadScript from 'vue-plugin-load-script';
 
Vue.use(LoadScript);

const load_pyscript = `
def haha(*args, **kwargs):
    from dothttp import Config, HttpDefBase
    class content_override(HttpDefBase):
        def __init__(self, config: Config, **kwargs):
            self.extra_kwargs = kwargs
            super().__init__(config)

        def load_content(self):
            self.original_content = self.content = self.extra_kwargs['content']

        def load_properties_n_headers(self):
            self.property_util.add_env_property_from_dict(env=self.extra_kwargs.get("env", {}))

        def load_command_line_props(self):
            for key, value in self.extra_kwargs.get("properties", {}).items():
                self.property_util.add_command_property(key, value)

    def main(content):
        out = content_override(
            Config(target="1", no_cookie=True, property_file=None, experimental=False, format=False,
                stdout=False, debug=False, info=False, curl=False, env=["hai"], file="", properties=[]),
            env={"test": "google.com", },
            content=content,
        )
        out.load()
        out.load_def()
        print(out.httpdef)
        return out.httpdef
    globals()['main']=  main
import micropip
micropip.install(['textx', 'dothttp-req-wasm']).then(haha)`;

export default {
  name: "App",

  components: {
    // HelloWorld,
    Header,
  },

  data: () => ({
    //
  }),
  methods: {
    initializePyodide: async function() {
      try {
        window.languagePluginUrl =
          "https://cdn.jsdelivr.net/pyodide/v0.16.1/full/";
        await Vue.loadScript(
          "https://cdn.jsdelivr.net/pyodide/v0.16.1/full/pyodide.js"
        );
        
        // wait for pyodide ready
        await window.languagePluginLoader;
        // load pandas lib
        await window.pyodide.loadPackage(["micropip"]);
        console.log(load_pyscript);
        await window.pyodide.runPython(load_pyscript);
        this.pyodideLoaded = true;
      } catch (error) {
        this.errorMsg = error;
      }
    }
  },
  mounted() {
    console.log("intilazing pydiode");
    this.initializePyodide();
  },

  computed: {},
};
</script>
