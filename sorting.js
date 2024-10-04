function sortTable(columnIndex, header) {
    const table = document.querySelector('table tbody');
    const rows = Array.from(table.rows);

    // Исключаем первую строку с полями ввода
    const dataRows = rows.slice(1);

    // Получаем текущее состояние сортировки для конкретного столбца
    let ascending = header.getAttribute('data-sort-order') === 'asc';

    // Сортировка строк
    dataRows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].textContent.trim();
        const cellB = rowB.cells[columnIndex].textContent.trim();

        if (columnIndex === 5) { // Если сортировка по дате
            const dateA = parseDate(cellA);
            const dateB = parseDate(cellB);
            return ascending ? dateA - dateB : dateB - dateA;
        } else { // Сортировка для текстовых значений
            return ascending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
        }
    });

    // Пересортированные строки добавляем обратно в таблицу
    dataRows.forEach(row => table.appendChild(row));

    // Обновляем состояние сортировки для текущего столбца
    header.setAttribute('data-sort-order', ascending ? 'desc' : 'asc');
}

// Вспомогательная функция для преобразования даты
function parseDate(dateString) {
    const parts = dateString.split('.'); // Предполагаем формат dd.mm.yyyy
    return new Date(parts[2], parts[1] - 1, parts[0]);
}
