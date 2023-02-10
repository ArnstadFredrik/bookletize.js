import { shortEdge } from './shortEdge.js';
import { rotatePDF } from './rotatePDF.js';
const longEdge = async (pdf) => {
    const { booklet } = await shortEdge(pdf);
    const pdfObject = await rotatePDF(booklet);
    return pdfObject;
};
export { longEdge };
