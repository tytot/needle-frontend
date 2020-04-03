<template>
  <div :key="toggle">
    <div v-if="!drop">
      <button @click="drop=true">Delete Provider</button>
    </div>
    <div v-if="drop">
      <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
      <button @click="drop=false">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggle: 0,
      drop: false,
      model: {
        uuid: ""
      },
      schema: {
        groups: [
          {
            legend: "Provider Details",
            fields: [
              {
                type: "input",
                inputType: "text",
                label: "UUID",
                model: "uuid"
              },
              {
                type: "submit",
                buttonText: "Submit",
                onSubmit: this.handleSubmit
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
                alert("Success!");
                this.delete = false;
                this.toggle += 1;
                this.$emit("refresh");
              })
              .catch(error => {
                alert(error);
              });
          }
          else alert("No user was found with that UUID.");
        })
        .catch(() => {
          alert("No user was found with that UUID.");
        });
    }
  }
};
</script>