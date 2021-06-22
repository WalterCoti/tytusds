import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import * as vis from 'vis';

var edges = new vis.DataSet([]);
var nodes = new vis.DataSet([]);
var options = {
  layout:{
    hierarchical:{
      enabled: true,
      direction: 'LR',
    },
  },
  physics: {
    enabled: false,
  },
}
let listaData = { nodes: nodes,
                edges: edges };
var i = 0;
var l = 1;
@Component({
  selector: 'app-bubblesort',
  templateUrl: './bubblesort.component.html',
  styleUrls: ['./bubblesort.component.css']
})
export class BubblesortComponent implements OnInit {

  @ViewChild('mynetwork', {static: false}) el: ElementRef;
  public network: any;
  constructor() { }
  contenido = "{ valores: \n";



  generador(){
    this.arr.forEach(valor => this.contenido += valor +",\n");
  }

  descargarContenido(){
    this.generador();
    this.contenido += "}";
    console.log(this.contenido)
  }


  ngOnInit(): void {
  }



  ngAfterViewInit(): void {
    var container = this.el.nativeElement;
    this.network = new vis.Network(container, listaData, options);
  }


  code = '';
  arr = [];
  texto = "";
  abrir(eve:any)
  {
    let a =eve.target.files[0]
    let text=""

    if(a){
      let reader=new FileReader()
        reader.onload=ev=>{
        const resultado=ev.target?.result
        text=String(resultado)
        var data = JSON.parse(text);  // se parse para obtener solo los datos
        data.valores.forEach(element => { // se pasa a un arreglo
          this.arr.push(element)
        });
        //this.arr.forEach(el => console.log(el))
        this.burbuja(this.arr);
        //console.log("Ordenado \n")
        //this.arr.forEach(el => console.log(el))
        for (var k=0; k<this.arr.length; k++){
          let valors = this.arr[k]
          console.log(valors)
          nodes.add(
            {id: i, label:String(valors)}
          );
          edges.add(
            {from: i, to: l, length: 20, arrows: 'to'}
          );
          i++;
          l++
        }
        this.code=text.toString();
      }
      reader.readAsText(a)
    }


  }
  data = []
  i=0;
  AddData(value: any){

    this.data.push(value);
    this.i++;

  }
  burbuja(arreglo: any){
    let aux;
    for(let i=0;i<(arreglo.length-1);i++)
        for(let j=0;j<(arreglo.length-i);j++){
            if(arreglo[j]>arreglo[j+1]){
             aux=arreglo[j];
             arreglo[j]=arreglo[j+1];
             arreglo[j+1]=aux;
        }
    }
    return arreglo
  }


}
