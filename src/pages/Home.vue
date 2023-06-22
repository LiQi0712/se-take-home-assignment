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
    import {ref} from 'vue';
    import Pending from '@/components/Pending.vue';
    import Processing from '@/components/Processing.vue';
    import Complete from '@/components/Complete.vue';
    
    const orderList = ref([])
    const robotList = ref([])
    const completeList = ref([])
    let orderID = 0
    let robotID = 0

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

    //back of vip
    const sortOrder = () =>{
        let orderCount = orderList.value.length - 1
        for(let i=0; i<orderCount; i++){
            if(orderList.value[i].isVip == false){
                let temp = orderList.value[i]
                orderList.value[i] = orderList.value[orderCount]
                orderList.value[orderCount] = temp
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
        let robotCount = robotList.value.length - 1
        //a robot has processing order
        if(robotList.value[robotCount].orderID != null){
            if(robotList.value[robotCount].isVip == true){
                orderList.value.unshift({
                    orderID: robotList.value[robotCount].orderID,
                    isVip: robotList.value[robotCount].isVip,
                    pendingTime: robotList.value[robotCount].pendingTime
                })
            }
            else{
                orderList.value.push({
                    orderID: robotList.value[robotCount].orderID,
                    isVip: robotList.value[robotCount].isVip,
                    pendingTime: robotList.value[robotCount].pendingTime
                })
                sortOrder()
            }
        }
        robotList.value.pop()
    }

    setInterval(()=>{
        //have robot
        if(robotID > 0){
            for(let i = 0; i < robotID; i++){
                //a robot no processing order
                if(robotList.value[i].orderID == null){
                    //if have order, put order to robot
                    if(orderList.value.length > 0){
                        let temp = orderList.value[0]
                        robotList.value[i].orderID = temp.orderID
                        robotList.value[i].isVip = temp.isVip
                        robotList.value[i].pendingTime = temp.pendingTime
                        robotList.value[i].remainingTime = temp.pendingTime
                        orderList.value.shift()
                    }
                }
                //if robot has procrssing order
                else{
                    robotList.value[i].remainingTime--
                    //if sub time and remaining time is 0
                    if(robotList.value[i].remainingTime == 0){
                        //put to complete list and clear order data in robot
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