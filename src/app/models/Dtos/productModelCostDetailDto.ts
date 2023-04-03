export interface ProductModelCostDetailDto{
    productModelCostDetailId:number,
    productModelCostDetailInstallationCostId:number,
    productModelCostDetailProductModelCostId:number,
    productModelCostDetailInstallationIncluded:number,
    productModelCostDetailSalesPrice:number,
    productModelCostDetailTurkeySalesPrice:number,
    productModelCostProfitPercentage:number,
    productModelCostDetailProfitPrice:number,

    installationCostId:number,
    installationCostLocationId:number,
    installationCostInstallationTlPrice:number,
    installationCostInstallationEuroPrice:number,

    locationId:number,
    locationCityName:number

}