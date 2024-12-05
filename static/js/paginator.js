export class Paginator {
    constructor (objects, paginationSize = 3) {
        this.objects = objects;
        this.paginationSize = paginationSize;
        
        this._offset = 0;
        this._limit = this.paginationSize;
    }

    getPage() {
        const page = this.objects.slice(
            this._offset, this._limit + this._offset
        );

        this._offset += this._limit;

        if (this._limit >= this.objects.length) {
            this._limit = this.objects.length - this._offset;
        }
        return page;
    }

    get hasNextPage(){
        return this._offset < this.objects.length;
    }

}
