import {Product} from './products';

export interface Provider {
  id:number,
  name:String,
  products:Product[]
}
