<template>
    <div class="user-detail">
        <el-row>
            <el-form :model="form" label-width="120px" label-position="left">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="添加时间">
                            <span>{{form.addTime}}</span>
                        </el-form-item>
                        <el-form-item label="充值金额">
                            <span>{{form.amount}}</span>
                        </el-form-item>
                        <el-form-item label="头像">
                            <span>{{form.avatarUrl}}</span>
                        </el-form-item>
                        <el-form-item label="余额">
                            <span>{{form.balance}}</span>
                        </el-form-item>
                        <el-form-item label="id">
                            <span>{{form.id}}</span>
                        </el-form-item>
                        <el-form-item label="昵称">
                            <span>{{form.nickname}}</span>
                        </el-form-item>
                        <el-form-item label="密码">
                            <span>{{form.password}}</span>
                        </el-form-item>
                        <el-form-item label="支付密码">
                            <span>{{form.payPassword}}</span>
                        </el-form-item>
                        <el-form-item label="手机号">
                            <span>{{form.phone}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否为机器人">
                            <span>{{form.robotFlag}}</span>
                        </el-form-item>
                        <el-form-item label="账号状态">
                            <span>{{form.statusFlag}}</span>
                        </el-form-item>
                        <el-form-item label="更新时间">
                            <span>{{form.updateTime}}</span>
                        </el-form-item>
                        <el-form-item label="钱包区块链地址">
                            <span>{{form.walletChain}}</span>
                        </el-form-item>
                        <el-form-item label="登陆时间">
                            <span>{{form.loginTime}}</span>
                        </el-form-item>
                        <el-form-item label="真实姓名">
                            <span>{{form.name}}</span>
                        </el-form-item>
                        <el-form-item label="身份证">
                            <span>{{form.id_card}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-row>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { getDetail } from '@/api/user.js'
import { getDict } from '@/utils/dict'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()

const form = reactive({
    value: {
        addTime: '',
        amount: '',
        avatarUrl: '',
        balance: '',
        id: '',
        nickname: '',
        password: '',
        phone: '',
        robotFlag: '',
        statusFlag: '',
        updateTime: '',
        walletChain: '',
        loginTime: '',
        name: '',
        id_card: '',
    },
})

const getDetailData = async () => {
    let id = route.query.id
    let data = {
        id,
    }
    const res = await getDetail(data)

    Object.assign(form, res.data)
}

onMounted(() => {
    getDetailData()
})
</script>

<style scoped>
.user-detail {
}
</style>