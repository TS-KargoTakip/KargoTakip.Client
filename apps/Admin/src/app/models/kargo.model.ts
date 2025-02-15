export class KargoModel {
    id: string = "";
    gonderen: KargoKisiModel = new KargoKisiModel();
    gonderenFullName: string = "";
    aliciFullName: string = "";
    alici: KargoKisiModel = new KargoKisiModel();
    teslimAdresi: KargoAdresModel = new KargoAdresModel();
    kargoInformation: KargoBilgiModel = new KargoBilgiModel();
}

export class KargoKisiModel {
    firstName: string = "";
    lastName: string = "";
    tcNumarasi: string = "";
    email: string = "";
    phoneNumber: string = "";
}

export class KargoAdresModel {
    city: string = "";
    town: string = "";
    mahalle: string = "";
    street: string = "";
    fullAddress: string = "";
}

export class KargoBilgiModel {
    kargoTipiValue: number = 1;
    agirlik: number = 1;
}
