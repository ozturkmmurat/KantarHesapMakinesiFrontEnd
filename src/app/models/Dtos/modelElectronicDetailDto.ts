export interface ModelElectronicDetailDto{
    //Elektronik Propertyleri
    electronicId:number,
    electronicName:string,
    electronicEuroPrice:number,
    electronicTlPrice:number,

    //Model Elektronik Detay Propertyleri
    modelElectronicDetailsId:number,
    modelElectronicDetailsModelId:number,
    modelElectronicDetailsElectronicId:number,
    modelElectronicDetailsElectronicPcs:number,

    modelId: number
}