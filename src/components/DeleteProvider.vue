<template>
  <div :key="toggle">
    <div v-if="!drop" class="d-flex justify-content-center mt-2">
      <b-button variant="light" @click="drop=true">Delete Provider</b-button>
    </div>
    <div v-if="drop">
      <b-container>
        <b-card class="my-2" title="Delete Provider" bg-variant="light">
          <b-alert v-model="showSuccess" variant="success" dismissible>
            Success!
          </b-alert>
          <b-alert v-model="showDanger" variant="danger" dismissible>
            An error occurred.
          </b-alert>
          <b-form @submit="handleSubmit">
            <b-form-group
              id="add-uuid-group"
              label="UUID:"
              label-for="add-uuid">
              <b-form-input
                id="add-uuid"
                v-model="model.uuid"
                :state="validateUUID"
                required
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              ></b-form-input>
              <b-form-invalid-feedback :state="validateUUID">
                Please input a valid UUID.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-row class="d-flex justify-content-center">
              <b-button type="submit" variant="success">Submit</b-button>
            </b-row>
            <b-row class="d-flex justify-content-center mt-2">
              <b-button variant="danger" @click="drop=false">Cancel</b-button>
            </b-row>
          </b-form>
        </b-card>
      </b-container>
    </div>
  </div>
</template>

<script>
const validate = require("uuid-validate");
export default {
  data() {
    return {
      toggle: 0,
      drop: false,
      model: {
        uuid: ""
      },
      showSuccess: false,
      showDanger: false,
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      let url = `http://localhost:3000/providers/${this.model.uuid}`;
      this.$http
        .get(url)
        .then(response => {
          if (response.data) {
            url = "http://localhost:3000/remove-provider";
            let options = {
              uuid: this.model.uuid
            };
            this.$http
              .post(url, options)
              .then(() => {
                this.model = {
                  uuid: ""
                };
                this.showSuccessAlert();
                //this.toggle += 1;
                this.$emit("refresh");
              })
              .catch(() => {
                this.showErrorAlert();
              });
          }
          else {
            this.showErrorAlert();
          }
        })
        .catch(() => {
          this.showErrorAlert();
        });
    },
    showSuccessAlert() {
      this.showDanger = false;
      this.showSuccess = true;
    },
    showErrorAlert() {
      this.showDanger = true;
    }
  },
  computed: {
    validateUUID() {
      if (validate(this.model.uuid)) return true;
      return false;
    }
  }
};
</script>