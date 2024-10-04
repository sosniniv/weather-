function applySettings() {  
    // Создаем объект `columns`, который будет хранить состояние чекбоксов для каждого столбца  
    const columns = {  
        fio: document.getElementById('columnFioCheck').checked,          // Состояние чекбокса для ФИО  
        position: document.getElementById('columnPositionCheck').checked, // Состояние чекбокса для Должности  
        contact: document.getElementById('columnContactCheck').checked,    // Состояние чекбокса для Контактной информации  
        department: document.getElementById('columnDepartmentCheck').checked, // Состояние чекбокса для Подразделения  
        status: document.getElementById('columnStatusCheck').checked,      // Состояние чекбокса для Статуса  
        date: document.getElementById('columnDateCheck').checked           // Состояние чекбокса для Даты  
    };  

    // Устанавливаем видимость каждого столбца в таблице на основе состояния соответствующего чекбокса
    // Для строк
    document.querySelectorAll('.column-fio').forEach(col => col.style.display = columns.fio ? '' : 'none');          
    document.querySelectorAll('.column-position').forEach(col => col.style.display = columns.position ? '' : 'none'); 
    document.querySelectorAll('.column-contact').forEach(col => col.style.display = columns.contact ? '' : 'none');   
    document.querySelectorAll('.column-department').forEach(col => col.style.display = columns.department ? '' : 'none'); 
    document.querySelectorAll('.column-status').forEach(col => col.style.display = columns.status ? '' : 'none');       
    document.querySelectorAll('.column-date').forEach(col => col.style.display = columns.date ? '' : 'none');           

    // Для заголовков
    document.querySelector('th:nth-child(1)').style.display = columns.fio ? '' : 'none';         // Заголовок ФИО
    document.querySelector('th:nth-child(2)').style.display = columns.position ? '' : 'none';    // Заголовок Должности
    document.querySelector('th:nth-child(3)').style.display = columns.contact ? '' : 'none';     // Заголовок Контакта
    document.querySelector('th:nth-child(4)').style.display = columns.department ? '' : 'none';  // Заголовок Подразделения
    document.querySelector('th:nth-child(5)').style.display = columns.status ? '' : 'none';      // Заголовок Статуса
    document.querySelector('th:nth-child(6)').style.display = columns.date ? '' : 'none';        // Заголовок Даты

    // Получаем экземпляр модального окна настроек с помощью Bootstrap  
    const settingsModal = bootstrap.Modal.getInstance(document.getElementById('settingsModal'));  
    
    // Скрываем модальное окно после применения настроек  
    settingsModal.hide();  
}

