<template>
  <backend-box>
    <breadcrumb-navigation>
      <breadcrumb-link link="/t/list" text="List"></breadcrumb-link>
      <breadcrumb-divider></breadcrumb-divider>
      <breadcrumb-link link="/t/list/never-ending-todos" text="Never-Ending-Todos"></breadcrumb-link>
    </breadcrumb-navigation>
    <todo-table v-bind:todos="todos"></todo-table>
  </backend-box>
</template>

<script>
import BackendBox from "@/components/BackendBox.vue";
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation.vue";
import BreadcrumbLink from "@/components/BreadcrumbLink.vue";
import BreadcrumbDivider from "@/components/BreadcrumbDivider.vue";
import axios from "@/plugins/backendAxios.js";
import TodoTable from "@/components/TodoTable.vue";

export default {
  name: "TodosListNeverEnding",
  components: {
    TodoTable,
    BackendBox,
    BreadcrumbNavigation,
    BreadcrumbLink,
    BreadcrumbDivider,
  },
  data() {
    return {
      todos: [],
    };
  },
  mounted() {
    axios
      .get("/t/api/never-ending-todos/")
      .then((response) => (this.todos = response.data));
  },
};
</script>
