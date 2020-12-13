<template>
    <div class="col-md-3 mt-4">
        <h1 class="text-center">Login</h1>
        <template v-if="!isLogin">
            <form name="loginF" method="POST" v-on:submit.prevent="loginCheck">
                <div class="row">
                    <div class="col-md-10 offset-md-1">
                        User ID:
                        <input
                            type="text"
                            name="id"
                            v-model="tmpUser.uid"
                            ref="uid"
                            placeholder="User ID"
                            class="form-control"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-10 offset-md-1">
                        PASSWORD:
                        <input
                            type="password"
                            name="pwd"
                            v-model="tmpUser.pwd"
                            ref="upwd"
                            placeholder="Password"
                            class="form-control"
                        />
                    </div>
                </div>
                <div class="col-md-10 offset-md-1 p-1">
                    <button class="btn btn-block btn-primary mt-3">
                        Login
                    </button>
                </div>
            </form>
        </template>
        <template v-else>
            <div class="alert alert-primary m-4">
                <h4 class="text-primary">{{ user.uid }}님 로그인 중...</h4>
                <a href="#" v-on:click="logout">로그아웃</a>
            </div>
        </template>
    </div>
</template>

<style scoped></style>

<script>
import axios from "axios";
export default {
    /* npdtmc^2w */
    data() {
        return {
            tmpUser: {
                //로그인을 시도하는 사람의 id,pwd 담을 데이터
                id: "",
                pwd: ""
            },
            user: {
                uid: "",
                uidx: "",
                uname: ""
            },
            isLogin: false
        };
    },
    methods: {
        logout: function(e) {
            //alert('로그아웃 처리 중');
            var url = "http://localhost:5050/logout";
            axios
                .get(url)
                .then(res => {
                    if (res.status == 200) {
                        //서버쪽에서 로그아웃 처리를 마쳤다면 세션 스토리지를 비워주자.
                        sessionStorage.clear();
                        this.isLogin = false;
                    }
                })
                .catch(err => {
                    alert("error: " + err.message);
                    this.isLogin = true;
                });
        },
        loginCheck: function(e) {
            if (!this.tmpUser.uid) {
                alert("id를 입력하세요.");
                this.$refs.uid.focus();
                return;
            }
            if (!this.tmpUser.pwd) {
                alert("비밀번호를 입력하세요.");
                this.$refs.upwd.focus();
                return;
            }
            this.requestLogin(); //서버에 로그인 데이터 전송하는 메소드
        },
        requestLogin() {
            var url = "http://localhosr:5050/login";
            //파라미터 데이터 만들기, id, pwq
            var params = new URLSearchParams();
            //id=a&pwd=b
            params.append("uid", this.tmpUser.uid);
            params.append("pwd", this.tmpUser.pwd);
            //axios import
            //axios.post()
            axios
                .post(url, params)
                .then(res => {
                    //alert(JSON.stringify(res))
                    this.user = res.data.user;
                    if (!this.user.idx) {
                        //회원번호 데이터가 없다면 로그인 인증 실패
                        alert("아이디와 비밀번호를 확인하세요.");
                        this.isLogin = false;
                        this.tmpUser.uid = "";
                        this.tmpUser.pwd = "";
                        this.$refs.uid.focus();
                    } else {
                        //로그인 인증을 받았다면...
                        alert("로그인 성공");
                        sessionStorage.setItem("uname", this.user.name);
                        sessionStorage.setItem("uidx", this.user.idx);
                        sessionStorage.setItem("uid", this.user.uid);

                        this.isLogin = true;
                    }
                    this.isLogin = true;
                })
                .catch(err => {
                    alert("Error: " + err.message);
                });
        }
    }
};
</script>
