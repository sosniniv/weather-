// Функция для обновления счётчика записей
function updateRecordCounter() {
    const recordCounter = document.getElementById('recordCounter'); // Находим элемент счётчика по ID
    const totalRecords = document.querySelectorAll('tbody tr').length; // Получаем количество строк (записей) в таблице
    
    // Устанавливаем значение счётчика, уменьшаем на 1, чтобы исключить строку с фильтрами
    recordCounter.textContent = Math.max(0, totalRecords - 1); 
}

// Инициализация счётчика записей при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateRecordCounter(); // Обновляем счётчик сразу после загрузки страницы
});
