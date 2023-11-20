export interface ProductModelCostDetailDto{
    //pmc --> ProductModelCostDetail
    pmcId:number,
    pmcInstallationCostId:number,
    pmcProductModelCostId:number,
    pmcInstallationIncluded:number,
    pmcSalesPrice:number,
    pmcCountrySalesPrice:number,

    //pm --> ProductModeLCost
    pmProfitPercentage:number,
    pmDetailProfitPrice:number,

    installationCostId:number,
    installationCostLocationId:number,
    installationCostInstallationTlPrice:number,
    installationCostInstallationEuroPrice:number,

    locationId:number,
    locationCityName:number

}