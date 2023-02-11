export class Country {
    constructor (
        public name: string,
        public capital: string,
        public region: string,
        public subregion: string,
        public flag: string
    ) {}
    
    getName () {
        return this.name;
    }

    getCapital () {
        return this.capital;
    }

    getRegion () {
        return this.region;
    }

    getSubregion () {
        return this.subregion;
    }

    getFlag () {
        return this.flag;
    }

    setName (name: string) {
        this.name = name;
    }

    setCapital (capital: string) {
        this.capital = capital;
    }

    setRegion (region: string) {
        this.region = region;
    }

    setSubregion (subregion: string) {
        this.subregion = subregion;
    }

    setFlag (flag: string) {
        this.flag = flag;
    }

}