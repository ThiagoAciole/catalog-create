/* eslint-disable no-unused-vars */
/* eslint-disable no-extra-semi */
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

function generatePdf(data) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  function createTable(products) {
    const table = [
      {
        image: products[0].url,
        width: 150,
        margin: [15, 20, 30, 5],
      },
      {
        text: products[0].title,
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
          keepWithHeaderRows: 1,
         
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
            return i === node.table.body.length + node.table.headerRows ? 1 : 0; // Adiciona uma linha abaixo do último corpo
          },
          vLineWidth: function (i) {
            return 0;
          },
          hLineColor: function (i) {
            return i === 0 || i === 1 ? "#3355A3" : "white"; // Cor da linha acima e abaixo do primeiro corpo
          },
          fillColor: function (i, node) {
            return i >= node.table.headerRows &&
              (i - node.table.headerRows) % 2 === 0
              ? "#EBECEC"
              : null; // Cor do fundo zebrado a partir do segundo corpo
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
          margin: [0, 10, 0, 10],
          color: "#727376",
        },
        
      },
      
    ];
    return table;
  }


  const docDefinition = {
    pageSize: "A4",
    content: [],
    
  };
  
  let currentColumns = [];
  let currentColumn = [];
  
  data.forEach((products, index) => {
    const table = createTable(products);
  
    if (currentColumn.length === 2) {
      currentColumns.push([currentColumn]);
      currentColumn = [];
    }
    currentColumn.push(table);
    if (index === data.length - 1) {
      currentColumns.push([currentColumn]);
    }
  });
  
  // Agrupe as colunas em páginas
  const maxColumnsPerPage = 2; // Define o número máximo de colunas por página
  let pageColumns = [];
  
  currentColumns.forEach((columns) => {
    pageColumns.push(columns);
  
    if (pageColumns.length === maxColumnsPerPage) {
      docDefinition.content.push({
        columns: pageColumns,
        columnGap: 10,
        pageBreak: 'after',
        margin: [10, 10, 10, 10],
     
      });
      
      pageColumns = [];
    }
  });
  
  // Adicione as colunas restantes à última página, se houver alguma
  if (pageColumns.length > 0) {
    docDefinition.content.push({
      columns: pageColumns,
      columnGap: 20,
    });
  }



/*
  if (pageColumns.length > 0 ) {
    docDefinition.content.push({
      columns: pageColumns,
      columnGap: 20,
      
    });
  }
*/
  pdfMake.createPdf(docDefinition).open();
}

export default generatePdf;
