export type YearData = {
  year: number;
  population?: number;
  gdp?: number;
  cumulative_luc_co2?: number;
  ghg_excluding_lucf_per_capita?: number;
  ghg_per_capita?: number;
  cement_co2?: number;
  cement_co2_per_capita?: number;
  co2?: number;
};

export type CountryData = {
  iso_code?: string;
  data: YearData[];
};

export type CountriesData = {
  [countryName: string]: CountryData;
};

export type SortField = 'name' | 'iso' | 'population' | null;
export type SortDirection = 'asc' | 'desc';

export type SortConfig = {
  field: SortField;
  direction: SortDirection;
};
