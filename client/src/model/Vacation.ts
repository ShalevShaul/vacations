export default class Vacation {
    constructor(
        public vacation_id: number,
        public destination: string,
        public description: string,
        public start_time: string,
        public end_time: string,
        public price: number,
        public image: any,
    ) { }

    formatDate(date: string) {
        const d = new Date(date);
        return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`;
    }

    formatStart(): string {
        return this.formatDate(this.start_time);
    }

    formatEnd(): string {
        return this.formatDate(this.end_time);
    }
}