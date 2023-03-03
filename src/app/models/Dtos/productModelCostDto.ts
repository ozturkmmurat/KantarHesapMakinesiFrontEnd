import { ProductModelCostDetailDto } from "./productModelCostDetailDto"

export interface ProductModelCostDto{

    // Product Model Cost Propertyleri
    productModelCostId:number,
    productModelCostShateIronEuroPrice:number,
    productModelCostIProfileEuroPrice:number,
    productModelCostMaterialTlAmount:number,
    productModelCostMaterialEuroAmount:number,
    productModelCostLaborCostPerHour:number,
    productModelCostTotalLaborCost:number,
    productModelCostTotalAmount:number,
    productModelCostOverheadPercentage:number,
    productModelCostGeneralExpenseAmount:number,
    productModelCostOverheadIncluded:number,
    productModelCostElectronicTlAmount:number,
    productModelCostElectronicEuroAmount:number
    productModelCostAccessoriesTlAmount:number,
    productModelCostAccessoriesEuroAmount

    //Model Propertyleri
    modelId:number,
    modelProductionTime:number,

    productModelCostDetailId:number,
    productModelCostDetailInstallationCostId:number,
    productModelCostDetailProductModelCostId:number,
    productModelCostDetailInstallationIncluded:number,
    productModelCostDetailSalesPrice:number,
    productModelCostDetailTurkeySalesPrice:number,
    productModelCostDetailProfitPercentage:number,
    productModelCostDetailProfitPrice:number,
    productModelCostDetailTurkeySalesDiscount:number,
    productModelCostDetailTurkeySalesDiscountPrice:number,
    productModelCostDetailExportFinalDiscount:number,
    productModelCostDetailExportFinalDiscountPrice:number,

    installationCostId:number,
    installationCostLocationId:number,
    installationCostInstallationTlPrice:number,
    installationCostInstallationEuroPrice:number,

    locationId : number,
    locationCityName : string
}