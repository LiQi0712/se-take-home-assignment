<template>
    <div>
        <div class="btnDiv">
            <button class="btn" @click="addNormal">New Normal Order</button>
            <button class="btn" @click="addVip">New Vip Order</button>
            <button class="btn" @click="addBot">+ Bot</button>
            <button class="btn" @click="dropBot" :disabled="robotID ===0">- Bot</button>
        </div>
        <div class="listDiv">
            <div class="pending">
                <h3 class="center">Pending</h3>
                <hr/>
                <Pending v-for="order in orderList" :key="order.orderID" v-bind="order"></Pending>
            </div>
            <div class="processing">
                <h3 class="center">Processing</h3>
                <hr/>
                <Processing v-for="robot in robotList" :key="robot.robotID" v-bind="robot"></Processing>
            </div>
            <div class="complete">
                <h3 class="center">Completed</h3>
                <hr/>
                <Complete v-for="complete in completeList" :key="complete.orderID" v-bind="complete"></Complete>
            </div>
        </div>
    </div>
</template>
  
<script setup>
    import {ref, watch} from 'vue'
    import Pending from '@/components/Pending.vue';
    import Processing from '@/components/Processing.vue';
    import Complete from '@/components/Complete.vue';
    
    const orderList = ref([])
    const robotList = ref([])
    const completeList = ref([])
    let orderID = 0;
    let robotID = 0;

    const addNormal = () =>{
        orderID++
        orderList.value.push({
            orderID: orderID,
            isVip: false,
            pendingTime: 10
        })
    }

    const addVip = () =>{
        orderID++
        orderList.value.push({
            orderID: orderID,
            isVip: true,
            pendingTime: 10
        })
        sortOrder()
    }

    const sortOrder = () =>{
        let ordercount = orderList.value.length - 1
        for(let i=0; i<ordercount; i++){
            if(orderList.value[i].isVip == false){
                let temp = orderList.value[i]
                orderList.value[i] = orderList.value[ordercount]
                orderList.value[ordercount] = temp
                break
            }
        }
    }

    const addBot = () =>{
        robotID++
        robotList.value.push({
            robotID: robotID,
            orderID: null,
            isVip: null,
            pendingTime: null,
            remainingTime: null
        })
    }

    const dropBot = () =>{
        robotID--
        let robotcount = robotList.value.length - 1
        if(robotList.value[robotcount].orderID != null){
            if(robotList.value[robotcount].isVip == true){
                orderList.value.unshift({
                    orderID: robotList.value[robotcount].orderID,
                    isVip: robotList.value[robotcount].isVip,
                    pendingTime: robotList.value[robotcount].pendingTime
                })
            }
            else{
                orderList.value.push({
                    orderID: robotList.value[robotcount].orderID,
                    isVip: robotList.value[robotcount].isVip,
                    pendingTime: robotList.value[robotcount].pendingTime
                })
                sortOrder()
            }
        }
        robotList.value.pop()
    }

    setInterval(()=>{
        if(robotID > 0){
            for(let i = 0; i < robotID; i++){
                if(robotList.value[i].orderID == null){
                    if(orderList.value.length > 0){
                        let temp = orderList.value[0]
                        robotList.value[i].orderID = temp.orderID
                        robotList.value[i].isVip = temp.isVip
                        robotList.value[i].pendingTime = temp.pendingTime
                        robotList.value[i].remainingTime = temp.pendingTime
                        orderList.value.shift()
                    }
                }
                else{
                    robotList.value[i].remainingTime--
                    if(robotList.value[i].remainingTime == 0){
                        completeList.value.push({
                            orderID: robotList.value[i].orderID,
                            isVip: robotList.value[i].isVip
                        })
                        robotList.value[i].orderID = null
                        robotList.value[i].isVip = null
                        robotList.value[i].pendingTime = null
                        robotList.value[i].remainingTime = null
                    }
                }
            }
        }
    },1000)
</script>

<style scoped>
    
</style>