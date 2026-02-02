import {Component, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'  // ← ESTO ES CRÍTICO
})

export class WeatherService {
  private readonly apiKey = '312a4a005b96419aa4f121837260801';

  async getWeather(lat: number, lon: number): Promise<any> {
    const url = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${lat},${lon}&lang=es`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Weather API inaccesible');
      }
      return await response.json();
    } catch (error) {
      console.warn('Error obteniendo datos del clima:', error);
      // Datos por defecto si falla
      return {
        location: { name: 'Desconocido' },
        current: {
          temp_c: 0,
          condition: { text: 'No disponible', icon: '' },
          humidity: 0,
          feelslike_c: 0
        }
      };
    }
  }
}
