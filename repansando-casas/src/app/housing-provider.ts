import {HousingLocationInfo} from './housing-location';

export interface HousingProvider {
  getAllHousingLocations(): Promise<HousingLocationInfo[]>;
  getHousingLocationById(id: number): Promise<HousingLocationInfo | undefined>;
}
