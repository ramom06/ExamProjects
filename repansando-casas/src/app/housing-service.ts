import { Injectable } from '@angular/core';
import {HousingLocationInfo} from './housing-location';
import {HousingProvider} from './housing-provider';

@Injectable({
  providedIn: 'root'
})

export class HousingService implements HousingProvider {
  private readonly apiUrl = 'http://localhost:3000/locations';
  private readonly localUrl = '/assets/db.json';

  async getAllHousingLocations(): Promise<HousingLocationInfo[]> {
    try {
      //Infraestructura Externa (API)
      const response = await fetch(this.apiUrl);
      if (!response.ok) throw new Error('API fuera de servicio');
      return await response.json();
    } catch (error) {
      // Activación de datos locales
      console.warn('Activando datos de emergencia desde assets...');
      const fallback = await fetch(this.localUrl);
      const data = await fallback.json();
      return data.locations; // Retorna los datos estáticos
    }
  }

  async getHousingLocationById(id: number): Promise<HousingLocationInfo | undefined> {
    try {
      // Infraestructura Externa (API)
      const response = await fetch(`${this.apiUrl}/${id}`);

      if (!response.ok) {
        throw new Error('Casa no encontrada en la API o servidor caído');
      }

      return await response.json();

    } catch (error) {
      // Datos locales de emergencia
      console.warn(`Fallo al obtener la casa ${id} de la API. Activando fallback local...`);

      const fallback = await fetch(this.localUrl);
      const data = await fallback.json();

      // Buscamos manualmente el ID dentro del array de localizaciones del JSON local
      const locations: HousingLocationInfo[] = data.locations;
      return locations.find(location => location.id === id);
    }
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
  }
}
