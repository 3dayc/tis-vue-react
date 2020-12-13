<template>
    <div>
        <div id="join" class="container p-3">
            <h1 class="text-center text-primary">SingUp</h1>
            <form name="frm" action="join.jsp" v-on:submit="join">
                <div class="row">
                    <div class="col-md-8 offset-md-2">
                        Name:
                        <input
                            type="text"
                            name="name"
                            v-model="user.name"
                            placeholder="Name"
                            class="form-control"
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-8 offset-md-2">
                        User ID:
                        <input
                            type="text"
                            name="id"
                            v-model="user.id"
                            v-on:keyup="checkId"
                            class="form-control"
                            placeholder="User ID"
                        />
                        <div class="text-danger" v-show="idErr">
                            아이디는 4자이상 6자 이하 입니다.
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-8 offset-md-2">
                        PASSWORD:
                        <input
                            type="text"
                            name="pwd"
                            v-model="user.pwd"
                            v-on:keyup="checkPwd"
                            placeholder="Password"
                            class="form-control"
                        />
                        <div class="text-danger" v-show="pwdErr">
                            비밀번호는 4자 이상 8자 이내입니다.
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-8 offset-md-2">
                        PASSWORD Confirm :
                        <input
                            type="text"
                            name="pwd2"
                            v-on:keyup="checkRePwd"
                            placeholder="Password Confirm"
                            class="form-control"
                        />
                        <div class="text-danger" v-show="pwdErr2">
                            비밀번호가 일치하지 않아요
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-8 offset-md-2">
                        Email :
                        <input
                            type="text"
                            name="email"
                            v-model="user.email"
                            v-on:change="checkEmail"
                            placeholder="Email"
                            class="form-control"
                        />
                        <div class="text-danger" v-show="emailErr">
                            이메일 형식에 맞지 않아요
                        </div>
                    </div>
                </div>

                <div class="row m-2">
                    <div class="col-md-8 offset-md-2 p-1">
                        <button class="btn btn-block btn-outline-success">
                            Signup
                        </button>
                    </div>
                </div>

                <div v-show="isProcess" class="alert alert-danger m-5">
                    <h3>회원 가입 요청 중...</h3>
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped></style>

<script>
import axios from "axios";
export default {
    /* npdtmc^2w */
    data() {
        return {
            user: {
                name: "",
                id: "",
                pwd: "",
                email: ""
            },
            idErr: false /*아이디 유효성 체크. 4자이상 6자 이내 */,
            pwdErr: false /**비번 유효성 체크. 4자이상 8자 이내 */,
            pwdErr2: false /**비번 재확인 */,
            emailErr: false,
            isProcess: false /**회원가입 처리 진행중일 때 true, 아니면false */,
            idCheckMsg:"" /**아이디 중복 여부 결과 메시지 '아이디 사용가능'... */
        };
    },
    methods: {
        checkId: function(e) {
            let len = this.user.id.length;
            if (len < 4 || len > 6) {
                this.idErr = true;
            } else {
                this.idErr = false;
            }
        },
        checkPwd: function(e){
            let len = this.user.pwd.length;
            this.pwdErr = len < 4 || len > 8 ? true : false;
        },
        checkRePwd : function(e) {
            let pwd2 = e.target.value; //재확인 비번값
            this.pwdErr2 = this.user.pwd != pwd2 ? true : false;
        },
        checkEmail: function(){
            var pattern = /^[\w-_]+(\.[\w]+)*@([a-zA-Z]+\.)+[a-z]{2,3}$/;
            this.emailErr = pattern.test(this.user.email) ? false : true;
        },
        join: function(e) {
            e.preventDefault(); //submit되는 기본 동작을 중지시키자.
            //alert('join');
            if (
                !this.idErr &&
                !this.pwdErr &&
                !this.pwdErr2 &&
                !this.emailErr
            ) {
                //alert('회원 가입 처리 요청 중...');
                this.isProcess = true;
                //사용자가 입력한 값을 서버로 전송하기 위해 파라미터 데이터를 만들자.
                //let params="name="+this.user.name+"&id="+this.user.id+"&pwd=..."
                let params = new URLSearchParams();
                params.append("name", this.user.name);
                params.append("id", this.user.id);
                params.append("pwd", this.user.pwd);
                params.append("email", this.user.email);
                console.log(params);

                let url = "http://localhost:9090/VueServer/userAdd.jsp";
                axios
                    .post(url, params)
                    .then(res => {
                        //alert(JSON.stringify(res));
                        let result = res.data.result;
                        if (result > 0) {
                            alert("회원가입 성공");
                            this.$router.push("/");
                        }
                        this.isProcess = false;
                    })
                    .catch(err => {
                        alert("회원가입 실패: " + err.message);
                        this.isProcess = false;
                    });
            } else {
                alert("입력 값에 오류가 있습니다.");
            }
        }
        /*
                asDF-12@naver.com
                asdf.my@google.com
                asdf_12@daum.net
                asdf12@google.co.kr
                식의 이메일 형식을 체크하는 함수를 작성하여 적용하세요
                */
    }
};
</script>
