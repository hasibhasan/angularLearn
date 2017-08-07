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
  optionsbar;
  optionspie;
  optionsline;
  categories=[];
  value_lists=[];
  data;
  datapie;
  dataline;
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
  getDataPie(aggr){
      this.dataService.getData(aggr).subscribe(data => {                           
           this.datapie = data        
      });
  }
  getDataline(aggr){
      this.dataService.getData(aggr).subscribe(data => {                           
           this.dataline = [
           {
              key: "Cumulative Return",
              values: data
            }
          ];         
          this.drawLine(this.dataline);           
      });
  }
  drawLine(data){
     for (var i = 0; i < data[0].values.length; i++) {
                this.value_lists.push(data[0].values[i].id);
                this.categories.push(data[0].values[i].label);
    }
    this.optionsline = {
    chart: {
      type: 'lineChart',
      height: 450,
      margin : {
        top: 20,
        right: 20,
        bottom: 40,
        left: 55
      },     
      y: function(d){ return d.value },
      useInteractiveGuideline: true,
      xAxis: { 
        tickValues:this.value_lists, 
        tickFormat: function(i){
          return this.categories[i];
        },
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
