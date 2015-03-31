'use strict';

// Production specific configuration
// =================================<% if (filters.cfenv) { %>
var cfenv = require('cfenv');
var appEnv = cfenv.appEnv();<% } %>
module.exports = {
  // Server IP
  ip:       <% if (filters.cfenv) { %>appEnv.bind ||
            <% } %>process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     <% if (filters.cfenv) { %>appEnv.port ||
            <% } %> process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,

  // MongoDB connection options
  mongo: {
    uri:    process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
            'mongodb://localhost/<%= _.slugify(appname) %>'
  }
};
