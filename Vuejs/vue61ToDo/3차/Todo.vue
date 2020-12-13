<style scoped>
body {
    text-align: center;
    background-color: #f6f6f8;
}
input {
    border-style: groove;
    width: 200px;
}
button {
    border-style: groove;
}
.shadow {
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>

<template>
    <div id="app">
        <!-- TodoHeader -->
        <TodoHeader></TodoHeader>

        <!-- TodoInput -->
        <TodoInput v-on:addTodo="addTodo"></TodoInput>

        <!-- TodoList -->
        <TodoList
            v-bind:todoItems="todoItems"
            v-on:doneToggle="doneToggle"
            v-on:removeTodo="removeTodo"
        ></TodoList>

        <!-- TodoFooter -->
        <TodoFooter v-on:clearAll="clearAll"></TodoFooter>
    </div>
</template>

<script>
import TodoHeader from "@/components/todo/TodoHeader.vue";
import TodoInput from "@/components/todo/TodoInput.vue";
import TodoList from "@/components/todo/TodoList.vue";
import TodoFooter from "@/components/todo/TodoFooter.vue";

export default {
    /* pdtmc^2w */
    props: [],
    data: function() {
        return {
            todoItems: [
                { id: 1, todo: "영화보기", done: false },
                { id: 2, todo: "주말 산책", done: true },
                { id: 3, todo: "ES6 학습", done: false },
                { id: 4, todo: "잠실 야구장", done: false }
            ]
        };
    },
    //template: ``,
    methods: {
        addTodo: function(newTodoItem) {
            // create
            if (newTodoItem && newTodoItem.trim() !== "") {
                /* max 를 id 를 찾는방법
                        1. array.reduce() 사용
                        2. array.map()과 Math.max()를 사용하는 방법
                    */

                // 1. array.reduce() 를 사용하여 newId를 구하는 방법
                var maxObj = null;
                if (this.$data.todoItems.length === 0) {
                    maxObj = {
                        id: 0,
                        todo: "",
                        done: false
                    };
                } else {
                    maxObj = this.$data.todoItems.reduce(function(
                        prevItem,
                        nextItem
                    ) {
                        // 최대 id 값을 갖고있는 item을 찾는다.
                        return prevItem.id > nextItem.id ? prevItem : nextItem; //
                    });
                }
                console.log(maxObj);

                var newid = maxObj.id + 1;

                // 2. map()과 Math.max()를 사용하여 newId를 구하는 방법
                var arrIds = this.$data.todoItems.map(function(el) {
                    return el.id;
                });
                newid = Math.max(...arrIds) + 1;
                /*
                    this.$data.todoItems[this.$data.todoItems.length] = {
                       id: newid
                       todo: this.$data.newTodoItem,
                       done: false,
                    };
                    */
                this.$set(this.$data.todoItems, this.$data.todoItems.length, {
                    id: newid,
                    todo: newTodoItem,
                    done: false
                });
            }
        },
        doneToggle: function(id, index) {
            // update
            // object array 에서 찾는 방법
            // 1. array.findIndex()을 사용하는 방법
            // 2. array.filter()을 사용하는 방법
            index = this.$data.todoItems.findIndex(function(item) {
                //return item.id === id;
                if (item.id === id) {
                    return true;
                } else {
                    return false;
                }
            });

            if (index >= 0) {
                //this.$data.todoItems[index].done = !this.$data.todoItems[index].done;
                this.$set(
                    this.$data.todoItems[index],
                    "done",
                    !this.$data.todoItems[index].done
                );
            }
        },
        removeTodo: function(id, index) {
            // delete: ;
            // 참조 타입 변수이면 재할당(=== 깊은 복사) 필요.
            // 방법1: array.splice() 을 사용하는 방법
            // 방법2: array.map() 을 사용하는 방법
            this.$data.todoItems.splice(index, 1);
        },
        clearAll: function() {
            // delete
            //this.$data.todoItems = [];
            this.$set(this.$data, "todoItems", []);
        }
    },
    components: {
        TodoHeader: TodoHeader,
        TodoInput: TodoInput,
        TodoList: TodoList,
        TodoFooter: TodoFooter
    },
    computed: {},
    watch: {}
};
</script>
