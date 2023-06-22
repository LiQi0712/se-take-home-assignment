<template>
    <p>{{ orderID }} <sup v-if="isVip">VIP</sup></p>
</template>
  
<script setup>
    defineProps(["orderID","isVip"]);
</script>

<style scoped>
sup{
    color: red;
}
</style>