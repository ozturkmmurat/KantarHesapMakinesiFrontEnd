export interface ProductModelCostDetailDto{
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

    locationId:number,
    locationCityName:number

}