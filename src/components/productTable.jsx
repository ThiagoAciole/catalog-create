/* eslint-disable no-extra-semi */
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Registre as fontes necessárias
function generatePdf(title, url, productArrays) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  function createTable(products) {
    const table = [
      {
        image: [url],
        width: 150,
        height: 150,
        margin: [15, 50, 20, 5],
      },
      {
        text: [title],
        style: {
          color: "#727376",
        },
        fontSize: 9.8,
        bold: true,
        margin: [0, 0, 0, 2],
      },
      {
        table: {
          headerRows: 1,
          widths: ["auto", "auto", "auto"],
          body: [
            [
              {
                text: "CÓD.",
                style: {
                  color: "#F58634",
                },
              },
              {
                text: "DESC.",
                style: {
                  color: "#F58634",
                },
              },
              {
                text: "EMB.",
                style: {
                  color: "#F58634",
                },
              },
            ],
            ...products.map((p) => [p.cod, p.name, p.emb]),
          ],
        },
        layout: {
          hLineWidth: function (i, node) {
            if (i === 0 || i === node.table.headerRows) {
              return 1; // Adiciona uma linha acima e abaixo do primeiro corpo
            }
            return i === node.table.body.length ? 1 : 0; // Adiciona uma linha abaixo do último corpo
          },
          vLineWidth: function (i) {
            return 0;
          },
          hLineColor: function (i) {
            return i === 0 || i === 1 ? "#3355A3" : "white"; // Cor da linha acima e abaixo do primeiro corpo
          },
          paddingLeft: function (i) {
            return i === 0 ? 0 : 8;
          },
          paddingRight: function (i, node) {
            return i === node.table.widths.length - 1 ? 0 : 8;
          },
        },
        width: "*",
        style: {
          fontSize: 7.8,
          margin: [0, 5, 0, 15],
          color: "#727376",
        },
      },
    ];
    return table;
  }

  const docDefinition = {
    pageSize: "A4",
    pageOrientation: "portrait",
    pageMargins: [40, 40, 40, 40],
    content: {
      columns: productArrays.reduce((columns, products) => {
        if (columns.length === 0 || columns[columns.length - 1].length > 2) {
          columns.push([createTable(products)]);
        } else {
          columns[columns.length - 1].push(createTable(products));
        }
        return columns;
      }, []),
      columnGap: 20,
    },
  };

  pdfMake.createPdf(docDefinition).open();
}

export default generatePdf;
