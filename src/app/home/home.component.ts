import { Component, OnInit,ViewEncapsulation  } from '@angular/core';
import { DataService } from '../services/data.service';
import { variables } from '../Shared/varibale';
declare let d3: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  optionsbar;
  optionspie;
  optionsline;
  categories=[];
  value_lists=[];
  
  data;
  datapie;
  dataline;
  finalData;
  aggreg = ["sum", "avg", "min", "max"];  
  constructor( private dataService: DataService) { }

   ngOnInit() {         
    this.optionsbar = {
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

    this.optionspie = {
    chart: {
      type: 'pieChart',
      height: 600,
      x: function(d){return d.label;},
      y: function(d){return d.value;},
      showLabels: true,
      duration: 500,
      labelThreshold: 0.01,
      labelSunbeamLayout: true,
      legend: {
        margin: {
          top: 5,
          right: 35,
          bottom: 5,
          left: 0
        }
      }
    }
  }
  this.getDataPie("sum"); 
  this.getDataline("sum");

  }
  valueChange(aggr){      
         this.data = [
           {
              key: "Cumulative Return",
              values: this.finalData[0][aggr]
            }
          ];
  }
  getData(aggr){   
      let items: variables[] = [];   
      items.push({variable_name:"district", type:"string",collection_name:"teacher_final_data",query:"", axis:"x" });
      items.push({variable_name:"salary_basic", type:"int",collection_name:"teacher_final_data",query:"", axis:"y" });
      var curScop = this;      
      this.dataService.getData(items).subscribe(data => {                                  
           curScop.finalData =data;
           curScop.data = [
           {
              key: "Cumulative Return",
              values: data[0].sum
            }
          ];
      });    

  }
  getDataPie(aggr){
      let items: variables[] = [];   
      items.push({variable_name:"district", type:"string",collection_name:"teacher_final_data",query:"", axis:"x" });
      items.push({variable_name:"salary_basic", type:"int",collection_name:"teacher_final_data",query:"", axis:"y" });
      this.dataService.getData(items).subscribe(data => {                           
           this.datapie = data[0].sum      
      });
  }
  getDataline(aggr){
      let items: variables[] = [];   
      items.push({variable_name:"district", type:"string",collection_name:"teacher_final_data",query:"", axis:"x" });
      items.push({variable_name:"salary_basic", type:"int",collection_name:"teacher_final_data",query:"", axis:"y" });
      this.dataService.getData(items).subscribe(data => {                           
           this.dataline = [
           {
              key: "Cumulative Return",
              values:data[0].sum  
            }
          ];         
          this.drawLine(this.dataline);           
      });
  }
  drawLine(data){ 
    let value_list=[];
    let categories=[];
    for (let i = 0; i < data[0].values.length; i++) {
          value_list.push(data[0].values[i].index_col);
          categories.push(data[0].values[i].label);
    }   
    this.optionsline = {
    chart: {
      type: 'lineChart',
      height: 450,
      margin : {
        top: 20,
        right: 20,
        bottom: 100,
        left: 100
      },     
      y: function(d){ return d.value },
      x: function(d){ return d.index_col },
      useInteractiveGuideline: true,
      xAxis: {    
          rotateLabels:-35,
          tickValues: value_list,       
          tickFormat: function(d){
            return categories[d]
          }
      },
      yAxis: {
        axisLabel: 'y',        
        axisLabelDistance: -10,
        tickFormat: function(d){
          return d3.format('.02f')(d);
        },
      },
    }
  }
    
  }
  



}
