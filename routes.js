const routes = require("next-routes")();

routes
.add('/projects/new', '/projects/new')
.add('/projects/:address', '/projects/show')
.add('/projects/:address/requests', '/projects/requests/index')
.add('/projects/:address/requests/newrequest', '/projects/requests/newrequest');

module.exports = routes;
