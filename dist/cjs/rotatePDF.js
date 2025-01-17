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
exports.rotatePDF = void 0;
const pdf_lib_1 = require("pdf-lib");
const rotatePDF = (pdfSrc) => __awaiter(void 0, void 0, void 0, function* () {
    const pages = pdfSrc.getPages();
    for (let page in pages) {
        if (page % 2 !== 1)
            pages[page].setRotation((0, pdf_lib_1.degrees)(180));
    }
    const saved = yield pdfSrc.save();
    return { booklet: pdfSrc, saved };
});
exports.rotatePDF = rotatePDF;
