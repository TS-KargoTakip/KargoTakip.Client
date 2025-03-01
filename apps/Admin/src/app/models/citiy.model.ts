export interface CityModel{
    il_adi: string;
    plaka_kodu: string;
    ilceler: TownModel[];
}

export interface TownModel{
    ilce_adi: string;
    ilce_kodu: string;
}