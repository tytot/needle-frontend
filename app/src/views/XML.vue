<template>
  <div id="xml">
    <pre>
        {{cache}}
    </pre>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cache: ""
    };
  },
  methods: {
    formatXML: function(xml, tab) {
      // tab = optional indent value, default is tab (\t)
      let formatted = "",
        indent = "";
      tab = tab || "\t";
      xml.split(/>\s*</).forEach(function(node) {
        if (node.match(/^\/\w/)) indent = indent.substring(tab.length); // decrease indent by one 'tab'
        formatted += indent + "<" + node + ">\r\n";
        if (node.match(/^<?\w[^>]*[^]$/)) indent += tab; // increase indent
      });
      return formatted.substring(1, formatted.length - 3);
    }
  },
  created() {
    this.$http
      .get("http://localhost:3000/providers")
      .then(response => {
        const data = response.data;
        this.cache = `
        <CSD xmlns="urn:ihe:iti:csd:2013" xmlns:csd="urn:ihe:iti:csd:2013">
            <organizationDirectory/>
            <serviceDirectory/>
            <facilityDirectory/>
            <providerDirectory>`;
        for (let contact of data) {
          const csd = `
                <provider entityID="urn:uuid:${contact.uuid}">
                    <demographic>
                    <name>
                        <commonName>${contact.last_name}, ${contact.first_name}</commonName>
                        <forename>${contact.first_name}</forename>
                        <surname>${contact.last_name}</surname>
                    </name>
                    <contactPoint>
                        <codedType code="BP" codingScheme="urn:ihe:iti:csd:2013:contactPoint">${contact.phone}</codedType>
                    </contactPoint>
                    </demographic>
                </provider>`;
          this.cache = this.cache.concat(csd);
        }
        this.cache = this.cache.concat(`
            </providerDirectory>
        </CSD>`);
        this.cache = this.formatXML(this.cache);
      })
      .catch(function(error) {
        console.error(error.response);
      });
  }
};
</script>