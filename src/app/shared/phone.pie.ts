import {  Pipe,PipeTransform} from "@angular/core";

@Pipe({
  name: "phone"
})

export class PhonePie implements PipeTransform {
  transform(val: string) {
    if (!val) return "";
    if (val.length == 11) {
      return val.replace(/(\d{3})(\d{4})(\d{4})/,(m:string,m1:any, m2:any,m3:any):string =>{
        return [m1, m2, m3].join('-');
      })
    }
    return val;
  }
}
