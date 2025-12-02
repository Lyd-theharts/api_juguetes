import {FormControl, ValidationErrors} from '@angular/forms';

export class FormValidators {
  static notOnlyWhiteSpace(control:FormControl): ValidationErrors | null {
    if ((control.value != null) && (control.value.trim().length == 0)) { //lo del trim es que rellene solo con espacios.
      return{notOnlyWhiteSpace: true};
    }else{
      return null;
    }
  }

 /* static forbiddenName(text: string): ValidationErrors{
    return (control: FormControl): ValidationErrors  | null => {
      const regExp = new RegExp(text,'i'); //me pasa una expression regular, y con esa expresion regular testea si cualquier string que le pasamos cumple ese pattern que le hemos esstablecido en la expresion regular, la 'i' es que minusculas o mayusculas le da igual.
      const forbidden = regExp.test(control.value);
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    }
  }*/
  static forbiddenName(text: string[]): ValidationErrors{ //funcion para hacer las palabras prohibidas en arrays.
    return (control: FormControl): ValidationErrors  | null => {
      let result = null;
      text.forEach(p  => {
        const regExp = new RegExp(p,'i'); //me pasa una expression regular, y con esa expresion regular testea si cualquier string que le pasamos cumple ese pattern que le hemos esstablecido en la expresion regular, la 'i' es que minusculas o mayusculas le da igual.
        const forbidden = regExp.test(control.value);
        if (forbidden) result =  {forbiddenName: {value: control.value}};
      })
      return result;

    }
  }
  static minValue(value: number): ValidationErrors | null{
    return (control: FormControl): ValidationErrors | null => {
      if (control.value < value) return {minValue: true};
      else return null;
    }
  }

  static allowedExtension(regex: RegExp): ValidationErrors{
    return (control: FormControl): ValidationErrors  | null => {
      const allowed = regex.test(control.value);
      console.log(allowed);
      return allowed ? null : {allowedExtension: true};
    }
  }

}
