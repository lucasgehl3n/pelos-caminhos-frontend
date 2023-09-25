export default class InstitutionFilter{
    bonded: boolean = false;
    volunteer: boolean = false;
    admin: boolean = false;
    search: string = '';
    sorting: string = '';
    
    toUrl(): string {
        let url = '';

        if (this.bonded) {
            url += 'bonded=true&';
        }

        if (this.volunteer) {
            url += 'volunteer=true&';
        }

        if (this.admin) {
            url += 'admin=true&';
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