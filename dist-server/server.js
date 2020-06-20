// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"config/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  mysql: {
    host: "localhost",
    port: 3306,
    user: "root",
    database: "todo",
    password: "1994"
  }
};
exports.default = _default;
},{}],"model/connection.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Connection = void 0;

var mysql = _interopRequireWildcard(require("mysql"));

var _config = _interopRequireDefault(require("../config/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Connection = mysql.createConnection(_config.default.mysql);
exports.Connection = Connection;
Connection.connect(err => {
  if (err) console.error(err);
});
},{"../config/config":"config/config.js"}],"model/userLogin/userIDValidation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserIDValidation = void 0;

var _connection = require("../connection");

/**
 * This checks the user id in the data base if it
 * has already existed in the records
 * @param {String} user_id - user id of the user
 */
const UserIDValidation = user_id => {
  return new Promise((resolve, reject) => {
    try {
      _connection.Connection.query(`SELECT IF(COUNT(user_login_id) >= 1, TRUE, FALSE) AS is_user_id_exist FROM user_info_tbl WHERE user_login_id = "${user_id}";`, (err, results) => {
        if (err) {
          return reject(err);
        }

        resolve(results);
      });
    } catch (error) {
      return reject(error);
    }
  });
};

exports.UserIDValidation = UserIDValidation;
},{"../connection":"model/connection.js"}],"controller/userLogin/validateUserID.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUserID = void 0;

var _userIDValidation = require("../../model/userLogin/userIDValidation");

const validateUserID = (req, res) => new Promise(async () => {
  try {
    const {
      user_id
    } = req.query;
    const result = await (0, _userIDValidation.UserIDValidation)(user_id);
    res.send({
      is_user_id_exist: Boolean(result[0].is_user_id_exist)
    });
  } catch (error) {
    res.sendStatus(500);
  }
});

exports.validateUserID = validateUserID;
},{"../../model/userLogin/userIDValidation":"model/userLogin/userIDValidation.js"}],"routes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _validateUserID = require("./controller/userLogin/validateUserID");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get("/todo", _validateUserID.validateUserID);
var _default = {
  router
};
exports.default = _default;
},{"./controller/userLogin/validateUserID":"controller/userLogin/validateUserID.js"}],"server.js":[function(require,module,exports) {
"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const port = process.env.PORT || 5000;
app.use(_express.default.json());
app.use("/static", _express.default.static(_path.default.join(__dirname, "../dist")));
app.use("/api", _routes.default.router);
app.get("/*", (req, res) => res.sendFile(_path.default.join(__dirname, "../public/index.html")));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
},{"./routes":"routes.js"}]},{},["server.js"], null)
//# sourceMappingURL=/server.js.map