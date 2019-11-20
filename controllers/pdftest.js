var pdf = require("html-pdf");

module.exports.createPDF = (id, content) => {
  let contenido = `${content}`;
  pdf.create(contenido).toFile(`./public/pdfs/${id}.pdf`, function(err, res) {
    if (err) {
      console.log(err);
      return false;
    } else {
      console.log(res);
      return true;
    }
  });
};
