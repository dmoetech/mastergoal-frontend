<template>
  <backend-box>
    <breadcrumb-navigation>
      <breadcrumb-link text="Dashboard" link="/t/dashboard"></breadcrumb-link>
    </breadcrumb-navigation>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <scroll-box :style="{ height: toDosMinHeight }">
        <heading-one title="Active todos"></heading-one>
        <div>
          <transition-group
            name="todo"
            tag="div"
            id="to-dos-1"
            class="relative"
          >
            <todo-item
              v-on:changed="toDoChanged"
              v-for="todo in activeToDos"
              v-bind:key="todo.url"
              v-bind:todo="todo"
              class="todo-item"
            ></todo-item>
          </transition-group>
        </div>
      </scroll-box>
      <scroll-box
        :style="{ height: toDosMinHeight }"
      >
      <heading-one title="Todos done"></heading-one>
        <div>
          <transition-group
            name="todo"
            tag="div"
            id="to-dos-2"
            class="relative"
          >
            <todo-item
              v-on:changed="toDoChanged"
              v-for="todo in doneToDos"
              :key="todo.url"
              v-bind:todo="todo"
              class="todo-item"
            ></todo-item>
          </transition-group>
        </div>
      </scroll-box>
      <general-box>
        <add-week-todo-form
          name="addweektodoform"
          v-on:response="created"
        ></add-week-todo-form>
      </general-box>
      <general-box>
        <add-week-todo-form
          name="addweektodoform2"
          v-on:response="created2"
          v-bind:weeks="1"
          label="What is there to be done next week?"
        ></add-week-todo-form>
      </general-box>
    </div>
  </backend-box>
</template>

<script>
import BackendBox from "@/components/BackendBox.vue";
import GeneralBox from "@/components/GeneralBox.vue";
import ScrollBox from "@/components/ScrollBox.vue";
import TodoItem from "@/components/TodoItem.vue";
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation.vue";
import BreadcrumbLink from "@/components/BreadcrumbLink.vue";
import AddWeekTodoForm from "@/components/AddWeekTodoForm.vue";
import axios from "@/plugins/backendAxios.js";
import HeadingOne from "@/components/HeadingOne.vue";

export default {
  name: "TodosDashboard",
  components: {
    HeadingOne,
    BackendBox,
    ScrollBox,
    GeneralBox,
    TodoItem,
    AddWeekTodoForm,
    BreadcrumbLink,
    BreadcrumbNavigation,
  },
  computed: {
    allToDos: function() {
      return this.toDos.concat(this.todayDoneToDos);
    },
    activeToDos: function() {
      return this.allToDos.filter((toDo) => {
        return toDo.status === "ACTIVE";
      });
    },
    doneToDos: function() {
      return this.allToDos.filter((toDo) => {
        return toDo.status === "DONE";
      });
    },
    toDosMinHeight: function() {
      return String(6 * 56 - 8) + "px";
      // return String(this.allToDos.length * 56 - 8) + 'px'
    },
  },
  data: function() {
    return {
      toDos: [],
      todayDoneToDos: [],
      message: "",
      message2: "",
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch: function() {
      axios
        .get("/t/api/todos/main/")
        .then((response) => (this.toDos = response.data));
      axios
        .get("/t/api/todos/done_today/")
        .then((response) => (this.todayDoneToDos = response.data));
    },
    toDoChanged: function(data) {
      let index = this.toDos.findIndex((toDo) => toDo.url === data.url);
      if (index !== -1) {
        this.toDos.splice(index, 1, data);
      } else {
        index = this.todayDoneToDos.findIndex((toDo) => toDo.url === data.url);
        if (index !== -1) {
          this.todayDoneToDos.splice(index, 1, data);
        }
      }
    },
    created: function(data) {
      let message = "Todo '" + data.name + "' created";
      this.$store.dispatch("alert/success", message);
      this.toDos.push(data);
    },
    created2: function(data) {
      let message = "Todo '" + data.name + "' created";
      this.$store.dispatch("alert/success", message);
    },
  },
};
</script>
