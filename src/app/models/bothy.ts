
export class Bothy {
    constructor(
        public id: number,
        public bothyId: number,
        public name: string,
        public region: string,
        public gridref: string,
        public description: string,
        public latitude: number,
        public longitude: number,
        public images: string
    ) {}

    within(jGeoBounds) : boolean {
        return false;
    }
}
