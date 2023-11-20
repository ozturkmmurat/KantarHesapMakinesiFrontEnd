import { ProductModelCostDetailDto } from "./productModelCostDetailDto"

export interface ProductModelCostDto{

    // Product Model Cost Propertyleri
    currencyName?:string,
    productModelCostId?:number,
    shateIronPrice?:number,
    iProfilePrice?:number,
    materialAmount?:number,
    totalLaborCost?:number,
    totalAmount?:number,
    generalExpenseAmount?:number,
    overheadIncluded?:number,
    electronicAmount?:number,
    profitPercentage:number,
    additionalProfitPercentage:number

    //Model Propertyleri
    modelId:number,
    modelCostVariableId?:number,
    modelProductionTime?:number,

    // Cost variable Propertyleri
    laborCostPerHourEuro?:number, 
}