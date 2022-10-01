<template>
    <div class="goods">
        <div class="button-list">
            <el-button type="primary" @click="showAdd">新增</el-button>
        </div>
        <el-table height="calc(100% - 36px)" :data="tableData.value" style="width: 100%">
            <el-table-column prop="issueQuantity" label="发行数量" width="180" />
            <el-table-column prop="issuer" label="发行人" width="180" />
            <el-table-column prop="limitedQuantity" label="限购数量" />
            <el-table-column prop="name" label="商品名称" />
            <el-table-column prop="price" label="商品价格" />
            <el-table-column prop="salesTimeStart" label="开始时间" />
            <el-table-column prop="salesTimeEnd" label="结束时间" />
            <el-table-column prop="seriesName" label="系列名称" />
            <el-table-column prop="limitedQuantity" label="限购数量" />
            <el-table-column prop="shelfFlag" label="上架状态" :formatter="formatterShelfFlag" />
            <el-table-column prop="type" label="类型" :formatter="formatterType" />
            <el-table-column fixed="right" label="操作" width="180">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="createDetails(scope.row)">生成详细内容</el-button>
                    <el-button link type="primary" size="small">Edit</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[100, 200, 300, 400]" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />

    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { getList, createDetail } from '@/api/goods.js'
import { getDict } from '@/utils/dict'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

const tableData = reactive({
    value: [],
})
const pageSize = ref(20)

const currentPage = ref(1)

const total = ref(0)

const dialogFormVisible = ref(false)

const getTableList = async () => {
    let data = {
        page: currentPage.value,
        size: pageSize.value,
    }
    const res = await getList(data)
    if (res.code === 200) {
        total.value = res.data.total
        tableData.value = res.data.records
    }
}

const showAdd = () => {
    router.push('/goods/add')
}

onMounted(() => {
    getTableList()
})

const handleSizeChange = () => {
    getTableList()
}
const handleCurrentChange = () => {
    getTableList()
}

const formatterShelfFlag = (row) => {
    return getDict('shelfFlag', row.shelfFlag)
}

const formatterType = (row) => {
    return getDict('goodType', row.type)
}

const createDetails = async (row) => {
    console.log(row)
    let data = {
        id: row.id,
    }
    const res = await createDetail(data)
    if (res.code === 200) {
        ElMessage({
            message: '操作成功',
            type: 'success',
        })
    }
}
</script>

<style scoped>
.goods {
    height: calc(100vh - 84px);
    overflow: auto;
    padding: 0 20px;
}
.goods .button-list {
    padding: 15px 0;
    text-align: end;
}
</style>