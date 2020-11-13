"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var module_alias_1 = __importDefault(require("module-alias"));
var global_settings_1 = require("./global.settings");
module_alias_1.default.addAlias('@/src', global_settings_1.PROJECT_PATH);
