"use client";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocument } from "pdf-lib";
import { SignatureCanvas } from "./SignatureCanvas";
import DigitalSignatureCanvas from "./DigitalSignatureCanvas";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PDFViewerProps {
  file: File;
  onClose: () => void;
}

function PDFViewer({ file, onClose }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showSignatureCanvas, setShowSignatureCanvas] = useState(false);
  const [DigitalSignature, setDigitalSignature] = useState(false);
  const [signatures, setSignatures] = useState<{ [key: number]: string }>({});

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };
  const handleDigitalSignature = (pageNumber: number) => {
    setDigitalSignature(true);
  };
  const handleAddSignature = (pageNumber: number) => {
    setShowSignatureCanvas(true);
  };

  const handleSaveSignature = async (signature: string) => {
    setSignatures((prev) => ({
      ...prev,
      [currentPage]: signature,
    }));
    setShowSignatureCanvas(false);
  };
  console.log({ file });
  const handleSaveDocument = async () => {
    try {
      const existingPdfBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      // Add signatures to each page
      for (const [pageNumber, signature] of Object.entries(signatures)) {
        const page = pdfDoc.getPage(parseInt(pageNumber) - 1);
        const signatureImage = await pdfDoc.embedPng(signature);

        const { width, height } = page.getSize();
        page.drawImage(signatureImage, {
          x: width / 2 - 100,
          y: height / 4,
          width: 200,
          height: 100,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const filename = prompt("Enter filename", "signed-document.pdf");
      if (!filename) return;
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();

      URL.revokeObjectURL(url);
      onClose();
    } catch (error) {
      console.error("Error saving document:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            Close
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {numPages}
          </span>
        </div>
        <div className="space-x-2">
          <DigitalSignatureCanvas />

          <button
            onClick={() => handleAddSignature(currentPage)}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Add Signature
          </button>
          <button
            onClick={handleSaveDocument}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save Document
          </button>
        </div>
      </div>

      <div className="flex justify-center p-4">
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            pageNumber={currentPage}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>

      <div className="sticky bottom-0 bg-white border-t p-4 flex justify-center space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage <= 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, numPages))}
          disabled={currentPage >= numPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {showSignatureCanvas && (
        <SignatureCanvas
          onSave={handleSaveSignature}
          onClose={() => setShowSignatureCanvas(false)}
        />
      )}
    </div>
  );
}
export default PDFViewer;
