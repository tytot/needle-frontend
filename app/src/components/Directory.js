const getProviders = () => {
  this.$http
    .post("http://localhost:3000/providers")
    .then(response => {
      return response
    })
    .catch(function (error) {
      console.error(error.response);
    });
}
const columns = [
  {
    label: "Facility",
    field: "facility"
  },
  {
    label: "Last Name",
    field: "last_name"
  },
  {
    label: "First Name",
    field: "first_name"
  },
  {
    label: "Phone #",
    field: "phone"
  },
  {
    label: "Email",
    field: "email"
  }
]
const rows = getProviders()
export { columns, rows }