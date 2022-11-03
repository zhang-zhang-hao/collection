<template>
    <div class="app-container">
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
            </el-col>
        </el-row>

        <!-- 表格数据 -->
        <el-table v-loading="loading" :data="snapshotList" fit>
            <el-table-column label="id" prop="id" />
            <el-table-column label="产品Json" prop="goodsJson" width="200"></el-table-column>
            <el-table-column label="产品id" prop="goodsId" />
            <el-table-column label="类型" prop="type" />
            <el-table-column label="快照时间" prop="snapshotTime" />
            <el-table-column label="是否结束" prop="finishFlag" />
            <el-table-column label="数量" prop="count" />
            <el-table-column label="结束时间" prop="finishTime" />
            <el-table-column label="添加时间" prop="addTime" />
            <el-table-column label="更新时间" prop="updateTime" />
            <el-table-column label="操作" align="center" fixed="right" width="200">
                <template #default="scope">
                    <el-button type="text" icon="Edit">编辑</el-button>
                    <el-button type="text" icon="Delete">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />

        <!-- 添加或修改角色配置对话框 -->
        <el-dialog :title="type === 'add' ? '新增': '编辑'" v-model="open" width="800px" append-to-body>
            <el-form ref="roleRef" :model="form" :rules="rules" label-width="100px" label-position="left">
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="submitForm">确 定</el-button>
                    <el-button @click="cancel">取 消</el-button>
                </div>
            </template>
        </el-dialog>

    </div>
</template>

<script setup >
import { getSnapshotList } from '@/api/snapshot'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { getToken } from '@/utils/auth'
import { computed, nextTick } from '@vue/runtime-core'
import { getDict } from '@/utils/dict'
import { dicts } from '@/utils/dict.js'
const submitForm = async () => {}

const open = ref(false)

const rules = ref({})

const queryParams = ref({
    pageNum: 1,
    pageSize: 20,
})

const total = ref(0)

const getList = () => {}

const snapshotList = ref([])

const getSnapshot = async () => {
    const res = await getSnapshotList()
    if (res.code === 200) {
        snapshotList.value = res.data
    }
}
getSnapshot()

const type = ref('add')

const handleAdd = () => {
    open.value = true
    type.value = 'add'
}

const formatterShelfFlag = (row) => {
    return getDict('shelfFlag', row.shelfFlag)
}

const shelfFlag = reactive(dicts.shelfFlag)
</script>

<style scoped>
</style>
