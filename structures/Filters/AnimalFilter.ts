export default class AnimalFilter{
    bonded: boolean = false;
    cat: boolean = false;
    dog: boolean = false;
    search: string = '';
    sorting: string = '';
    image: File | null = null;
    
    toUrl(): string {
        let url = '';

        if (this.bonded) {
            url += 'bonded=true&';
        }

        if (this.cat) {
            url += 'cat=true&';
        }

        if (this.dog) {
            url += 'dog=true&';
        }

        if (this.search) {
            url +=  `search=${this.search}&`;
        }

        if (this.sorting) {
            url +=  `sorting=${this.sorting}&`;
        }

        return url;
    }
}