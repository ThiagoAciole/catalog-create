import { useEffect, useState } from "react";
import generatePdf from "./components/productTable";
import TextField from "@mui/material/TextField";

import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [productsCsv, setProductsCsv] = useState("");
  const [products, setProducts] = useState([]); // Object to store products
  
  const handleAddProduct = () => {
    const newProducts = productsCsv.split("\n").map((line) => {
      const [cod, name, emb] = line.split(",");
      return {
        cod,
        name,
        emb,
      };
    });
    setProducts([...products, newProducts]);
  
  };

  const handleGeneratePdf = () => {
    // Fetch the image from the URL and convert it to base64
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          const imageBase64 = reader.result;
          generatePdf(title, imageBase64, products);
        };
        reader.readAsDataURL(blob);
      });
  };

  return (
    <>
      <div className="flex flex-col space-y-12 p-6">
        <div>
          <h1>Gerador de Catálogo</h1>
        </div>
        <TextField
          id="title"
          label="Título"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="url"
          label="URL"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <TextField
          id="products"
          label="Produtos (CSV)"
          multiline
          rows={4}
          variant="outlined"
          value={productsCsv}
          onChange={(e) => setProductsCsv(e.target.value)}
        />
        <button onClick={handleAddProduct}>Adicionar Produto</button>
        <button onClick={handleGeneratePdf}>Gerar PDF</button>
      </div>
    </>
  );
}

export default App;
