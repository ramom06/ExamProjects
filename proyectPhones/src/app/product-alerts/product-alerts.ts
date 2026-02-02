import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Product} from '../products';


@Component({
  selector: 'app-product-alerts',
  templateUrl: './product-alerts.html',
  styleUrl: './product-alerts.css',
})
export class ProductAlerts {

  //Esto pasa información de padre a hijo
  //product es el nombre de la propiedad
  @Input() product: Product | null | undefined;

  //El hijo notifica al padre de que algo paso
  @Output() notify = new EventEmitter();
}
