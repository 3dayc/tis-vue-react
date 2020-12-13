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
