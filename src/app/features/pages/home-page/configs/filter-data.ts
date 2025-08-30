import {SelectData} from '../../../../core/types/select.types';

export const filterOptions: Array<SelectData> = [
  {
    value: 'all',
    displayValue: 'Показать всех'
  },
  {
    value: 'active',
    displayValue: 'Только активных'
  },
  {
    value: 'inactive',
    displayValue: 'Только неактивных пользователей'
  }
]
