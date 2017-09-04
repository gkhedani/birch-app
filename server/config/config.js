var env = process.env.NODE_ENV || "development";
console.log("env *****", env);

if (env === "development" || env === "test") {
  var config = require("./config.json");
  // when you want to use a variable to access a property, you need to use bracket
  var envConfig = config[env];

  // returns all the keys and returns them in an array
  //console.log(Object.keys(envConfig));
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}
