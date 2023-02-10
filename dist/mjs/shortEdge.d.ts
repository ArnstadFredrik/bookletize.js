export function shortEdge(pdf: any): Promise<{
    booklet: import("pdf-lib").PDFDocument;
    saved: Uint8Array;
}>;
