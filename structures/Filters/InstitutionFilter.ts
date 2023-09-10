export default class InstitutionFilter{
    bonded: boolean = false;
    volunteer: boolean = false;
    admin: boolean = false;

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

        return url;
    }
}