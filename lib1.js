// lib.js
// http://localhost/pwasd25/index.html?n=1&d=4
const params = new URLSearchParams(window.location.search);
const n = params.get('n');
const d = params.get('d');

class Quickchart {
  constructor(d) {
    this.d = d;
  }

  crearCadunos() {
    let cadunos = "";
    for (var i = 0; i < this.d; i++) {
      cadunos += "1,";
    }
    cadunos = cadunos.slice(0, -1);
    return cadunos;
  }

  generarSrcImg() {
    let url = "https://quickchart.io/chart?cht=p3&chd=t:" + this.crearCadunos() 
              + "&chs=500x250&chl=" + "1/" + this.d;
    return url;
  }
}

// const q = new Quickchart(d); error
let q = new Quickchart(d);
document.getElementById("contenido").innerHTML = '<img src="' + q.generarSrcImg() + '" />';
// '<img src="https://quickchart.io/chart?cht=p3&chd=t:1,1,1,1&chs=500x250&chl=1/4">';
// q.generarSrcImg();
// "<h1>Adios</h1>";
