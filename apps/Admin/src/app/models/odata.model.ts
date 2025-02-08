export class ODataModel<T>{
    value!: T;
    ["@odata.count"]: number = 0;
}