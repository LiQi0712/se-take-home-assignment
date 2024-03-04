<template>
    <p>{{ orderID }} <sup v-if="isVip">VIP</sup></p>
    <slot></slot>
</template>
  
<script setup>
    defineProps(["orderID","isVip","pendingTime"]);
</script>

<style scoped>
    sup{
        color: red;
    }
</style>