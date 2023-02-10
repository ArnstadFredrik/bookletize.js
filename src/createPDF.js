import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

const createBookPDF = async (existingPdfBytes, options) => {
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const bookletDoc = await PDFDocument.create();

  options = options || {};
  const { width, height } = await pdfDoc.getPages()[0].getSize();

  var pageCount = await pdfDoc.getPageCount();
  console.log(pageCount, "page count");

  // pad to a multiple of 4
  while (pageCount % 4 != 0) {
    let page = pdfDoc.addPage([width, height]);
    pageCount = await pdfDoc.getPageCount();
    page.moveTo(width/2, height/2);
    page.drawText("Page " + pageCount, {
      size: 7,
      color: rgb(1,1,1)
    });
  }
  console.log(pageCount, "pages padded to multiple of 4");
  const origPages = await pdfDoc.getPages();
  console.log(origPages);
  var pageNum = 0;

  // iterate through, plucking out 4 pages at a time and inserting into new sheet
  for (var sheet = 0; sheet < pageCount / 4; sheet++) {

    // double width, same height:
    const bookletPage = bookletDoc.addPage([width * 2, height]);

    // this function can be configured in options, and is what fetches the "next" page from the original stack (and removes it)
    let getPage = options.getPage || async function getPage(originalPosition, placement, originalPages, _bookletDoc, _bookletPage) {
      if (originalPages.length > 0) {
        var embeddedPage = await _bookletDoc.embedPage(originalPages.splice(originalPosition,1)[0]);
        _bookletPage.drawPage(embeddedPage, placement);
      }
    }

    await getPage(origPages.length-1,{x: 0, y: 0}, origPages, bookletDoc, bookletPage)
    pageNum += 1;

    await getPage(0,{x: width, y: 0}, origPages, bookletDoc, bookletPage)
    pageNum += 1;

    const bookletPage2 = bookletDoc.addPage([width * 2, height]);

    await getPage(0,{x: 0, y: 0}, origPages, bookletDoc, bookletPage2)
    pageNum += 1;

    await getPage(origPages.length-1,{x: width, y: 0}, origPages, bookletDoc, bookletPage2)
    pageNum += 1;

    console.log('added sheet', sheet);
  }


  console.log('completed assembling sheets');
  //$('.fa-spin').addClass('hidden');
//  const pdfDataUri = await bookletDoc.saveAsBase64({ dataUri: true });
//  document.getElementById('pdf').src = pdfDataUri;
  const pdfBytes = await bookletDoc.save();
  const pdfObject = {booklet: bookletDoc, saved: pdfBytes}
  //var blob = new Blob([pdfBytes], {type: "application/pdf"});
  //var link = window.URL.createObjectURL(blob);

  //PDFObject.embed(link, "#pdf" );
  
  return pdfObject

}

export { createBookPDF }
