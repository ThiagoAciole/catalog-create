/* eslint-disable react/prop-types */
import { BookText } from "lucide-react";

export default function CardPdfViewer({ pdfUrl }) {
  return (
    <div className="border  p-6 rounded-md ">
      <div className="flex flex-row space-x-2">
        <BookText />
        <h2 className="text-lg font-semibold mb-4 text-gray-500">
          Visualizador de PDF
        </h2>
      </div>

      {pdfUrl && (
        <embed
          src={pdfUrl}
          style={{
            width: "100%",
            height: "800px",
            border: "none",
            overflow: "scroll",
          }}
          type="application/pdf"
        />
      )}
    </div>
  );
}
