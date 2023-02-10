import { createBookPDF } from './createPDF.js';
const shortEdge = async (pdf) => {
    const pdfObject = await createBookPDF(pdf);
    return pdfObject;
};
export { shortEdge };
