<style scoped>
input:focus {
    outline: none;
}
.inputBox {
    background: white;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
}
.inputBox input {
    border-style: none;
    font-size: 0.9rem;
}
.addContainer {
    float: right;
    background: linear-gradient(to right, #6478fb, #8763fb);
    display: inline-block;
    width: 3rem;
    border-radius: 0 5px 5px 0;
}
.addBtn {
    color: white;
    vertical-align: middle;
}
.closeModalBtn {
    color: #62acde;
}
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #62acde;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>

<template>
    <div class="inputBox shadow">
        <input
            type="text"
            placeholder="Type what you have to do"
            v-model.trim:value="newTodoItem"
            v-on:keyup.enter="addTodo"
        />
        <span class="addContainer" v-on:click="addTodo">
            <i class="addBtn fas fa-plus" aria-hidden="true"></i>
        </span>

        <div
            class="modal-mask"
            v-on:keyup.esc="$emit('close')"
            v-if="showModal"
            v-on:close="showModal = false"
        >
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <h3 slot="header">경고</h3>
                    </div>

                    <div class="modal-footer">
                        <span slot="footer" v-on:click="showModal = false">
                            할 일을 입력하세요.
                            <i
                                class="closeModalBtn fas fa-times"
                                aria-hidden="true"
                            ></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    /* pdtmc^2w */
    props: [],
    data: function() {
        return {
            newTodoItem: null,
            showModal: false
        };
    },
    methods: {
        addTodo: function() {
            if (
                this.$data.newTodoItem &&
                this.$data.newTodoItem.trim() !== ""
            ) {
                // 부모에게 addTodo 이벤트에 값을 담아서 넘기기
                var newTodoItem = this.$data.newTodoItem.trim();
                this.$emit("addTodo", newTodoItem);

                // input 태그 초기화
                this.$set(this.$data, "newTodoItem", "");
            } else {
                this.$data.showModal = !this.$data.showModal;
            }
        }
    }
};
</script>
