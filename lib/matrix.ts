type MatrixData = {
    data: number[][]
    size: number
}

export class Matrix {
    private matrix: MatrixData

    constructor(records: string[][]) {
        if (records.length === 0) {
            throw new Error('Empty matrix')
        }

        const size = records.length

        for (const row of records) {
            if (row.length !== size) {
                throw new Error(`Matrix must be square ${size} rows and ${row.length} columns`)
            }
        }

        this.matrix = {
            data: [],
            size
        }

        for (let i = 0; i < records.length; i++) {
            this.matrix.data.push([])

            for (let j = 0; j < records[i].length; j++) {
                const num = Number(records[i][j])
                if (isNaN(num)) {
                    throw new Error(`Invalid integer at position ${i}, ${j}: ${records[i][j]}`)
                }
                this.matrix.data[i].push(num)
            }
        }
    }

    toString(): string {
        const rows: string[] = []
        for (let i = 0; i < this.matrix.size; i++) {
            rows.push(this.matrix.data[i].join(','))
        }
        return rows.join('\n')
    }

    invert(): MatrixData {
        const result: MatrixData = {
            data: [],
            size: this.matrix.size
        }

        for (let i = 0; i < this.matrix.size; i++) {
            result.data.push([])
            for (let j = 0; j < this.matrix.size; j++) {
                result.data[i].push(this.matrix.data[j][i])
            }
        }

        return result
    }

    flatten(): string {
        const values: string[] = []
        for (const row of this.matrix.data) {
            for (const value of row) {
                values.push(value.toString())
            }
        }
        return values.join(',')
    }

    sum(): number {
        let sum = 0
        for (const row of this.matrix.data) {
            for (const value of row) {
                sum += value
            }
        }
        return sum
    }

    multiply(): number {
        let product = 1
        for (const row of this.matrix.data) {
            for (const value of row) {
                product *= value
            }
        }
        return product
    }

    static async processMatrix(form: { file: string }, op: (matrix: Matrix) => unknown): Promise<unknown> {
        if (!form.file) {
            throw new Error('No file path provided')
        }

        const data = await Bun.file(form.file).text()
        const rows = data.split('\n')
        const records: string[][] = rows.map(row => row.split(','))

        return op(new Matrix(records))
    }
}
