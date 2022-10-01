<template>
    <div class="good-add">
        <el-row>
            <el-col :span="12">
                <el-form :model="form" label-width="120px" label-position="left">
                    <el-form-item label="名称">
                        <el-input v-model="form.name" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="藏品类型">
                        <el-select v-model="form.type">
                            <el-option :label="item.value" :value="item.key" v-for="item in typeList" :key="item.key" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="系列ID">
                        <el-input-number :controls="false" v-model="form.seriesId" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="系列名称">
                        <el-input v-model="form.seriesName" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="发行人">
                        <el-input v-model="form.issuer" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="发行价格">
                        <el-input v-model="form.price" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="发行数量">
                        <el-input-number :controls="false" v-model="form.issueQuantity" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="限购数量">
                        <el-input-number :controls="false" v-model="form.limitedQuantity" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="售卖数量">
                        <el-input-number :controls="false" v-model="form.salesQuantity" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="上架状态">
                        <el-select v-model="form.shelfFlag">
                            <el-option :label="item.value" :value="item.key" v-for="item in shelfFlag" :key="item.key" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="销售开启时间">
                        <el-date-picker v-model="form.salesTimeStart" type="date" placeholder="销售开启时间" :size="size" />
                    </el-form-item>
                    <el-form-item label="销售结束时间">
                        <el-date-picker v-model="form.salesTimeEnd" type="date" placeholder="销售结束时间" :size="size" />
                    </el-form-item>

                </el-form>
            </el-col>
        </el-row>
        <div class="button-list">
            <el-button type="primary" @click="confirm">确认</el-button>
            <el-button type="primary" @click="cancel">取消</el-button>
        </div>
    </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { dicts } from '@/utils/dict.js'
import { useRouter } from 'vue-router'
import { add } from '@/api/goods.js'
import { ElMessage } from 'element-plus'

const router = useRouter()

defineProps({
    dialogFormVisible: {
        type: Boolean,
        default: false,
    },
})

const form = reactive({
    imageUrl: '123',
    id: '',
    name: '',
    type: 0,
    seriesId: undefined,
    seriesName: '',
    issuer: '',
    price: undefined,
    issueQuantity: undefined,
    limitedQuantity: undefined,
    salesQuantity: undefined,
    shelfFlag: 1,
    salesTimeStart: '',
    salesTimeEnd: '',
})

const typeList = reactive(dicts.goodType)
const shelfFlag = reactive(dicts.shelfFlag)

const confirm = async () => {
    console.log(form)
    const res = await add(form)
    if (res.code === 200) {
        ElMessage({
            message: form.id ? '编辑成功' : '新增成功',
            type: 'success',
        })
        router.back()
    }
}

const cancel = () => {
    router.back()
}
</script>

<style scoped>
.good-add {
    padding: 20px 20px 60px;
}
.button-list {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 15px 0;
    background-color: #fff;
}
</style>