/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');<% if (filters.mongoose) { %>
var Thing = require('./thing.model');<% } %><% if (!filters.mongoose) { %>
var things = {
    0: {
        name: 'Development Tools',
        info: 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.',
        id: 0
    },
    1: {
        name: 'Server and Client integration',
        info: 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.',
        id: 1
    },
    2: {
        name: 'Smart Build System',
        info: 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html',
        id: 2
    },
    3: {
        name: 'Modular Structure',
        info: 'Best practice client and server structures allow for more code reusability and maximum scalability',
        id: 3
    },
    4: {
        name: 'Optimized Build',
        info: 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.',
        id: 4
    },
    5: {
        name : 'Deployment Ready',
        info : 'Easily deploy your app to Bluemix, Heroku, or Openshift with the bluemix, heroku, and openshift subgenerators',
        id: 5
    }
}; <% } %>

// Get list of things
exports.index = function(req, res) {<% if (!filters.mongoose) { %>
  res.json(Object.keys(things).map(function (k) { return things[k]; }));<% } %><% if (filters.mongoose) { %>
  Thing.find(function (err, things) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(things);
  });<% } %>
};<% if (!filters.mongoose) { %>
exports.show = function(req, res) {
    var id = ParseInt(req.params.id, 10);
    if (things[id] !== undefined) {
        return res.json(things[id]);
    } else {
        return res.status(404).send('Not Found');
    }
};

exports.create = function(req, res) {
    var thing = req.body;
    if (thing.name && thing.info) {
        thing.id = Math.max.apply(null, Object.keys(things).map(function (d) { return parseInt(d, 10); }));
        things[thing.id] = thing;
        res.status(201).json(thing);
    } else {
        res.status(500);
    }
};

exports.update = function(req, res) {
    var thing = req.body;
    if (things[thing.id] && thing.name && thing.info) {
        things[thing.id] = thing;
        res.status(201).json(thing);
    } else {
        res.status(500);
    }
};

exports.destroy = function(req, res) {
    if (things[req.params.id]) {
        delete things[req.params.id];
        return res.status(204).send('No Content');
    } else {
        return res.status(404).send('Not Found');
    }
};
<% } %><% if (filters.mongoose) { %>

// Get a single thing
exports.show = function(req, res) {
  Thing.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.status(404).send('Not Found'); }
    return res.json(thing);
  });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  Thing.create(req.body, function(err, thing) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(thing);
  });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Thing.findById(req.params.id, function (err, thing) {
    if (err) { return handleError(res, err); }
    if(!thing) { return res.status(404).send('Not Found'); }
    var updated = _.merge(thing, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(thing);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Thing.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.status(404).send('Not Found'); }
    thing.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}<% } %>
