<template>
  <backend-box>
    <breadcrumb-navigation>
      <breadcrumb-link text="Settings" link="/u/settings"></breadcrumb-link>
      <breadcrumb-divider></breadcrumb-divider>
      <breadcrumb-link
        text="General"
        link="/u/settings/general-settings"
      ></breadcrumb-link>
    </breadcrumb-navigation>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <general-box v-bind:overflow="false">
        <formulate-form
          v-bind:name="name"
          v-on:submit="submit"
          v-model="formData"
        >
          <formulate-input
            type="checkbox"
            label="Show archived objects"
            name="show_archived_objects"
            id="archived-objects"
          ></formulate-input>
          <formulate-input
            type="select"
            label="Default page"
            name="page_choice"
            id="page-choice"
            v-bind:options="pageOptions"
          ></formulate-input>
          <formulate-input type="submit" value="Save"></formulate-input>
        </formulate-form>
      </general-box>
    </div>
  </backend-box>
</template>

<script>
import BackendBox from "@/components/BackendBox.vue";
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation.vue";
import BreadcrumbLink from "@/components/BreadcrumbLink.vue";
import BreadcrumbDivider from "@/components/BreadcrumbDivider.vue";
import axios from "@/plugins/backendAxios.js";
import GeneralBox from "@/components/GeneralBox.vue";

export default {
  name: "UsersSettingsGeneral",
  mixins: [],
  components: {
    BackendBox,
    BreadcrumbNavigation,
    BreadcrumbLink,
    BreadcrumbDivider,
    GeneralBox,
  },
  data() {
    return {
      user: {},
      userOptions: false,
      name: "generalSettingsForm",
      method: "PUT",
      formData: {},
    };
  },
  computed: {
    pageOptions() {
      if (!this.userOptions) return [];
      let defaultPageOptions = [];
      this.userOptions.actions.PUT.page_choice.choices.forEach((choice) =>
        defaultPageOptions.push({
          id: choice.value,
          value: choice.value,
          label: choice.display_name,
        })
      );
      return defaultPageOptions;
    },
    url() {
      return this.user.url;
    },
  },
  methods: {
    submit: function () {
      this.$store.dispatch("alert/clear");
      axios({ method: this.method, url: this.url, data: this.formData })
        .then((response) => {
          this.$formulate.reset(this.name);
          this.user = response.data;
          this.$store.dispatch("alert/success", "General settings saved.");
        })
        .catch((err) => this.$formulate.handle(err.response.data, this.name));
    },
  },
  mounted() {
    axios
      .get("/u/api/users/")
      .then((response) => (this.user = response.data[0]));
  },
  watch: {
    user: function (newValue) {
      axios
        .options(newValue.url)
        .then((response) => (this.userOptions = response.data));
      this.formData = newValue;
    },
  },
};
</script>
