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
Object.defineProperty(exports, "__esModule", { value: true });
exports.longEdge = void 0;
const shortEdge_js_1 = require("./shortEdge.js");
const rotatePDF_js_1 = require("./rotatePDF.js");
const longEdge = (pdf) => __awaiter(void 0, void 0, void 0, function* () {
    const { booklet } = yield (0, shortEdge_js_1.shortEdge)(pdf);
    const pdfObject = yield (0, rotatePDF_js_1.rotatePDF)(booklet);
    return pdfObject;
});
exports.longEdge = longEdge;
