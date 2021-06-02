import { Component, OnInit } from '@angular/core';
import { BitcoinService } from 'src/app/services/bitcoin.service';
import { Color, Label} from 'ng2-charts';
import { ChartDataSets,ChartOptions } from 'chart.js';
//works with chart.js ^2.9.3

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  constructor( private bitcoinService:BitcoinService) { }
  
  marketPriceData:Array<{date:number,price:number}>=null
  // transactionsData:Array<{date:string,num:number}>=null
  // transactionsY:[number]=null
  // transactionsX:[number]=null
  marketPriceDataX=null
  marketPriceDataY=null
  async ngOnInit() {
    const data1=await this.bitcoinService.getMarketPrice()
    this.marketPriceData=data1.map((coords)=>{
        this.marketPriceDataX= coords.x
        this.marketPriceDataY= coords.y
    })
  }
    
    // const data2=await this.bitcoinService.getConfirmedTransactions()
    
    // this.transactionsData=data2.values.map((coords)=>{
    //   this.transactionsX=coords.x
    //   this.transactionsY= coords.y
    // })
    
    // marketPrice chart:
    public lineChartData: ChartDataSets[]= [
      { data: this.marketPriceDataY, label: 'Market Price' },
    ];
    public lineChartLabels: Label[] = this.marketPriceDataX
    public lineChartOptions= {
      responsive: true,
    };
    public lineChartColors: Color[] = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
    ];
    public lineChartLegend = true;
    public lineChartPlugins = [];
    public lineChartType = 'line';

}
