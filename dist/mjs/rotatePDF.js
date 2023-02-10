import { degrees } from 'pdf-lib';
const rotatePDF = async (pdfSrc) => {
    const pages = pdfSrc.getPages();
    for (let page in pages) {
        if (page % 2 !== 1)
            pages[page].setRotation(degrees(180));
    }
    const saved = await pdfSrc.save();
    return { booklet: pdfSrc, saved };
};
export { rotatePDF };
