import { Component, OnInit,ViewEncapsulation  } from '@angular/core';
import { DataService } from '../services/data.service';
declare let d3: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  options;
  data;
  aggreg = ["sum", "avg", "min", "max"];  
  constructor( private dataService: DataService) { }

   ngOnInit() {

    
    this.options = {
      chart: {
        type: 'discreteBarChart',
        height: 450,
        margin : {
          top: 20,
          right: 50,
          bottom: 100,
          left: 100
        },
        x: function(d){return d.label;},
        y: function(d){return d.value;},
        showValues: false,
        valueFormat: function(d){
          return d3.format(',.4f')(d);
        },
        duration: 500,
        xAxis: {
          axisLabel: 'X Axis',
          rotateLabels: '45'
        },
        
        yAxis: {
          axisLabel: 'Y Axis',
          axisLabelDistance: 20          
        } 
      }
    }   
    this.getData("sum");
    // this.data = [
    // {
    //   key: "Cumulative Return",
    //   values: this.data
    // }
    // ];
    // this.data = [
    //   {
    //     key: "Cumulative Return",
    //     values: [
    //       {
    //         "label" : "A" ,
    //         "value" : -29.765957771107
    //       } ,
    //       {
    //         "label" : "B" ,
    //         "value" : 0
    //       } ,
    //       {
    //         "label" : "C" ,
    //         "value" : 32.807804682612
    //       } ,
    //       {
    //         "label" : "D" ,
    //         "value" : 196.45946739256
    //       } ,
    //       {
    //         "label" : "E" ,
    //         "value" : 0.19434030906893
    //       } ,
    //       {
    //         "label" : "F" ,
    //         "value" : -98.079782601442
    //       } ,
    //       {
    //         "label" : "G" ,
    //         "value" : -13.925743130903
    //       } ,
    //       {
    //         "label" : "H" ,
    //         "value" : -5.1387322875705
    //       }
    //     ]
    //   }
    // ];

  }
  valueChange(aggr){
      this.getData(aggr)  
  }
  
  
  getData(aggr){
      this.dataService.getData(aggr).subscribe(data => {                           
           this.data = [
           {
              key: "Cumulative Return",
              values: data
            }
          ];
      });
  }
  



}
