export interface ProductModelCostDetail{
    modelId:number,
    accessoryId:number, 
    currencyName:string,
    installationCostLocationId:number,
    accessoryPrice:number,
    installationPrice:number
    installationIncluded:number,
    salesPrice:number,
    profitPrice:number,
    additionalProfitPercentage:number,
    offerPrice:number,
    finalDiscountPrice:number,
    exportState:boolean
}