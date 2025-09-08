import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import moment from 'moment-jalaali';

moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: false });

@Injectable()
export class JalaliDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    const m = moment(date);
    return m.format('jYYYY/jMM/jDD');
  }

  override parse(value: any): Date | null {
    if (!value) return null;
    const m = moment(value, 'jYYYY/jMM/jDD');
    return m.isValid() ? m.toDate() : null;
  }
}
