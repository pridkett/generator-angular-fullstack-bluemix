/**
 * Broadcast updates to client when the model changes
 */

'use strict';

<% if(filters.mongoose) { %>var thing = require('./thing.model');

exports.register = function(socket) {
  thing.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  thing.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
};
<% } %><% if (!filters.mongoose) { %>
exports.register = function(socket) {
};<% } %>

function onSave(socket, doc, cb) {
  socket.emit('thing:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('thing:remove', doc);
}
