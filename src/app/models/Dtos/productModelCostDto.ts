import { ProductModelCostDetailDto } from "./productModelCostDetailDto"

export interface ProductModelCostDto{

    // Product Model Cost Propertyleri
    productModelCostId:number,
    productModelCostShateIronEuroPrice:number,
    productModelCostIProfileEuroPrice:number,
    productModelCostMaterialTlAmount:number,
    productModelCostMaterialEuroAmount:number,
    productModelCostTotalLaborCostEuro:number,
    productModelCostTotalLaborCostTl:number,
    productModelCostTotalAmount:number,
    productModelCostGeneralExpenseAmount:number,
    productModelCostOverheadIncluded:number,
    productModelCostElectronicTlAmount:number,
    productModelCostElectronicEuroAmount:number,
    productModelCostProfitPercentage:number,
    productModelCostAdditionalProfitPercentage:number

    //Model Propertyleri
    modelId:number,
    modelCostVariableId:number,
    modelProductionTime:number,

    // Cost variable Propertyleri
    laborCostPerHourEuro:number, 
}