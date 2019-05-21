<template>
  <!-- eslint-disable -->
  <div class="home">
    <p class="hdr">Файлы</p>
    <div class="items">
      <div
        class="item"
        :data-path="item.path"
        v-for="item in items"
        :key="item.name"
        @mousedown="getItems"
      >
        <img :src="item.preview" :alt="item.name" v-if="item.type == 'file'">
        <svg
          v-else
          width="145"
          height="145"
          viewBox="0 0 145 145"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <path id="a" d="M0 0h57l12 18h76v103H0z"></path>
          </defs>
          <g transform="translate(0 24)" fill="none">
            <use fill="#FDEFB2" fill-rule="evenodd" xlink:href="#a"></use>
            <path stroke="#F4DC49" d="M.5.5v120h144v-102H68.732l-12-18H.5z"></path>
          </g>
        </svg>
        <p class="name">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { meta } from "ya-disk";

export default {
  computed: {
    items() {
      return this.$store.state.items;
    }
  },

  methods: {
    getItems(e) {
      const path = e.currentTarget.dataset.path;
      const norm_path = path.replace("disk:/", "");
      console.log(norm_path);
      this.$router.push({ path: norm_path });
    }
  },
  beforeRouteUpdate(to, from, next) {
    meta.get(this.$store.state.token, "disk:" + to.path, {}, res => {
      if (res._embedded && res._embedded.items) {
        this.$store.state.items = res._embedded.items;
        next();
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.home {
  max-width: 1024px;
  width: 100%;
  background-color: #e2e2e2;
  margin: 0 auto;
}

.hdr {
  font-size: 26px;
  background-color: #fff;
  margin: 0;
  padding: 15px 0;
}

.items {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 25px;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.item {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  cursor: pointer;
  // margin: 10px;
  // margin: auto;
  width: 256px;
  padding: 10px 20px;
  margin-bottom: 10px;
  min-height: 256px;
  box-sizing: border-box;
  height: auto;
  //box-shadow: 0 -2px 0 #fff, 0 1px 6px rgba(0, 0, 0, 0.35);

  svg,
  img {
    width: 100%;
    height: auto;
    margin-top: auto;
  }

  p.name {
    // position: absolute;
    // left: 0;
    // bottom: -20px;
    margin: 20px 0 !important;
    text-align: center;
    width: 100%;
    margin: 0;
  }
}
</style>
