import { Matrix } from '../../lib/matrix'

export default class Flatten {

    static async POST(form: { file: string }) {

        return await Matrix.ProcessMatrix(form, matrix => matrix.Flatten())
    }
}