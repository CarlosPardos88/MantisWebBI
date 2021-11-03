import { MatPaginatorIntl } from '@angular/material/paginator';

export function customPaginator() {
    const customPaginatorIntl = new MatPaginatorIntl();

    customPaginatorIntl.itemsPerPageLabel = 'Items por página:';
    
    customPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number): string => {
        
        if (length === 0 || pageSize === 0) {
          return '0 ' + 'de' + ' ' + length;
        }
        length = Math.max(length, 0);
        const startIndex = ((page * pageSize) > length) ?
          (Math.ceil(length / pageSize) - 1) * pageSize:
          page * pageSize;
    
        const endIndex = Math.min(startIndex + pageSize, length);
        return startIndex + 1 + ' - ' + endIndex + ' ' + 'de' + ' ' + length;
      }

    return customPaginatorIntl;
}