type matrix = {
    data: number[][]
    size: number
}


export class Matrix {

    private matrix: matrix;

    constructor(records: string[][]) {

        if(records.length === 0) {
            throw new Error('Empty matrix');
        }

        const size = records.length

        for(const row of records) {

            if(row.length !== size) {
                throw new Error(`Matrix must be square ${size} rows and ${row.length} columns`);
            }
        }

        this.matrix = {
            data: [],
            size
        }

        for(let i = 0; i < records.length; i++) {

            this.matrix.data.push([])

            for(let j = 0; j < records[i].length; j++) {
                
                try {

                    const num = Number(records[i][j])

                    this.matrix.data[i].push(num)
                
                } catch(e) {
                    throw new Error(`Invalid integer at position ${i}, ${j}: ${records[i][j]}`);
                }
            }
        }
    }

    String() {

        let sb = ''

        for(let i = 0; i < this.matrix.size; i++) {
            for(let j = 0; j < this.matrix.data[i].length; j++) {
                
                if(j > 0) {

                    sb += ','
                }

                sb += this.matrix.data[i][j]
            }

            if(i < this.matrix.data.length - 1) {
                sb += '\n'
            }
        }

        return sb;
    }

    Invert() {

        const result: matrix = {
            data: [],
            size: this.matrix.size
        }

        for(let i = 0; i < this.matrix.size; i++) {

            result.data.push([])

            for(let j = 0; j < this.matrix.size; j++) {
                
                result.data[i].push(this.matrix.data[j][i])
            }
        }

        return result;
    }

    Flatten() {

        const values: string[] = []

        for(const row of this.matrix.data) {

            for(const value of row) {
                values.push(value.toString())
            }
        }

        return values.join(',')
    }

    Sum() {

        let sum = 0

        for(const row of this.matrix.data) {
            for(const value of row) {
                sum += value
            }
        }

        return sum
    }

    Multiply() {

        let product = 1

        for(const row of this.matrix.data) {
            for(const value of row) {
                product *= value
            }
        }

        return product
    }

    static async ProcessMatrix(form: { file: string }, op: (matrix: Matrix) => any) {


        if(!form.file) {
            throw new Error('No file path provided')
        }

        const data = await Bun.file(form.file).text()

        const rows = data.split('\n')

        const records: string[][] = []

        for(const row of rows) {
            records.push(row.split(','))
        }

        return op(new Matrix(records))
    }
}