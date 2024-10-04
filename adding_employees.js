// Функция для установки текущей даты в нужном формате  
function setCurrentDate() {  
    const dateInput = document.getElementById('addDate');  
    const today = new Date();  
    const day = String(today.getDate()).padStart(2, '0'); // Обеспечить двухзначный вывод  
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Январь - это 0  
    const year = today.getFullYear();  
    dateInput.value = `${day}.${month}.${year}`; // Установка значения в формате дд.мм.гггг  
}  

// Добавление обработчика события для установки даты, когда модальное окно открывается  
var addModal = document.getElementById('addModal');  
addModal.addEventListener('show.bs.modal', function (event) {  
    setCurrentDate(); // Установить текущую дату при открытии модального окна  
}); 

// Маска для поля даты
document.getElementById('addDate').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) value = value.slice(0, 2) + '.' + value.slice(2);
    if (value.length >= 5) value = value.slice(0, 5) + '.' + value.slice(5, 9);
    e.target.value = value;
});

function saveRecord() {
    // Получаем значения полей
    const fio = document.getElementById('addFIO').value.trim(); // ФИО
    const position = document.getElementById('addPosition').value.trim(); // Должность
    const contact = document.getElementById('addContact').value.trim(); // Контактная информация
    const department = document.getElementById('addDepartment').value.trim(); // Подразделение
    const status = document.getElementById('addStatus').value.trim(); // Статус
    const date = document.getElementById('addDate').value.trim(); // Дата регистрации

    // Проверка заполненности полей
    if (!fio || !position || !contact || !department || !status || !date) {
        alert("Пожалуйста, заполните все поля формы."); // Выводим сообщение, если есть незаполненные поля
        return; // Останавливаем выполнение функции, если поля не заполнены
    }

    // Создаем новую строку таблицы с данными
    const newRow = `
        <tr>
            <td class="column-fio">${fio}</td>
            <td class="column-position">${position}</td>
            <td class="column-contact">${contact}</td>
            <td class="column-department">${department}</td>
            <td class="column-status">${status}</td>
            <td class="column-date">${date}</td>
            <td class="column-actions text-center">
                <img style="margin-left: 20px;" src="edit.svg" width="30" height="30" title="Редактировать пользователя" onclick="editRecord(this)">
                <img style="margin-left: 20px;" src="delete-user.svg" width="30" height="30" title="Удалить пользователя" onclick="prepareDelete(this)" data-bs-toggle="modal" data-bs-target="#deleteModal">
                <img style="margin-left: 20px;" src="eye.svg" width="30" height="30" title="Смотреть пользователя" onclick="viewRecord(this)" data-bs-toggle="tooltip">
            </td>
        </tr>
    `;

    // Добавляем новую строку в таблицу
    const tbody = document.querySelector('tbody');
    tbody.insertAdjacentHTML('beforeend', newRow);

    // Обновляем счётчик записей после добавления новой записи
    updateRecordCounter();

    // Применяем настройки видимости столбцов
    applySettings();

    // Закрываем модальное окно через Bootstrap API
    const modalElement = document.getElementById('addModal');
    const addModalInstance = bootstrap.Modal.getInstance(modalElement); // Получаем экземпляр модального окна
    addModalInstance.hide(); // Закрытие модального окна

    // Очищаем поля формы для следующего ввода
    document.getElementById('addRecordForm').reset(); // Очищаем форму
}
