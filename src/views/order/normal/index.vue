<template>
    <div class="app-container">
        <!-- 表格数据 -->
        <el-table v-loading="loading" :data="orderList" fit>
            <el-table-column label="id" prop="id" />
            <el-table-column label="用户id" prop="userId"></el-table-column>
            <el-table-column label="手机号" prop="phone" />
            <el-table-column label="藏品id" prop="goodsId" />
            <el-table-column label="类别" prop="type" />
            <el-table-column label="次数" prop="count" />
            <el-table-column label="snapshotId" prop="快照ID" />

            <el-table-column label="添加时间" prop="addTime" />
            <el-table-column label="更新时间" prop="updateTime" />
        </el-table>

        <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />

    </div>
</template>

<script setup >
import { getOrderList } from '@/api/order'
import { ElMessage } from 'element-plus'
import { getDict } from '@/utils/dict'
import { dicts } from '@/utils/dict.js'

const queryParams = ref({
    pageNum: 1,
    pageSize: 20,
})

const total = ref(0)

const orderList = ref([])

const getOrder = async () => {
    const res = await getOrderList(queryParams.value)
    if (res.code === 200) {
        orderList.value = res.data.records
    }
}
getOrder()

const formatterShelfFlag = (row) => {
    return getDict('shelfFlag', row.shelfFlag)
}

const shelfFlag = reactive(dicts.shelfFlag)
</script>

<style scoped>
</style>
