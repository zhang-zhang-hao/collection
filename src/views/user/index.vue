<template>
    <div class="user">
        <div class="button-list">
            <el-button type="primary" @click="showAdd">新增</el-button>
        </div>
        <el-table height="calc(100% - 36px)" :data="tableData.value" style="width: 100%" fit>
            <el-table-column prop="addTime" label="添加时间" width="180" />
            <el-table-column prop="amount" label="充值金额" />
            <el-table-column prop="avatarUrl" label="头像">
                <template #default="scope">
                    <img :src="scope.row.avatarUrl" alt="" style="width:50px;height:50px">
                </template>
            </el-table-column>
            <el-table-column prop="balance" label="余额" />
            <el-table-column prop="id" label="id" />
            <el-table-column prop="nickname" label="昵称" />
            <el-table-column prop="password" label="密码" width="180" />
            <el-table-column prop="payPassword" label="支付密码" width="180" />
            <el-table-column prop="phone" label="手机号" width="180" />
            <el-table-column prop="robotFlag" label="是否为机器人" width="150" />
            <el-table-column prop="statusFlag" label="账号状态" />
            <el-table-column prop="updateTime" label="更新时间" width="180" />
            <el-table-column prop="walletChain" label="钱包区块链地址" width="150" />
            <el-table-column prop="loginTime" label="登陆时间" />
            <el-table-column prop="name" label="真实姓名" />
            <el-table-column prop="id_card" label="身份证" />
            <el-table-column fixed="right" label="操作" width="240">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="toDetail(scope.row.id)">详情</el-button>
                    <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
                    <el-button type="primary" size="small" @click="createWalletChain(scope.row)">生成用户钱包</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:currentPage=" currentPage" v-model:page-size="pageSize" :page-sizes="[100, 200, 300, 400]" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />

        <el-dialog v-model="dialogFormVisible" title="编辑">
            <el-form :model="editForm" label-width="120px" label-position="left">
                <el-form-item label="密码">
                    <el-input v-model="editForm.password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="支付密码">
                    <el-input v-model="editForm.payPassword" autocomplete="off" />
                </el-form-item>
                <el-form-item label="机器人标志">
                    <el-select v-model="editForm.robotFlag">
                        <el-option :label="item.value" :value="item.key" v-for="item in robotFlag" :key="item.key" />
                    </el-select>
                </el-form-item>
                <el-form-item label="账号状态">
                    <el-select v-model="editForm.statusFlag">
                        <el-option :label="item.value" :value="item.key" v-for="item in statusFlag" :key="item.key" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="update">确认</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { getList, updateDetail, getWalletChain } from '@/api/user.js'
import { dicts } from '@/utils/dict'
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

const robotFlag = reactive(dicts.robotFlag)
const statusFlag = reactive(dicts.statusFlag)

const edit = (form) => {
    dialogFormVisible.value = true
    editForm = Object.assign(editForm, form)
}

const editForm = reactive({
    id: '',
    password: '',
    payPassword: '',
    robotFlag: '',
    statusFlag: '',
})

const update = async () => {
    let data = editForm
    const res = await updateDetail(data)
    if (res.code === 200) {
        ElMessage({
            message: '操作成功',
            type: 'success',
        })
        dialogFormVisible.value = false
        getTableList()
    }
}

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

const createWalletChain = async (row) => {
    let data = {
        id: row.id,
    }
    const res = await getWalletChain(data)
    if (res.code === 200) {
        ElMessage({
            message: '操作成功',
            type: 'success',
        })
        getTableList()
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

const toDetail = (id) => {
    router.push({
        path: '/user/detail',
        query: {
            id,
        },
    })
}
</script>

<style scoped>
.user {
    height: calc(100vh - 84px);
    overflow: auto;
}
.user .button-list {
    padding: 15px 0;
    text-align: end;
}
</style>