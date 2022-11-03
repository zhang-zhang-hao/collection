<template>
    <div class="app-container">
        <!-- 表格数据 -->
        <el-table v-loading="loading" :data="transferList" fit>

            <el-table-column label="转赠用户id" prop="userId"></el-table-column>
            <el-table-column label="被转赠用户id" prop="transferedUserId" />
            <el-table-column label="用户藏品id" prop="userGoodsId" />
            <el-table-column label="藏品类别" prop="goodsType" />

            <el-table-column label="添加时间" prop="addTime" />
            <el-table-column label="更新时间" prop="updateTime" />
            <el-table-column label="被转赠的手机号" prop="transferedPhone" />
        </el-table>

        <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />

    </div>
</template>

<script setup >
import { getTransferList } from '@/api/order'
import { ElMessage } from 'element-plus'
import { getDict } from '@/utils/dict'
import { dicts } from '@/utils/dict.js'

const queryParams = ref({
    pageNum: 1,
    pageSize: 20,
})

const total = ref(0)

const transferList = ref([])

const getTransfer = async () => {
    const res = await getTransferList(queryParams.value)
    if (res.code === 200) {
        transferList.value = res.data.records
    }
}
getTransfer()

const formatterShelfFlag = (row) => {
    return getDict('shelfFlag', row.shelfFlag)
}

const shelfFlag = reactive(dicts.shelfFlag)
</script>

<style scoped>
</style>
