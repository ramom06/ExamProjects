import {Product} from './products';
import {Injectable} from '@angular/core';



export interface Provider {
  id:number,
  name:String,
  products:Product[]
}

@Injectable({
  providedIn: 'root' // <-- ESTA LÍNEA ES LA QUE SOLUCIONA EL ERROR
})

export class ProviderService{

  private readonly url = 'assets/providers.json';

  async getProviders(): Promise<Provider[]> {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error('No se pudo cargar el archivo local');

      const data = await response.json();
      return data.providers; // Accedemos a la propiedad "providers" del JSON
    } catch (error) {
      console.error('Error de infraestructura:', error);
      return []; // Devolvemos un array vacío como fallback inicial [cite: 54, 55]
    }
  }
}
