export interface ModelAccessoryDetailDto{
    // Model Propertyleri
    modelId:number,
    modelMostSizeKg:number,
    //Model Accessory Detail Propertyleri
    modelAccessoryDetailsId:number,
    modelDetailAccessoryDetailsModelId:number,
    modelDetailAccessoryDetailsAccessoryId:number,
    ModelDetailAccessoryPcs:number
    //Product Propertyleri
    producId:number
    //Accesory Propertyleri
    accessoryId:number,
    accessoryName:number,
    accessoryTlPrice:number,
    accessoryEuroPrice:number

    // Accessory Package Propertyleri
    accessoryPackageId:number,
    accessoryPackageName:string

    // Accessory Package Detail Propertyleri
    accessoryPackageDetailId:number,
    accessoryPackageDetailAccessoryPackageId:number,
    accessoryPackageAccessoryId:number
    accessoryPackageAccessoryPcs:number
}