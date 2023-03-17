<template>
  <div class="profile">
    <div class="mb-3">Profile</div>
    <Profile :user="user" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import apiService from "../../../apis/service";
import Profile from "../components/profile-form.vue";

export default {
  components: {
    Profile,
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