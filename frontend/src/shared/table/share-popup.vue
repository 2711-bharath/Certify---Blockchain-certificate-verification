<template>
  <div class="share-popup">
    <div class="share-popup--header">
      <div class="is-size-6">Add people</div>
      <div class="mt-1" @click="$emit('close')" style="cursor: pointer">
        <i class="far fa-times is-size-6"></i>
      </div>
    </div>
    <div class="tabs is-centered mb-0">
      <ul>
        <li class="is-active">
          <a class="has-text-weight-medium">
            <span class="icon is-small">
              <i class="far fa-user-plus"></i>
            </span>
            Share with
          </a>
        </li>
      </ul>
    </div>
    <div class="field">
      <div class="control has-icons-left">
        <input
          class="input"
          type="text"
          placeholder="Search"
          v-model="search"
        />
        <span class="icon is-small is-left">
          <i class="far fa-search"></i>
        </span>
      </div>
    </div>
    <div class="share-popup--body">
      <div v-for="(value, key) in users" :key="key" style="width: 100%">
        <label
          class="user-field px-4 py-1"
          v-if="
            filter(value) && certificate.userUid !== key && user.uid !== key
          "
        >
          <div>
            <div class="is-size-7 has-text-grey">
              {{ value.name }}
            </div>
            <div class="is-size-6">
              {{ value.email }}
            </div>
          </div>
          <b-checkbox v-model="user_ids" :native-value="key" size="is-small" />
        </label>
      </div>
    </div>
    <div class="share-popup--footer px-4 py-2">
      <button
        class="button is-primary is-outlined"
        :id="copyBtnId"
        @click="copyLinkClipBoard()"
      >
        Copy link
      </button>
      <div>
        <button class="button is-outlined mx-3" @click="$emit('close')">
          Cancel
        </button>
        <button class="button is-link" @click="$emit('share', user_ids)">
          Share
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Clipboard from "clipboard";

export default {
  props: {
    certificate: {
      type: Object,
    },
  },
  data() {
    return {
      user_ids: [],
      search: "",
    };
  },
  created() {
    this.user_ids = this.certificate.sharedWith;
  },
  computed: {
    ...mapGetters(["users", "user"]),
    copyBtnId() {
      return `copyBtn_${Math.random().toString(36).substr(2, 9)}`;
    },
    baseUrl() {
      return window.location.origin;
    },
  },
  methods: {
    filter(val) {
      if (val.name.includes(this.search)) return true;
      if (val.email.includes(this.search)) return true;
      return false;
    },
    copyLinkClipBoard() {
      this.$nextTick(() => {
        const text = `${this.baseUrl}/certificate/${this.certificate.uid}`;
        const clipboard = new Clipboard(`#${this.copyBtnId}`, {
          text: () => text,
        });

        clipboard.on("success", () => {
          this.$toast.open({
            message: `Link copied to clipboard`,
            type: "success",
          });
          clipboard.destroy();
        });

        clipboard.on("error", () => {
          this.$toast.open({
            message: `Failed to copy link copied to clipboard`,
            type: "error",
          });
          clipboard.destroy();
        });

        const copyBtn = document.getElementById(this.copyBtnId);
        clipboard.onClick({ target: copyBtn });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.share-popup {
  width: 480px;
  height: 600px;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  &--header {
    padding: 12px 24px 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &--body {
    height: 410px;
    overflow: auto;
  }
  &--footer {
    display: flex;
    justify-content: space-between;
    align-items: end;
  }
  .user-field {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    &:hover {
      background: rgb(248, 248, 248);
    }
  }
  .input {
    border: none;
    box-shadow: none;
  }
}
</style>
