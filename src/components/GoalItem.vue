<template>
  <div
    class="shadow bg-white flex flex-col justify-between rounded-lg overflow-hidden text-gray-700"
  >
    <div>
      <div
        class="pl-4 pr-4 pt-4 mb-1 text-right flex justify-between items-center"
      >
        <div class="block text-xs uppercase font-bold leading-tight">
          {{ type }}
        </div>
        <div class="text-sm text-gray-600 block leading-tight font-light">
          {{ goal.progress }} %
        </div>
      </div>

      <div class="px-4 mb-4">
        <div class="truncate leading-tight">{{ goal.name }}</div>
      </div>
    </div>
    <div>
      <div class="h-1 bg-gray-400">
        <div
          class="bg-blue-900 h-1"
          v-bind:style="{ width: goal.progress + '%' }"
        ></div>
      </div>
      <navigation-button
        text="Open"
        class="w-full flex-shrink-0 rounded-tl-none rounded-tr-none"
        v-bind:link="'/g/list/goals/' + goal.id"
      ></navigation-button>
    </div>
  </div>
</template>

<script>
import NavigationButton from "@/components/NavigationButton.vue";

export default {
  name: "GoalItem",
  components: {
    NavigationButton,
  },
  props: {
    goal: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      default: "Goal",
    },
  },
};
</script>
