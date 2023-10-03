<template>
    <div class="login-container">

      <div class="login-body">
        <div style="height: 100%;width: 60%">
          <img src="../assets/1565.png" height="90%" width="90%;" style="margin-left: 50px;margin-top: 30px">
        </div>
        <div style="height: 100%;width: 50%">
         <h1 class="login-title" style="margin-top: 60px">社团管理系统登录</h1>
<!--          <div class="login-title">-->
<!--            用户登录-->
<!--          </div>-->
          <div class="login-form">
            <el-form :model="loginForm" :rules="rules" ref="loginForm">
              <el-form-item prop="userName" style="width: 70%;margin-left: 15%">
                <el-input type="text"
                          v-model="loginForm.userName" suffix-icon="el-icon-user-solid"
                          placeholder="请输入您的账号" ></el-input>
              </el-form-item>
              <el-form-item prop="passWord" style="width: 70%;margin-left: 15%">
                <el-input type="password"
                          v-model="loginForm.passWord" suffix-icon="el-icon-lock"
                          placeholder="请输入您的密码" ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                    style="margin-top: 15px; width: 70%;background-color: #009999;margin-left: 15%"
                    @click="submitForm('loginForm')"
                    type="primary" >用户登录</el-button>
                <el-link style="text-align:right;width: 100%;"
                         @click="showAddWin()" :underline="false" type="info">没有账号，注册一个</el-link>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>


		<el-dialog title="用户注册" width="700px" :modal="false" :visible.sync="showAddFlag">
            <el-form label-width="90px" :model="usersForm">
                <el-row :gutter="15">
                    <el-col :span="12">
                        <el-form-item label="用户账号">
                            <el-input v-model="usersForm.userName"
                                      placeholder="请输入用户账号…" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户密码">
                            <el-input v-model="usersForm.passWord" type="password"
                                      placeholder="请输入用户密码…" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <el-col :span="12">
                        <el-form-item label="用户姓名">
                            <el-input v-model="usersForm.name"
                                      placeholder="请输入用户姓名…" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户年龄">
                            <el-input v-model="usersForm.age"
                                      placeholder="请输入用户年龄…" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <el-col :span="12">
                        <el-form-item label="用户性别">
                            <el-radio-group v-model="usersForm.gender">
                                <el-radio label="男"></el-radio>
                                <el-radio label="女"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话">
                            <el-input v-model="usersForm.phone"
                                      placeholder="请输入联系电话…" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="联系地址">
                    <el-input rows="4" type="textarea" v-model="usersForm.address"
                              placeholder="请输入联系地址…" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showAddFlag = false">取 消</el-button>
                <el-button type="primary" @click="addInfo()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<style>
.login-container {
 background: linear-gradient(69deg,#409EFF,#009999,#009999,#409EFF);
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;

	}
	.login-win {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 550px;
		height: 300px;
		padding: 15px;
		border-radius: 5px;
		background-size: cover;
	}
	.login-body {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #f8f3f3;
    display: flex;
    width: 60%;
    height: 50%;
    }
	.login-title {
		text-align: center;
		font-size: 20px;
		font-weight: bold;
		color: #009999;
		margin-bottom: 35px;

	}
</style>

<script>

	import initMenu from "../utils/menus.js";
	import { login, addUsers } from '../api/index.js'

    export default {
        data(){

            return {
				showAddFlag: false,
				usersForm: {
					id: "",
					userName: "",
					passWord: "",
					name: "",
					gender: "",
					age: "",
					phone: "",
					address: "",
					type: 2,
					status: 1
				},
				loginForm: {
					userName: '',
					passWord: ''
				},
				rules: {
					userName: [{
						required: true,
						message: '用户账号必须输入',
						trigger: 'blur'
					}],
					passWord: [{
						required: true,
						message: '用户密码必须输入',
						trigger: 'blur'
					}],
				}
			}
        },
        methods: {
            showAddWin(){

				this.showAddFlag = true;
			},
            submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						
						login(this.loginForm).then(res => {
							
							this.$store.commit('setToken', res.data);
							sessionStorage.setItem("token", res.data);
							initMenu(this.$router, this.$store);
							this.$router.push('/index');
						});
                        
					} else {
						
						return false;
					}
				});
			},
			addInfo(){

				addUsers(this.usersForm).then(resp =>{

					if(resp.code == 0){

						this.$confirm('注册成功, 立即登陆?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {

							login({userName: this.usersForm.userName, passWord: this.usersForm.passWord}).then(res => {
							
								this.$store.commit('setToken', res.data);
								sessionStorage.setItem("token", res.data);
								initMenu(this.$router, this.$store);
								this.$router.push('/index');
							});
						});						
					}else{

						this.$message({
							message: resp.msg,
							type: 'warning'
						});
					}
				});
			}
        }
    }
</script>