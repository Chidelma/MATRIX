import { Matrix } from '../../lib/matrix'

export default class Sum {

    static async POST(form: { file: string }) {

        return await Matrix.processMatrix(form, matrix => matrix.sum())
    }
}