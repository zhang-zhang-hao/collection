<template>
    <div class="goods-detail">
        <div class="button-list">
            <el-row :gutter="12" class="mb10">
                <el-col :span="8">
                    <el-select v-model="form.goods_id" placeholder="商品ID">
                        <el-option :label="item.value" :value="item.key" v-for="item in typeList" :key="item.key" />
                    </el-select>
                </el-col>
                <el-col :span="8">
                    <el-select v-model="form.series_id" placeholder="系列ID">
                        <el-option :label="item.value" :value="item.key" v-for="item in typeList" :key="item.key" />
                    </el-select>
                </el-col>
                <el-col :span="8">
                    <el-input v-model="form.goods_name" autocomplete="off" placeholder="藏品名称" />
                </el-col>
            </el-row>

            <el-row :gutter="12" class="mb10">
                <el-col :span="8">
                    <el-input v-model="form.series_name" autocomplete="off" placeholder="系列名称" />
                </el-col>
                <el-col :span="8">
                    <el-input v-model="form.user_id" autocomplete="off" placeholder="用户ID" />
                </el-col>
            </el-row>

            <el-row class="mb10">
                <el-button type="primary" @click="search">查询</el-button>
                <el-button type="primary" @click="reset">重置</el-button>
            </el-row>

        </div>
        <el-table height="calc(100% - 36px)" :data="tableData.value" style="width: 100%">
            <el-table-column prop="goodsBidPrice" label="买入价格" width="180" />
            <el-table-column prop="goodsId" label="商品ID" width="180" />
            <el-table-column prop="goodsName" label="商品名称" />
            <el-table-column prop="goodsNo" label="商品编号" />
            <el-table-column prop="goodsTotalNum" label="商品总数" />
            <el-table-column prop="goodsType" label="商品类别" />
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="imageUrl" label="商品图片" />
            <el-table-column prop="seriesName" label="系列名称" />
            <el-table-column prop="statusFlag" label="状态" />
        </el-table>
        <el-pagination v-model:currentPage="form.page" v-model:page-size="form.size" :page-sizes="[100, 200, 300, 400]" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />

    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { getDetailedList, createDetail } from '@/api/goods.js'
import { getDict } from '@/utils/dict'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

const tableData = reactive({
    value: [],
})

const total = ref(0)

const getTableList = async () => {
    let data = form
    const res = await getDetailedList(form)
    if (res.code === 200) {
        total.value = res.data.total
        tableData.value = res.data.records
    }
}

const form = reactive({
    goods_id: '',
    series_id: '',
    goods_name: '',
    series_name: '',
    user_id: '',
    page: 1,
    size: 20,
    goods_type: '',
    status_flag: '',
})

const search = () => {
    getTableList()
}

const reset = () => {
    Object.assign(form, {
        goods_id: '',
        series_id: '',
        goods_name: '',
        series_name: '',
        user_id: '',
        page: 1,
        size: 20,
        goods_type: '',
        status_flag: '',
    })
    getTableList()
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
</script>

<style scoped>
.goods-detail {
    height: calc(100vh - 84px);
    overflow: auto;
}
</style>