
<style scoped>
section {
  height: 150px;
  background-color: #95db5e;
  margin: 0 5% 20px 5%;
  margin: 40px 0px;
}

div {
  margin: 40px 20px;
}
</style>

<template>
  <div class="container">
    <header-comp></header-comp>

    <section id="page1" data-role="page">
        <div class="content" data-role="content">컨텐츠</div>
    </section>

    <footer-comp></footer-comp>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default {
  data() {
    return {
      msg: "Hello VueJS",
    };
  },
  components: {
    "header-comp": Header,
    "footer-comp": Footer,
  },
};
</script>
