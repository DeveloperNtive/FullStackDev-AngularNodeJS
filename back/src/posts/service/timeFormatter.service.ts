import { Injectable } from '@nestjs/common';

@Injectable()
export class TimeFormatter {
  dateFormatter(fecha: Date): string {
    const day =
      fecha.getDate().toString().split('').length < 2
        ? `0${fecha.getDate().toString()}`
        : fecha.getDate().toString();
    const month =
      (fecha.getMonth() + 1).toString().split('').length < 2
        ? `0${fecha.getMonth().toString()}`
        : fecha.getMonth().toString();
    const year = fecha.getFullYear();
    return `${day}/${month}/${year}`; //dd/mm/aaaa
  }
  hourFormatter(fecha: Date): string {
    const hour =
      fecha.getHours() < 12
        ? fecha.getHours()
        : (fecha.getHours() - 12).toString().split('').length < 2
        ? `0${fecha.getHours() - 12}`
        : fecha.getHours() - 12;
    const mins =
      fecha.getMinutes().toString().split('').length < 2
        ? `0${fecha.getMinutes()}`
        : fecha.getMinutes();
    return `${hour}:${mins} ${fecha.getHours() > 12 ? 'PM' : 'AM'}`;
  }
}
