import { useEffect, useState } from "react";
import generatePdf from "./components/productTable";
import TextField from "@mui/material/TextField";

import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [productsCsv, setProductsCsv] = useState("");
  const [products, setProducts] = useState([]);

  const handleAddProduct = () => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          const imageBase64 = reader.result;
          const newProducts = productsCsv.split("\n").map((line) => {
            const [cod, name, emb] = line.split(",");
            return {
              title,
              url: imageBase64,
              cod,
              name,
              emb,
            };
          });
          setProducts([...products, newProducts]);
        };
        reader.readAsDataURL(blob);
      });
  };

 
  const handleGeneratePdf = () => {
    generatePdf(products);

  };

  const handleRemoveProduct = () => {
    if (products.length > 0) {
      const newProducts = [...products];
      newProducts.pop(); 
      setProducts(newProducts);
      console.log(products);
    }
  };
  return (
    <>
      <div className="flex flex-col space-y-12 p-6">
        <div>
          <h1>Gerador de Catálogo</h1>
        </div>

        {products.length > 0 && (
          <div className=" flex w-full h-14 items-center rounded-md justify-center space-x-8 bg-blue-200 text-blue-700">
            <h2><span className="bg-blue-500 p-1  rounded-md text-white"><b>{products.length}</b></span> Produtos adicionados</h2>
            <button onClick={handleRemoveProduct}>Remove</button>
          </div>
        )}

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
