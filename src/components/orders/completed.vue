<template>
  <div>
    <v-card height="800px" class="scroll">
      <div
        v-for="(item, i) of items"
        :key="i"
      >
        <v-card class="my-12 mx-3 pa-6 transition-swing" max-width="374" :elevation="hover ? 24 : 6">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>
          <div
            style="
              display: flex;
              padding-left: 15px;
              padding-rigth: 15px;
              padding-top: 15px;
            "
          >
            <div style="flex: 1; padding-bottom: 0; margin-top: -10px">
              <v-card-title>Order # {{ item.id }}</v-card-title>
            </div>
            <div style="flex: 1; padding-bottom: 0">
              <v-alert max-width="150" outlined dense type="success"
                >Completed</v-alert
              >
            </div>
          </div>
          <v-divider class="mx-4"></v-divider>
          <div style="display: flex; padding-left: 15px; padding-rigth: 15px">
            <div style="flex: 1">
              <div style="padding-left: 10px">
                <span class="title">Products</span>
              </div>
              <div
                style="display: flex; padding-left: 20px"
                v-for="(child, index) of item.details"
                :key="index"
              >
                <div>{{ child.description }}</div>
                &nbsp;-&nbsp;
                <div>{{ child.quantity }}</div>
              </div>
            </div>
          </div>
          <v-card-text> </v-card-text>
        </v-card>
      </div>
    </v-card>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      title: "Pending",
      loading: false,
      items: [],
    };
  },
  created() {
    this.getOrders();
  },
  methods: {
    getOrders() {
      Axios.get("/order/status/4").then((response) => {
        this.items = response.data;
      });
    },
    cancel(item) {
      item.status = 5
      Axios.put(`/order/update/${item.id}`, item)
        .then((response) => {
          console.log(response);
          this.getOrders();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.btnBM {
  justify-content: end;
}
.scroll {
  overflow-y: auto;
}
</style>