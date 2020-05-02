<template>
  <div :key="toggle">
    <div v-if="!add" class="d-flex justify-content-center mt-2">
      <b-button variant="light" @click="add=true">Add Provider</b-button>
    </div>
    <div v-if="add">
      <b-container>
        <b-card class="mt-2" title="Add Provider" bg-variant="light">
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
              label-for="add-uuid"
              description="If left blank, one will be generated.">
              <b-form-input
                id="add-uuid"
                v-model="model.uuid"
                :state="validateUUID"
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              ></b-form-input>
              <b-form-invalid-feedback :state="validateUUID">
                Please input a valid UUID.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group id="add-fn-group" label="First Name:" label-for="add-fn">
              <b-form-input
                id="add-fn"
                v-model="model.first_name"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group id="add-ln-group" label="Last Name:" label-for="add-ln">
              <b-form-input
                id="add-ln"
                v-model="model.last_name"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group id="add-facility-group" label="Facility:" label-for="add-facility">
              <b-form-select
                id="add-facility"
                v-model="model.facility"
                :options="facilities"
                required
              ></b-form-select>
            </b-form-group>
            <b-form-group id="add-phone-group" label="Phone Number:" label-for="add-phone">
              <b-form-input
                id="add-phone"
                v-model="model.phone"
                :state="validatePhone"
                required
                placeholder="+XXXXXXXXXXX"
              ></b-form-input>
              <b-form-invalid-feedback :state="validatePhone">
                Please input a valid phone number.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group id="add-email-group" label="Email:" label-for="add-email">
              <b-form-input
                id="add-email"
                v-model="model.email"
                type="email"
              ></b-form-input>
            </b-form-group>
            <b-row class="d-flex justify-content-center">
              <b-button type="submit" variant="success">Submit</b-button>
            </b-row>
            <b-row class="d-flex justify-content-center mt-2">
              <b-button variant="danger" @click="add=false">Cancel</b-button>
            </b-row>
          </b-form>
        </b-card>
      </b-container>
    </div>
  </div>
</template>

<script>
const phone = require("phone");
const validate = require("uuid-validate");
export default {
  data() {
    return {
      toggle: 0,
      add: false,
      model: {
        uuid: "",
        first_name: "",
        last_name: "",
        facility: "",
        email: "",
        phone: ""
      },
      facilities: ['Ellicott City', 'Columbia'],
      showSuccess: false,
      showDanger: false,
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      let url = "http://localhost:3000/add-provider";
      let options = {
        last_name: this.model.last_name,
        first_name: this.model.first_name,
        facility: this.model.facility,
        phone: phone(this.model.phone, "USA")[0]
      };
      if (this.model.uuid != "") options.uuid = this.model.uuid;
      else options.email = this.model.email;
      this.$http
        .post(url, options)
        .then(() => {
          this.model = {
            uuid: "",
            first_name: "",
            last_name: "",
            facility: "",
            email: "",
            phone: ""
          };
          this.showSuccessAlert();
          // this.toggle += 1;
          this.$emit("refresh");
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
      if (this.model.uuid == "" || validate(this.model.uuid)) return true;
      return false;
    },
    validatePhone() {
      if (phone(this.model.phone, "USA").length === 0) return false;
      return true;
    }
  }
};
</script>