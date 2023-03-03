export interface AccessoryPackageDetailDto{
    //Accessory Package Detail Propertyleri
    accessoryPackageDetailId:number,
    accessoryPackageDetailAccessoryPackageId:number,
    accessoryPackageDetailAccessoryId:number,
    accessoryPackageDetailAccessoryPcs:number,
    

    //Accessory Propertyleri
    accessoryId:number,
    accessoryName:string,
    accessoryTlPrice:number,
    accessoryEuroPrice:number
    
    //Accessory Package Propertleri
    accessoryPackageId:number
    accessoryPackageName:string
}