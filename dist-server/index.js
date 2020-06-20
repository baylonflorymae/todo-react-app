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
})({"config.js":[function(require,module,exports) {
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
},{}],"controller/todoController/getTodo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTodo = void 0;

var _config = _interopRequireDefault(require("../../config"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getTodo = async (req, res) => {
  try {
    const {
      JSONBinBaseURL,
      headers: {
        secretKey
      }
    } = _config.default;
    const result = await _axios.default.get(JSONBinBaseURL, {
      headers: {
        "secret-key": secretKey
      }
    });
    res.send(result.data);
  } catch (error) {
    console.log(error);
  }
};

exports.getTodo = getTodo;
},{"../../config":"config.js"}],"controller/todoController/addTodo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addTodo = void 0;

var _config = _interopRequireDefault(require("../../config"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const addTodo = async (req, res) => {
  try {
    const {
      JSONBinBaseURL,
      headers: {
        secretKey,
        contentType,
        versioning
      }
    } = _config.default;
    await _axios.default.put(JSONBinBaseURL, req.body.items, {
      headers: {
        "secret-key": secretKey,
        "Content-Type": contentType,
        versioning
      }
    });
    res.sendStatus(200); // console.log(result);
    // console.log(req.body);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.addTodo = addTodo;
},{"../../config":"config.js"}],"controller/todoController/updateTodo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTodo = void 0;

var _config = _interopRequireDefault(require("../../config"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const updateTodo = async (req, res) => {
  try {
    const {
      JSONBinBaseURL,
      headers: {
        secretKey,
        contentType,
        versioning
      }
    } = _config.default; // console.log(req.body);

    await _axios.default.put(JSONBinBaseURL, req.body, {
      headers: {
        "secret-key": secretKey,
        "Content-Type": contentType,
        versioning
      }
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

exports.updateTodo = updateTodo;
},{"../../config":"config.js"}],"controller/todoController/deleteTodo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteTodo = void 0;

var _config = _interopRequireDefault(require("../../config"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const deleteTodo = async (req, res) => {
  try {
    const {
      JSONBinBaseURL,
      headers: {
        secretKey,
        contentType,
        versioning
      }
    } = _config.default;
    await _axios.default.put(JSONBinBaseURL, req.body, {
      headers: {
        "secret-key": secretKey,
        "Content-Type": contentType,
        versioning
      }
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteTodo = deleteTodo;
},{"../../config":"config.js"}],"controller/userController/addNewUser.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addNewUser = void 0;

var _config = _interopRequireDefault(require("../../config"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const addNewUser = async (req, res) => {
  try {
    const {
      JSONBinBaseURL,
      headers: {
        secretKey,
        contentType,
        versioning
      }
    } = _config.default; // console.log(req.body);

    await _axios.default.put(JSONBinBaseURL, req.body, {
      headers: {
        "secret-key": secretKey,
        "Content-Type": contentType,
        versioning
      }
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

exports.addNewUser = addNewUser;
},{"../../config":"config.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _getTodo = require("./controller/todoController/getTodo");

var _addTodo = require("./controller/todoController/addTodo");

var _updateTodo = require("./controller/todoController/updateTodo");

var _deleteTodo = require("./controller/todoController/deleteTodo");

var _addNewUser = require("./controller/userController/addNewUser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const port = 5000;
app.use(_express.default.json());
app.use("/static", _express.default.static(_path.default.join(__dirname, "../dist")));
app.get("/todo", _getTodo.getTodo);
app.post("/todo", _addTodo.addTodo);
app.put("/todo", _updateTodo.updateTodo);
app.delete("/todo", _deleteTodo.deleteTodo);
app.post("/user", _addNewUser.addNewUser);
app.get("/*", (req, res) => res.sendFile(_path.default.join(__dirname, "../public/index.html")));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
},{"./controller/todoController/getTodo":"controller/todoController/getTodo.js","./controller/todoController/addTodo":"controller/todoController/addTodo.js","./controller/todoController/updateTodo":"controller/todoController/updateTodo.js","./controller/todoController/deleteTodo":"controller/todoController/deleteTodo.js","./controller/userController/addNewUser":"controller/userController/addNewUser.js"}]},{},["index.js"], null)
//# sourceMappingURL=/index.js.map