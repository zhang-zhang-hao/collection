<template>
    <div class="user-add">
        <el-row>
            <el-form :model="form" label-width="120px" label-position="left">
                <el-row :gutter="12">
                    <el-col :span="10" class="mr10">
                        <el-form-item label="充值金额">
                            <el-input v-model="form.amount" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="头像">
                            <span>{{form.avatarUrl}}</span>
                        </el-form-item>
                        <el-form-item label="昵称">
                            <el-input v-model="form.balance" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="昵称">
                            <el-input v-model="form.nickname" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="form.password" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="支付密码">
                            <el-input v-model="form.payPassword" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="手机号">
                            <el-input v-model="form.phone" autocomplete="off" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="是否为机器人">

                            <el-select v-model="form.robotFlag">
                                <el-option :label="item.value" :value="item.key" v-for="item in robotFlag" :key="item.key" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="账号状态">

                            <el-select v-model="form.statusFlag">
                                <el-option :label="item.value" :value="item.key" v-for="item in statusFlag" :key="item.key" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="钱包区块链地址">
                            <el-input v-model="form.walletChain" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="登陆时间">
                            <span>{{form.loginTime}}</span>
                        </el-form-item>
                        <el-form-item label="真实姓名">
                            <el-input v-model="form.name" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="身份证">
                            <el-input v-model="form.id_card" autocomplete="off" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-row>
        <div class="button-list">
            <el-button type="primary" @click="confirm">确认</el-button>
            <el-button type="primary" @click="cancel">取消</el-button>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { add } from '@/api/user.js'
import { dicts } from '@/utils/dict'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()

const statusFlag = reactive(dicts.statusFlag)
const robotFlag = reactive(dicts.robotFlag)

const form = reactive({
    addTime: '',
    amount: '',
    avatarUrl: '',
    balance: '',
    id: '',
    nickname: '',
    password: '',
    phone: '',
    robotFlag: '',
    walletChain: '',
    loginTime: '',
    name: '',
    id_card: '',
})

onMounted(() => {})

const cancel = () => {
    router.back()
}

const confirm = async () => {
    let data = form
    const res = await add(data)
    if (res.code === 200) {
        ElMessage({
            message: '新增成功',
            type: 'success',
        })
        router.back()
    }
}
</script>

<style scoped>
.user-add {
}
.user-add .button-list {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 15px 0;
    background-color: #fff;
}
</style>