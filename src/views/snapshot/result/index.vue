<template>
    <div class="app-container">
        <!-- 表格数据 -->
        <el-table v-loading="loading" :data="resultList" fit>
            <el-table-column label="id" prop="id" />
            <el-table-column label="快照id" prop="snapshotId"></el-table-column>
            <el-table-column label="用户id" prop="userId" />
            <el-table-column label="藏品id" prop="goodsId" />
            <el-table-column label="类别" prop="type" />
            <el-table-column label="快照藏品数量" prop="count" />
            <el-table-column label="来源" prop="source" />

            <el-table-column label="添加时间" prop="addTime" />
            <el-table-column label="更新时间" prop="updateTime" />
        </el-table>

        <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />

    </div>
</template>

<script setup >
import { getResultList } from '@/api/snapshot'
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

const getResult = async () => {
    const res = await getResultList(queryParams.value)
    if (res.code === 200) {
        resultList.value = res.data.records
    }
}
getResult()

const formatterShelfFlag = (row) => {
    return getDict('shelfFlag', row.shelfFlag)
}

const shelfFlag = reactive(dicts.shelfFlag)
</script>

<style scoped>
</style>
