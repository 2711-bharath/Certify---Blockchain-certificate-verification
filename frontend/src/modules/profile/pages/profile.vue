<template>
  <div class="profile">
    <div class="mb-3">Profile</div>
    <Profile :user="user" v-if="user.uid" />
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
      try {
        const data = await apiService.patch("/user/update", { profile });
        if (data.result) {
          this.setUser(data.user);
        }
      } catch (err) {
        console.log("🚀 ~ file: profile.vue:27 ~ updateProfile ~ err:", err);
      }
    },
  },
};
</script>