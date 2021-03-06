import { MatPaginatorIntl } from "@angular/material";
export class MatPaginatorIntlPtBr extends MatPaginatorIntl {
    itemsPerPageLabel = "Itens por Página";
    nextPageLabel = "Proxima Página";
    previousPageLabel = "Página Anterior";
    lastPageLabel = "Última Página";
    firstPageLabel = "Primeira Página";

    getRangeLabel = function(page, pageSize, length) {
        if (length === 0 || pageSize === 0) {
            return "0 de " + length;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        // If the start index exceeds the list length, do not try and fix the end index to the end.
        const endIndex =
            startIndex < length
                ? Math.min(startIndex + pageSize, length)
                : startIndex + pageSize;
        return startIndex + 1 + " - " + endIndex + " de " + length;
    };

    // getRangeLabel: (page: number, pageSize: number, length: number) => { if (length == 0 || pageSize == 0) { return `0 of ${length}`; } length = Math.max(length, 0); const startIndex = page * pageSize; const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize; return `${startIndex + 1} – ${endIndex} de ${length}`; }
}
