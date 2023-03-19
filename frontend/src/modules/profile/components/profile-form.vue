<template>
  <div class="profile px-4">
    <div class="columns">
      <div class="column is-4">
        <div>
          <i class="far fa-user-graduate" v-if="user.type === 'student'"></i>
          <i
            class="far fa-university"
            v-else-if="user.type === 'university'"
          ></i>
          <i class="far fa-user-tie" v-else></i>
        </div>
        <div class="is-size-5 mt-2 has-text-grey">@{{ user.username }}</div>
      </div>
      <div class="column has-text-left" v-if="form">
        <div class="field">
          <label class="label">
            <span class="is-capitalized mr-1">{{ user.type }}</span>
            name
          </label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="e.g Steve"
              v-model="form.name"
              required
              :class="{ 'is-danger': !form.name.length }"
            />
          </div>
          <p class="help is-danger" v-if="!form.name.length">
            Name is required
          </p>
        </div>

        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input
              class="input"
              type="email"
              placeholder="e.g. alexsmith@gmail.com"
              v-model="form.email"
              :class="{
                'is-danger': !form.name.length || !validateEmail(form.email),
              }"
              required
            />
          </div>
          <p class="help is-danger" v-if="!form.email.length">
            Email is required
          </p>
          <p class="help is-danger" v-else-if="!validateEmail(form.email)">
            Email is invalid
          </p>
        </div>

        <div class="is-flex mt-5">
          <button class="button" @click="resetForm()">Reset</button>
          <button
            class="button is-primary mx-4"
            @click="save()"
            :disabled="!isValid"
          >
            {{ is_edit ? "Update" : "Save" }}
          </button>
        </div>
      </div>
      <div class="column is-2"></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      form: null,
    };
  },
  computed: {
    isValid() {
      return this.form.name.length && this.validateEmail(this.form.email);
    },
    defaultData() {
      return Object.keys(this.user?.profile || {}).length
        ? this.user.profile
        : {
            name: "",
            email: "",
          };
    },
    is_edit() {
      return Object.keys(this.user?.profile || {}).length;
    },
  },
  created() {
    this.form = { ...this.defaultData };
  },
  methods: {
    ...mapActions(["updateUser"]),
    validateEmail(email) {
      if (
        String(email).match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      )
        return true;
      return false;
    },
    resetForm() {
      this.form = { ...this.defaultData };
    },
    async save() {
      this.$root.isLoading = true;
      try {
        this.updateUser({
          uid: this.user.uid,
          profile: this.form,
        });
      } catch (err) {
        console.log("🚀 ~ file: student.vue:116 ~ save ~ err:", err);
      }
      this.$root.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  .far {
    font-size: 100px;
    color: #00d1b2;
    border: 8px solid #00d1b2;
    border-radius: 50%;
    padding: 50px;
  }
}
</style>
<style lang="scss">
.input {
  &::placeholder {
    color: black !important;
    opacity: 0.5 !important; /* Firefox */
  }
}
</style>