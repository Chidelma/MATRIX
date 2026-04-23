import { Matrix } from '../../lib/matrix'

export default class Sum {

    static async POST(form: { file: string }) {

        return await Matrix.ProcessMatrix(form, matrix => matrix.Sum())
    }
}