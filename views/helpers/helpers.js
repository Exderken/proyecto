const hbs = require("hbs");
const axios = require("axios");

// https://www.dolarsi.com/api/api.php?type=valoresprincipales
let dolar;
axios
  .get("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
  .then((resultado) => {
    dolar = resultado.data[1].casa.venta;
    dolar = dolar.replace(/,/g, ".");
    dolar = parseFloat(dolar);
    console.log(dolar);
  })
  .catch((err) => {
    console.log(err);
  });

hbs.registerHelper("dolarApeso", (precio) => {
  let totalPesos = dolar * precio;
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(totalPesos);
});

hbs.registerHelper("listado", (texto) => {
  // console.log(texto)
  let arr = texto.split(",");
  // console.log(arr)
  let html = "<ul>";

  for (item of arr) {
    html += `<li>${item}</li>`;
  }

  html += "</ul>";
  return html;
});

hbs.registerHelper("check", (valor) => {
  if (valor == "1") {
    return `<input type="checkbox" name="destacado" value="{{destacado}}" checked>`;
  }
  return `<input type="checkbox" name="destacado" value="{{destacado}}">`;
});
