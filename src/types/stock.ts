export type Stock = {
  id: number;
  name:string;
  abbreviation: string;
  sector:string;
  dy:number;
  price:number;
}

export type MagicStock = {
  id: number;
  posicao: number;
  name:string;
  abbreviation: string;
  sector:string;
  ev:number;
  roic:number;
}

export type StockPage = {
  content?:Stock[];
  last: boolean;
  totalElements:number;
  totalPages:number;
  size?:number;
  number:number;
  first: boolean;
  numberOfElements?:number;
  empty?: boolean;
}

export type MagicStockPage = {
  content?:MagicStock[];
  last: boolean;
  totalElements:number;
  totalPages:number;
  size?:number;
  number:number;
  first: boolean;
  numberOfElements?:number;
  empty?: boolean;
}
