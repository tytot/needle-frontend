<template>
  <div :key="toggle">
    <div v-if="!add">
      <button @click="add=true">Add Provider</button>
    </div>
    <div v-if="add">
      <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
      <button @click="add=false">Cancel</button>
    </div>
  </div>
</template>

<script>
const phone = require("phone");
const validate = require("uuid-validate");
export default {
  data() {
    return {
      key: 0,
      add: false,
      model: {
        uuid: "",
        first_name: "",
        last_name: "",
        facility: "EC",
        email: "",
        phone: ""
      },
      schema: {
        groups: [
          {
            legend: "Provider Details",
            fields: [
              {
                type: "input",
                inputType: "text",
                label: "UUID (If left blank, one will be generated.)",
                model: "uuid",
                validator: this.validateUUID
              },
              {
                type: "input",
                inputType: "text",
                label: "First Name",
                model: "first_name",
                featured: true,
                required: true,
                validator: "string"
              },
              {
                type: "input",
                inputType: "text",
                label: "Last Name",
                model: "last_name",
                featured: true,
                required: true,
                validator: "string"
              },
              {
                type: "select",
                label: "Facility",
                model: "facility",
                values: ["EC", "Columbia"],
                required: true
              },
              {
                type: "input",
                inputType: "text",
                label: "Phone Number",
                model: "phone",
                required: true,
                validator: this.validatePhone
              },
              {
                type: "input",
                inputType: "email",
                label: "E-mail (Optional)",
                model: "email",
                validator: "email"
              },
              {
                type: "submit",
                buttonText: "Submit",
                onSubmit: this.handleSubmit,
                validateBeforeSubmit: true
              }
            ]
          }
        ],

        formOptions: {
          fieldIdPrefix: "provider-"
        }
      }
    };
  },
  methods: {
    handleSubmit() {
      let url = "http://localhost:3000/add-provider";
      let options = {
        last_name: this.model.last_name,
        first_name: this.model.first_name,
        facility: this.model.facility,
        phone: phone(this.model.phone, "USA")[0]
      };
      if (this.model.uuid != "") options.uuid = this.model.uuid;
      if (this.model.email == "") this.model.email = "N/A";
      else options.email = this.model.email;
      this.$http
        .post(url, options)
        .then(() => {
          this.model = {
            uuid: "",
            first_name: "",
            last_name: "",
            facility: "EC",
            email: "",
            phone: ""
          };
          this.add = false;
          this.toggle += 1;
          this.$emit("refresh");
        })
        .catch(error => {
          alert(error);
        });
    },
    validateUUID(value) {
      if (this.model.uuid == "" || validate(value)) return [];
      return ["Invalid UUID!"];
    },
    validatePhone(value) {
      if (phone(value, "USA").length === 0) return ["Invalid phone number!"];
      return [];
    }
  }
};
</script>