export type CompaniesAndDyByPeriod = {
  id: number;
  abbreviation: string;
  dy1: number;
  dy3: number;
  dy5:number;
  r1:number;
  r3:number;
  r5:number;
}

export type CompaniesStock = {
  x: string;
  y: number[];

}

export type CompaniesStockDividends = {
  Dividends: number;
  data: string;

}

export type CompaniesRsi = {
  x: string;
  rsi: number;
  

}
