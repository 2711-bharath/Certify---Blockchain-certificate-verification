<template>
  <component :is="user.type" />
</template>

<script>
import { mapGetters } from "vuex";
import apiService from "../../../apis/service";
import Student from "../components/student.vue";
import University from "../components/university.vue";
import Company from "../components/company.vue";

export default {
  components: {
    Student,
    University,
    Company,
  },
  computed: mapGetters(["user"]),
  methods: {
    async updateProfile(profile) {
      const data = await apiService.patch("/user/update", { profile });
      if (data.result) {
        this.setUser(data.user);
      }
    },
  },
};
</script>