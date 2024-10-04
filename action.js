// Функция для просмотра информации о пользователе  
function viewRecord(icon) {  
    // Получаем строку родителя (трек) для текущей иконки  
    const row = icon.closest('tr');  
  
    // Извлекаем данные из ячеек строки  
    const fio = row.querySelector('.column-fio').textContent;  
    const position = row.querySelector('.column-position').textContent;  
    const contact = row.querySelector('.column-contact').textContent;  
    const department = row.querySelector('.column-department').textContent;  
    const status = row.querySelector('.column-status').textContent;  
    const date = row.querySelector('.column-date').textContent;  

    // Заполняем модальное окно данными  
    document.getElementById('viewFIO').textContent = fio;  
    document.getElementById('viewPosition').textContent = position;  
    document.getElementById('viewContact').textContent = contact;  
    document.getElementById('viewDepartment').textContent = department;  
    document.getElementById('viewStatus').textContent = status;  
    document.getElementById('viewDate').textContent = date;  

    // Открываем модальное окно  
    var viewModal = new bootstrap.Modal(document.getElementById('viewModal'));  
    viewModal.show();  
}

    // Открытие формы редактирования с заполненными данными
function editRecord(editButton) {
    const row = editButton.closest('tr');
    const fio = row.querySelector('.column-fio').textContent;
    const position = row.querySelector('.column-position').textContent;
    const contact = row.querySelector('.column-contact').textContent;
    const department = row.querySelector('.column-department').textContent;
    const status = row.querySelector('.column-status').textContent;

    document.getElementById('editFIO').value = fio;
    document.getElementById('editPosition').value = position;
    document.getElementById('editContact').value = contact;
    document.getElementById('editDepartment').value = department;
    document.getElementById('editStatus').value = status;
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.show();
}

// Сохранение изменений в записи
function updateRecord() {
    const fio = document.getElementById('editFIO').value;
    const position = document.getElementById('editPosition').value;
    const contact = document.getElementById('editContact').value;
    const department = document.getElementById('editDepartment').value;
    const status = document.getElementById('editStatus').value;
    const date = document.getElementById('editDate').value;

    // Получение редактируемой строки
    const row = document.querySelector('.table tbody tr');
    row.querySelector('.column-fio').textContent = fio;
    row.querySelector('.column-position').textContent = position;
    row.querySelector('.column-contact').textContent = contact;
    row.querySelector('.column-department').textContent = department;
    row.querySelector('.column-status').textContent = status;
    row.querySelector('.column-date').textContent = date;

    // Закрыть модальное окно редактирования
    const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
    editModal.hide();
}

// Сохранение новой записи
function saveRecord() {
    const fio = document.getElementById('addFIO').value;
    const position = document.getElementById('addPosition').value;
    const contact = document.getElementById('addContact').value;
    const department = document.getElementById('addDepartment').value;
    const status = document.getElementById('addStatus').value;
    const date = document.getElementById('addDate').value;

    const tableBody = document.querySelector('.table tbody');
    const newRow = `
        <tr>
            <td class="column-fio">${fio}</td>
            <td class="column-position">${position}</td>
            <td class="column-contact">${contact}</td>
            <td class="column-department">${department}</td>
            <td class="column-status">${status}</td>
            <td class="column-date">${date}</td>
            <td class="column-actions text-center">
                <img style="margin-left: 10px;" src="edit.svg" width="30" height="30" title="Редактировать пользователя" onclick="editRecord(this)">
                <img style="margin-left: 20px;" src="delete-user.svg" width="30" height="30" title="Удалить пользователя" data-bs-toggle="modal" data-bs-target="#deleteModal">
            </td>
        </tr>
    `;
    tableBody.insertAdjacentHTML('beforeend', newRow);

    const addModal = bootstrap.Modal.getInstance(document.getElementById('addModal'));
    addModal.hide();
}


// Пример функции для удаления записи  
function deleteRecord() {  
    // Логика удаления записи  
    // После удаления записи обновляем счётчик  
    updateRecordCounter();  
}