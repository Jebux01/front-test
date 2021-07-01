<template>
  <v-container>
    <v-toolbar>
      <v-tabs
        dark
        background-color="black"
        grow
        v-for="item of Status"
        :key="item.id"
      >
        <v-tab @click="change(item.description)">
          <v-badge :content="messages" :value="messages" color="green" overlap>
            {{ item.description }}
            <v-icon large> mdi-vuetify </v-icon>
          </v-badge>
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <div style="padding: 25px">
      <pending v-if="itemsDefault.Pending"></pending>
      <completed v-if="itemsDefault.Completed"></completed>
      <delivered v-if="itemsDefault.Delivered"></delivered>
      <inprocess v-if="itemsDefault.InProcess"></inprocess>
      <canceled v-if="itemsDefault.Canceled"></canceled>
    </div>
  </v-container>
</template>

<script>
import Axios from "axios";
import canceled from "./orders/canceled.vue";
import completed from "./orders/completed.vue";
import delivered from "./orders/delivered.vue";
import inprocess from "./orders/inprocess.vue";
import pending from "./orders/pending.vue";

export default {
  components: {
    pending,
    completed,
    delivered,
    inprocess,
    canceled,
  },
  data() {
    return {
      Status: [],
      messages: 0,
      show: false,
      itemsDefault: {},
      items: {
        Canceled: false,
        Pending: false,
        Delivered: false,
        InProcess: false,
        Completed: false,
      },
    };
  },
  created() {
    this.getStatus();
  },
  methods: {
    getStatus() {
      Axios.get("/status")
        .then((response) => {
          this.Status = response.data;
          this.Status.reverse();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    change(item) {
      item = (item == "In Process") ? item = item.replace(" ", "") : item 
      this.itemsDefault = Object.assign({...this.items, [item]: true})
      
    },
  },
};
</script>
