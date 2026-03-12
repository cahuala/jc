export default class MoedaUtil{
    static format(value:number,locale:string='pt-AO', moeda="AOA"):string{
        return Intl.NumberFormat(locale,{
            style:'currency',
            currency:moeda,
            minimumFractionDigits:2,
        }).format(value)
    }
}