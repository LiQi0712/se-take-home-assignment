<template>
    <p>Robot: {{ robotID }} Current handler: {{ orderID }} Remaining: {{ pendingTime }}s</p>
</template>
  
<script setup>
    defineProps(["robotID","orderID","pendingTime"]);
</script>

<style scoped>

</style>