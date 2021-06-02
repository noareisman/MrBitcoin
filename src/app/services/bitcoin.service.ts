import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
    providedIn: 'root'
  })
  
export class BitcoinService{ 
async getRate(dollars = 1) {
    const rate = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${dollars}&cors=true`);
    return rate.data;
}

async getMarketPrice() {
    try {
        const res = await axios.get(`https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`)
        // const data = res.data.values.map(val => val.y)
        const data = res.data.values
        return data
    }
    catch {
        console.log('Error!')
    }
}

async getConfirmedTransactions() {
    
    try {
        const res = await axios.get(`https://api.blockchain.info/charts/n-transactions?timespan=5months&format=json&cors=true`)
        // const data = res.data.values.map(val => val.y)
        const data = res.data
        return data
    }
    catch {
        console.log('Error!')
    }
}
}
