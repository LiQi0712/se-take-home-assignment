<template>
    <p>{{ orderID }} <sup v-show="isVip">VIP</sup></p>
</template>
  
<script setup>
    defineProps(["orderID","isVip"]);
</script>

<style scoped>
sup{
    color: red;
}
</style>