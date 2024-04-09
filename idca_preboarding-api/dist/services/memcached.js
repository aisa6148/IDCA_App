"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setValue = exports.getValue = exports.memcachedSessionStore = exports.MemcachedStore = void 0;
const connect_memcached_1 = __importDefault(require("connect-memcached"));
const express_session_1 = __importDefault(require("express-session"));
const memcached_1 = __importDefault(require("memcached"));
const config_1 = __importDefault(require("../config"));
exports.MemcachedStore = connect_memcached_1.default(express_session_1.default);
const memcachedClient = new memcached_1.default(config_1.default.MEGHACACHE.hosts);
exports.memcachedSessionStore = new exports.MemcachedStore({
    client: memcachedClient,
});
function getValue(key) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            exports.memcachedSessionStore.client.get(key, (error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(reply);
                }
            });
        });
    });
}
exports.getValue = getValue;
function setValue(key, values, lifetime) {
    return __awaiter(this, void 0, void 0, function* () {
        exports.memcachedSessionStore.client.set(key, values, lifetime, (err) => {
            if (err) {
                throw err;
            }
        });
    });
}
exports.setValue = setValue;
//# sourceMappingURL=memcached.js.map