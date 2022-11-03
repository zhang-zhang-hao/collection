<template>
    <div class="app-container">
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
            </el-col>
        </el-row>

        <!-- 表格数据 -->
        <el-table v-loading="loading" :data="bannerList" fit>
            <el-table-column label="id" prop="id" />
            <el-table-column label="轮播图" prop="imageUrl">
                <template #default="scope">
                    <img :src="scope.row.imageUrl" alt="" style="width:50px;heigh:50px">
                </template>
            </el-table-column>
            <el-table-column label="富文本" prop="gotoUrl" />
            <el-table-column label="类型" prop="type" />
            <el-table-column label="上架" prop="shelfFlag" :formatter="formatterShelfFlag" />
            <el-table-column label="比重" prop="weight" />
            <el-table-column label="添加时间" prop="addTime" />
            <el-table-column label="更新时间" prop="updateTime" />
            <el-table-column label="操作" align="center" fixed="right" width="200">
                <template #default="scope">
                    <el-button type="text" icon="Edit" @click="editBanner(scope.row)">编辑</el-button>
                    <el-button type="text" icon="Delete" @click="deleteBanner(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />

        <!-- 添加或修改角色配置对话框 -->
        <el-dialog :title="type === 'add' ? '新增': '编辑'" v-model="open" width="500px" append-to-body>
            <el-form ref="roleRef" :model="form" :rules="rules" label-width="100px" label-position="left">
                <el-form-item label="图片" prop="imageUrl">
                    <el-upload class="avatar-uploader" action="http://39.108.66.81:9090/file/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :headers="headers">
                        <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="富文本" prop="gotoUrl">
                    <el-input v-model="form.gotoUrl" type="text" size="size" auto-complete="off" placeholder="富文本">
                    </el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-input v-model="form.type" type="text" size="size" auto-complete="off" placeholder="富文本">
                    </el-input>
                </el-form-item>
                <el-form-item label="上架" prop="shelfFlag">

                    <el-select v-model="form.shelfFlag">
                        <el-option :label="item.value" :value="item.key" v-for="item in shelfFlag" :key="item.key" />
                    </el-select>
                </el-form-item>
                <el-form-item label="比重" prop="weight">
                    <el-input v-model="form.weight" type="text" size="size" auto-complete="off">
                    </el-input>
                </el-form-item>
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
import { getBannerList, delBanner, addBanner } from '@/api/banner'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { getToken } from '@/utils/auth'
import { computed } from '@vue/runtime-core'
import { getDict } from '@/utils/dict'
import { dicts } from '@/utils/dict.js'
const submitForm = async () => {
    let data = form.value
    const res = await addBanner(data)
    console.log(res)
    if (res.code === 200) {
        ElMessage({
            message: '新增成功',
            type: 'success',
        })
        debugger
        open.value = false
        getBanner()
    }
}

const open = ref(false)

const cancel = () => {
    form.value = {
        id: '',
        imageUrl: '',
        gotoUrl: '',
        type: 0,
        shelfFlag: 1,
        weight: null,
    }
    open.value = false
}

const rules = ref({})

const queryParams = ref({
    pageNum: 1,
    pageSize: 20,
})

const total = ref(0)

const getList = () => {}

const bannerList = ref([])

const getBanner = async () => {
    const res = await getBannerList()
    if (res.code === 200) {
        bannerList.value = res.data.banners
    }
}

const type = ref('add')

const form = ref({
    id: '',
    imageUrl: '',
    gotoUrl: '',
    type: 0,
    shelfFlag: 1,
    weight: null,
})

const handleAdd = () => {
    open.value = true
    type.value = 'add'
}

const imageUrl = ref('')

const handleAvatarSuccess = (response) => {
    if (response.code === 200) {
        ElMessage({
            message: '上传成功',
            type: 'success',
        })
        form.value.imageUrl = response.data.image
    }
}

getBanner()

const deleteBanner = async (id) => {
    let data = {
        id,
    }
    const res = await delBanner(data)
    if (res.code === 200) {
        ElMessage({
            message: '操作成功',
            type: 'success',
        })
        getBanner()
    }
}

const headers = ref({
    Authorization: 'Bearer ' + getToken(),
})

const formatterShelfFlag = (row) => {
    return getDict('shelfFlag', row.shelfFlag)
}

const shelfFlag = reactive(dicts.shelfFlag)

const editBanner = (row) => {
    form.value = row
    open.value = true
}
</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>