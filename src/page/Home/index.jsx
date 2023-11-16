import { useState } from "react";
import generatePdf from "../components/PdfMaker/productTable";
import TextField from "@mui/material/TextField";
import { Component, PlusCircle } from "lucide-react";
import CardPdfViewer from "../components/CardPdf";

function Home() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [productsCsv, setProductsCsv] = useState("");
  const [products, setProducts] = useState([]);
  const [pdfUrl, setPdfUrl] = useState("");
  const [name, setName] = useState("");
  const [colorText, setColorText] = useState("#ffffff");
  const [colorBackground, setColorBackground] = useState("#3355A3");

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

  const handleGeneratePdf = async () => {
    const pdfBlob = await generatePdf(
      products,
      name,
      colorText,
      colorBackground
    );
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfUrl);
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
      <div className="flex flex-row w-full justify-between h-full space-x-8 p-8">
        <div className="flex flex-col space-y-8 p-6 w-full ">
          <div className="w-full flex flex-col space-y-6 p-6 w-full border rounded-md border-gray-200 ">
            <div className="flex flex-row space-x-2">
              <Component />
              <h2 className="text-lg font-semibold  text-gray-500">
                Personalize com base na sua Empresa
              </h2>
            </div>

            <TextField
              className="w-full "
              id="name"
              label="Nome da Empresa"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex flex-row justify-around">
              <div className="flex flex-row space-x-4 items-center">
                <label className="text-md font-medium ">Cor do Cabeçalho</label>
                <input
                  type="color"
                  style={{ backgroundColor: colorText }}
                  className="h-8  w-8"
                  value={colorBackground}
                  onChange={(e) => setColorBackground(e.target.value)}
                />
              </div>
              <div className="flex flex-row space-x-4 items-center">
                <label className="text-md font-medium">Cor do Texto</label>
                <input
                  type="color"
                  style={{ backgroundColor: colorText }}
                  className="h-8  w-8"
                  value={colorText}
                  onChange={(e) => setColorText(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-6 p-6 w-full border rounded-md border-gray-200">
            <div className="flex flex-row space-x-2">
              <PlusCircle />

              <h2 className="text-lg font-semibold  text-gray-500">
                Insira Seus Produtos
              </h2>
            </div>
            {products.length > 0 && (
              <div className=" flex w-full h-14 items-center rounded-md justify-around  bg-blue-200 text-blue-700">
                <div className="flex flex-row space-x-2 items-center">
                  <span className="bg-blue-500 w-6 h-6 flex justify-center items-center  rounded-full text-white">
                    <b>{products.length}</b>
                  </span>
                  <p>Produtos adicionados</p>
                </div>

                <button
                  className="border p-1 px-2 border-red-500 text-red-500 bg-red-100 rounded-lg"
                  onClick={handleRemoveProduct}
                >
                  Remover
                </button>
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
            <button
              className="border p-3 border-blue-500 text-blue-500 bg-white rounded-lg"
              onClick={handleAddProduct}
            >
              Adicionar Produto
            </button>
            <button
              className="border p-3 text-white bg-blue-500 rounded-lg"
              onClick={handleGeneratePdf}
            >
              Gerar PDF
            </button>
          </div>
        </div>
        <div className="w-full p-6 ">
          <CardPdfViewer pdfUrl={pdfUrl} />
        </div>
      </div>
    </>
  );
}

export default Home;
