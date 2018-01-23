<template>
<!-- 前台API文档-http://157.122.54.189:8998/down/show-138.html -->
    <div class="login_content">
        <h3>用户登入</h3>
       <el-form label-position="left" label-width="70px" ref="ruleForm2" :model="formLabelAlign" class="formm" :rules="rules">
            <el-form-item label="账户" prop="username">
                <el-input v-model="formLabelAlign.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="formLabelAlign.password"></el-input>
            </el-form-item>
            <el-form-item class="formm2">
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {

             // 校验账号, 将来配置到下面的validator配置项
            function unameFn(rule, value, callback) {
                if(value == '') {
                    callback(new Error('账号不能为空'))
                }else {
                    callback();
                }
            }

            // 校验密码, 将来配置到下面的validator配置项
            function upwdFn(rule, value, callback) {
                if(value == '') {
                    callback(new Error('密码不能为空'))
                }else {
                    callback();
                }
            }


            return {
                // 效验数据
               formLabelAlign:{
                   username:'',
                   password:''
               },
            //    效验规则，
               rules:{
                   username:[
                       { required: true, message: '请填写账号', trigger: 'blur' },
                        { min: 5, max: 18, message: '账号在5~18位', trigger: 'blur' },
                        { validator: unameFn, trigger: 'blur' } 
                   ],
                   password:[
                        { validator: upwdFn, trigger: 'blur' },
                        { pattern: /^\w{6,18}$/, message: '密码在6~18位', trigger: 'blur' }
                   ]
               }
            }
        },

       
        methods:{
             // 登陆
            login() {
                this.$http.post(this.$api.login, this.formLabelAlign).then(res => {
                    if(res.data.status == 0) {
                        // 使用了路由插件后, 就会拥有该对象
                        let nextPage = this.$route.query.nextPage;
                        this.$router.push({ path: nextPage? nextPage: '/admin' });
                    }else {
                        this.$alert(res.data.message);
                    }
                });
            },

            // 点击事件，函数名，调用函数
            // 判断账户密码的准确性
            submitForm(formName){
                this.$refs[formName].validate(result=>{
                    if(result){
                          this.login();
                    }else{
                         this.$alert('GG了');
                    }
                });
            },
             // 重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped lang="less">
.login_content{
    width: 500px; 
    height: 300px;
    border: 1px solid #fff;
    border-radius: 8px;
    position: relative;
    margin: 0 auto;
    top: 50%;
    transform:translateY(-50%);
    .formm{
        padding: 30px 10px 0 10px;
    }
    .formm2{
        text-align: center;
    }
    h3{
        text-align: center;
        color: gold;
    }
}
</style>