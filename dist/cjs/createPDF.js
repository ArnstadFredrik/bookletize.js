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
exports.createBookPDF = void 0;
const pdf_lib_1 = require("pdf-lib");
const createBookPDF = (existingPdfBytes, options) => __awaiter(void 0, void 0, void 0, function* () {
    const pdfDoc = yield pdf_lib_1.PDFDocument.load(existingPdfBytes);
    const bookletDoc = yield pdf_lib_1.PDFDocument.create();
    options = options || {};
    const { width, height } = yield pdfDoc.getPages()[0].getSize();
    var pageCount = yield pdfDoc.getPageCount();
    console.log(pageCount, "page count");
    // pad to a multiple of 4
    while (pageCount % 4 != 0) {
        let page = pdfDoc.addPage([width, height]);
        pageCount = yield pdfDoc.getPageCount();
        page.moveTo(width / 2, height / 2);
        page.drawText("Page " + pageCount, {
            size: 7,
            color: (0, pdf_lib_1.rgb)(1, 1, 1)
        });
    }
    console.log(pageCount, "pages padded to multiple of 4");
    const origPages = yield pdfDoc.getPages();
    console.log(origPages);
    var pageNum = 0;
    // iterate through, plucking out 4 pages at a time and inserting into new sheet
    for (var sheet = 0; sheet < pageCount / 4; sheet++) {
        // double width, same height:
        const bookletPage = bookletDoc.addPage([width * 2, height]);
        // this function can be configured in options, and is what fetches the "next" page from the original stack (and removes it)
        let getPage = options.getPage || function getPage(originalPosition, placement, originalPages, _bookletDoc, _bookletPage) {
            return __awaiter(this, void 0, void 0, function* () {
                if (originalPages.length > 0) {
                    var embeddedPage = yield _bookletDoc.embedPage(originalPages.splice(originalPosition, 1)[0]);
                    _bookletPage.drawPage(embeddedPage, placement);
                }
            });
        };
        yield getPage(origPages.length - 1, { x: 0, y: 0 }, origPages, bookletDoc, bookletPage);
        pageNum += 1;
        yield getPage(0, { x: width, y: 0 }, origPages, bookletDoc, bookletPage);
        pageNum += 1;
        const bookletPage2 = bookletDoc.addPage([width * 2, height]);
        yield getPage(0, { x: 0, y: 0 }, origPages, bookletDoc, bookletPage2);
        pageNum += 1;
        yield getPage(origPages.length - 1, { x: width, y: 0 }, origPages, bookletDoc, bookletPage2);
        pageNum += 1;
        console.log('added sheet', sheet);
    }
    console.log('completed assembling sheets');
    //$('.fa-spin').addClass('hidden');
    //  const pdfDataUri = await bookletDoc.saveAsBase64({ dataUri: true });
    //  document.getElementById('pdf').src = pdfDataUri;
    const pdfBytes = yield bookletDoc.save();
    const pdfObject = { booklet: bookletDoc, saved: pdfBytes };
    //var blob = new Blob([pdfBytes], {type: "application/pdf"});
    //var link = window.URL.createObjectURL(blob);
    //PDFObject.embed(link, "#pdf" );
    return pdfObject;
});
exports.createBookPDF = createBookPDF;
