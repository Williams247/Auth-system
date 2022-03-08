const app = require("express")();

app.use(require("./auth/signup"));
app.use(require("./auth/login"));
app.use(require("./user/profile"));
app.use(require("./auth/forgot-password"));
app.use(require("./auth/verify-password"));
app.use(require("./auth/reset-password"));
app.use(require("../controllers/welcome"));

module.exports = app;
