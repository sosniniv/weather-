        // Применение настроек отображения колонок
        function applySettings() {
            const columns = {
                fio: document.getElementById('columnFioCheck').checked,
                position: document.getElementById('columnPositionCheck').checked,
                contact: document.getElementById('columnContactCheck').checked,
                department: document.getElementById('columnDepartmentCheck').checked,
                status: document.getElementById('columnStatusCheck').checked,
                date: document.getElementById('columnDateCheck').checked
            };

            document.querySelectorAll('.column-fio').forEach(col => col.style.display = columns.fio ? '' : 'none');
            document.querySelectorAll('.column-position').forEach(col => col.style.display = columns.position ? '' : 'none');
            document.querySelectorAll('.column-contact').forEach(col => col.style.display = columns.contact ? '' : 'none');
            document.querySelectorAll('.column-department').forEach(col => col.style.display = columns.department ? '' : 'none');
            document.querySelectorAll('.column-status').forEach(col => col.style.display = columns.status ? '' : 'none');
            document.querySelectorAll('.column-date').forEach(col => col.style.display = columns.date ? '' : 'none');

            // Закрытие модального окна
            const settingsModal = bootstrap.Modal.getInstance(document.getElementById('settingsModal'));
            settingsModal.hide();
        }

        // Маска для поля даты
        document.getElementById('addDate').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) value = value.slice(0, 2) + '.' + value.slice(2);
            if (value.length >= 5) value = value.slice(0, 5) + '.' + value.slice(5, 9);
            e.target.value = value;
        });

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
        


    // Функция для поиска и фильтрации строк таблицы
    function searchTable() {
        // Получаем все значения из полей ввода для фильтрации
        const fioFilter = document.querySelector('.column-fio input').value.toLowerCase();
        const positionFilter = document.querySelector('.column-position input').value.toLowerCase();
        const contactFilter = document.querySelector('.column-contact input').value.toLowerCase();
        const departmentFilter = document.querySelector('.column-department input').value.toLowerCase();
        const statusFilter = document.querySelector('.column-status input').value.toLowerCase();
        const dateFilter = document.querySelector('.column-date input').value.toLowerCase();

        // Получаем все строки таблицы (кроме первой строки с заголовками)
        const rows = document.querySelectorAll('table tbody tr');

        // Проходим по каждой строке и проверяем соответствие фильтрам
        rows.forEach(row => {
            const fio = row.querySelector('.column-fio').textContent.toLowerCase();
            const position = row.querySelector('.column-position').textContent.toLowerCase();
            const contact = row.querySelector('.column-contact').textContent.toLowerCase();
            const department = row.querySelector('.column-department').textContent.toLowerCase();
            const status = row.querySelector('.column-status').textContent.toLowerCase();
            const date = row.querySelector('.column-date').textContent.toLowerCase();

            // Проверяем, соответствуют ли значения фильтрам (или фильтр пустой)
            const matchesFio = fio.includes(fioFilter);
            const matchesPosition = position.includes(positionFilter);
            const matchesContact = contact.includes(contactFilter);
            const matchesDepartment = department.includes(departmentFilter);
            const matchesStatus = status.includes(statusFilter);
            const matchesDate = date.includes(dateFilter);

            // Если строка соответствует всем фильтрам, показываем её, иначе скрываем
            if (matchesFio && matchesPosition && matchesContact && matchesDepartment && matchesStatus && matchesDate) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
    document.querySelector('.btn-primary').addEventListener('click', searchTable);


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

    


// Функция для обновления счётчика записей  
function updateRecordCounter() {  
    // Получаем все строки в теле таблицы  
    const rows = document.querySelectorAll('.table tbody tr');  
    // Обновляем содержимое элемента счётчика  
    document.getElementById('recordCounter').textContent = rows.length;  
}  

// Вызываем функцию обновления счётчика при загрузке страницы  
document.addEventListener('DOMContentLoaded', updateRecordCounter);  

// Пример функции для добавления новой записи  
function addRecord() {  
    // Логика добавления новой записи  
    // После добавления записи обновляем счётчик  
    updateRecordCounter();  
}  

// Пример функции для удаления записи  
function deleteRecord() {  
    // Логика удаления записи  
    // После удаления записи обновляем счётчик  
    updateRecordCounter();  
}


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



let userToDelete = null;  

// Функция для определения пользователя, которого нужно удалить  
function prepareDelete(icon) {  
    // Получаем строку родителя (трек) для текущей иконки  
    const row = icon.closest('tr');  
    
    // Извлекаем ФИО пользователя из ячейки  
    const fio = row.querySelector('.column-fio').textContent;  

    // Обновляем текст в модальном окне для подтверждения удаления  
    document.getElementById('deleteFIO').textContent = fio;  

    // Сохраняем ссылку на строку для последующего удаления  
    userToDelete = row;  

    // Открываем модальное окно  
    var deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));  
    deleteModal.show();  
}  

// Функция для подтверждения удаления пользователя  
document.getElementById('confirmDeleteButton').addEventListener('click', function () {  
    if (userToDelete) {  
        userToDelete.remove(); // Удаляем строку из таблицы  
        userToDelete = null; // Сбрасываем ссылку на удаляемого пользователя  

        // Закрываем модальное окно  
        var deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));  
        if (deleteModal) {  
            deleteModal.hide();  
        }  

        // Удаляем затемнение, если оно осталось  
        const backdrop = document.querySelector('.modal-backdrop');  
        if (backdrop) {  
            backdrop.remove();  
        }  
    }  
});