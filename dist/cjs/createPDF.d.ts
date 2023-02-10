export function createBookPDF(existingPdfBytes: any, options: any): Promise<{
    booklet: PDFDocument;
    saved: Uint8Array;
}>;
import { PDFDocument } from "pdf-lib/cjs/api";
