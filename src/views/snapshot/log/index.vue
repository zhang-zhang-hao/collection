<template>
    <div class="app-container">
        <!-- 表格数据 -->
        <el-table v-loading="loading" :data="logList" fit>
            <el-table-column label="id" prop="id" />
            <el-table-column label="快照id" prop="snapshotId"></el-table-column>
            <el-table-column label="用户id" prop="userId" />
            <el-table-column label="藏品id" prop="goodsId" />
            <el-table-column label="寄售标识" prop="salasFlag" />
            <el-table-column label="转赠标识" prop="transferFlag" />
            <el-table-column label="藏品编号" prop="goodsNo" />
            <el-table-column label="状态" prop="statusFlag" />
            <el-table-column label="添加时间" prop="addTime" />
        </el-table>

        <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />

    </div>
</template>

<script setup >
import { getLogList } from '@/api/snapshot'
import { ElMessage } from 'element-plus'
import { getDict } from '@/utils/dict'
import { dicts } from '@/utils/dict.js'

const queryParams = ref({
    pageNum: 1,
    pageSize: 20,
})

const total = ref(0)

const getList = () => {}

const logList = ref([])

const getLog = async () => {
    const res = await getLogList(queryParams.value)
    if (res.code === 200) {
        logList.value = res.data.records
    }
}
getLog()

const formatterShelfFlag = (row) => {
    return getDict('shelfFlag', row.shelfFlag)
}

const shelfFlag = reactive(dicts.shelfFlag)
</script>

<style scoped>
</style>
