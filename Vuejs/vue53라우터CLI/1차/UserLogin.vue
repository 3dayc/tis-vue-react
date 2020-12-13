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
