<template>
    <div class="wrapper">
        <p>Robot: {{ robotID }} &nbsp;</p>
        <p v-show="orderID != null">Current handler: {{ orderID }} Remaining: {{ remainingTime }}s</p>
    </div>
</template>
  
<script setup>
    defineProps(["robotID","orderID","remainingTime"]);
</script>

<style scoped>
    .wrapper{
        display: flex;
    }
</style>