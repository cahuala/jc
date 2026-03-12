export default interface CaseOfUse<IN,OUT>{
    execute(input:any): Promise<OUT>
}