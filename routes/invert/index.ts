import { Matrix } from '../../lib/matrix'

export default class Invert {

    static async POST(form: { file: string }) {

        return await Matrix.ProcessMatrix(form, matrix => matrix.Invert())
    }
}