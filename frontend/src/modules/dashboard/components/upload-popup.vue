<template>
  <div class="upload-popup">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Certificate Details</p>
        <button
          class="card-header-icon"
          aria-label="more options"
          @click="$emit('close')"
        >
          <span class="icon">
            <i class="far fa-times" aria-hidden="true"></i>
          </span>
        </button>
      </header>
      <div class="card-content">
        <div class="content">
          <!-- File input -->
          <div class="file is-centered is-boxed has-name mb-2">
            <label class="file-label">
              <input
                class="file-input"
                type="file"
                name="certificate"
                accept="image/*,.pdf"
                @change="form.file = $event.target.files[0]"
              />
              <span class="file-cta">
                <span class="file-icon"> <i class="far fa-upload"></i> </span>
                <span class="file-label"> Upload the certificate </span>
              </span>
              <span class="is-size-7 mt-2 has-text-centered" v-if="form.file">
                {{ form.file.name }}
              </span>
            </label>
          </div>
          <!-- Name -->
          <div class="field">
            <label class="label is-small"> Name </label>
            <div class="control">
              <input
                v-model="form.name"
                class="input is-small"
                type="text"
                placeholder="Text input"
              />
            </div>
          </div>
          <!-- Description -->
          <div class="field">
            <label class="label is-small"> Description </label>
            <div class="control">
              <textarea
                v-model="form.description"
                class="textarea is-small"
                placeholder="Description about certificate"
              ></textarea>
            </div>
          </div>
          <!-- Issued By -->
          <div class="field">
            <label class="label is-small"> Issued By </label>
            <div class="control">
              <input
                v-model="form.issuedBy"
                class="input is-small"
                type="text"
                placeholder="Ex: Coursera, Udemy, etc.."
              />
            </div>
          </div>
          <!-- Credential Id -->
          <div class="field">
            <label class="label is-small"> Credential Id </label>
            <div class="control">
              <input
                v-model="form.credentialId"
                class="input is-small"
                type="text"
                placeholder="Ex: 1521ae636f71 if not present type none"
              />
            </div>
          </div>
        </div>
      </div>
      <footer class="card-footer py-2 flex is-justify-content-flex-end">
        <div class="buttons mr-5">
          <button class="button is-small" @click="$emit('close')">
            Cancel
          </button>
          <button
            class="button is-small is-link"
            :class="[is_loading ? 'is-loading' : '']"
            :disabled="is_invalid"
            @click="saveCertificate()"
          >
            Save
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import apiService from "../../../apis/service";
import { storage } from "../../../utils/plugins/firebase";

export default {
  data() {
    return {
      form: {
        file: null,
        name: "",
        description: "",
        sharedWith: [],
        userUid: "",
        issuedBy: "",
        credentialId: "",
        url: "",
      },
      is_loading: false,
    };
  },
  computed: {
    ...mapGetters(["user"]),
    is_invalid() {
      return (
        !this.form.file ||
        !this.form.name ||
        !this.form.description ||
        !this.form.issuedBy ||
        !this.form.credentialId
      );
    },
  },
  methods: {
    async saveCertificate() {
      this.$root.isLoading = true;
      try {
        this.form.userUid = this.user.uid;
        this.form.url = await this.uploadFile(this.form.file, {
          uid: this.user.uid,
        });
        this.form.file = {
          createDate: new Date(),
          lastModifiedDate: new Date(),
          name: this.form.file.name,
          size: this.form.file.size,
          type: this.form.file.type,
        };
        const data = await apiService.post("/certificate", this.form);
        this.$emit("addCertificate", data.certificate);
        this.$emit("close");
      } catch (err) {
        console.log(err);
      }
      this.$root.isLoading = false;
    },
    async uploadFile(file, user) {
      const filePath = `users/${user.uid}/attachments/${this.form.file.name}`;

      const storageRef = storage.ref(filePath);

      try {
        const res = await storageRef.put(file);
        const url = await res.ref.getDownloadURL();
        return String(url);
      } catch (err) {
        console.log(err.message);
      }
      return "";
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-popup {
  .card-content {
    height: 400px;
    overflow-y: auto;
    padding: 20px;
  }
  .file-cta {
    width: 436px;
  }
  .buttons {
    .button {
      width: 80px;
    }
  }
  ::placeholder {
    color: black;
    opacity: 0.5; /* Firefox */
  }
}
</style>