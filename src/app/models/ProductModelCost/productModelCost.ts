export interface ProductModelCost{
    id:number,
    modelId:number,
    currencyName:string,
    shateIronEuroPrice:number,
    iProfileEuroPrice:number
    materialAmount:number,
    totalLaborCost:number,
    totalAmount:number,
    generalExpenseAmount:number,
    overheadIncluded:number,
    electronicAmount:number,
    profitPercentage:number
    additionalProfitPercentage:number
}