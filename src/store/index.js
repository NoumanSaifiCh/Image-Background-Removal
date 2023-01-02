import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    convertImage: "",
  },

  actions: {
    getRemovedImage(context, img) {
      // console.log("api call", img);
      var myHeaders = new Headers();
      myHeaders.append("X-API-Key", "Bbr6EwdnHFXftc9wuJMjTkK4");
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({ image_file_b64: img });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        //redirect: 'follow',
        responseType: "arrayBuffer",
      };
      //console.log("nhbhf",requestOptions)

      fetch("https://api.remove.bg/v1.0/removebg", requestOptions)
        .then((response) => response.arrayBuffer())

        .then((result) => {
          const base64String = btoa(
            [].reduce.call(
              new Uint8Array(result),
              function (p, c) {
                return p + String.fromCharCode(c);
              },
              ""
            )
          );
          const removedBg = "data:image/jpeg;base64," + base64String;
          console.log("response jbhhhhh", removedBg);
          context.commit("getRemovedImage", removedBg);
        })
        .catch((error) => console.log("error", error));
    },
  },
  mutations: {
    getRemovedImage(state, removedBg) {
      console.log("mutation", removedBg);
      state.convertImage = removedBg;
    },
  },
  modules: {},
});
