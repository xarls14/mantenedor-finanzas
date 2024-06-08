let transactionIdToDelete = null;

document.addEventListener('DOMContentLoaded', function() {

    const itemsPerPage = 10; // Número de elementos por página
    let currentPage = 1; // Página actual
    let data; // Variable para almacenar los datos de las transacciones

    // Función para obtener los datos de las transacciones
    function fetchTransactions() {
        fetch('../../backend/api/get_transaction.php')
            .then(response => response.json())
            .then(transactions => {
                data = transactions;
                renderPage(currentPage);
            });
    }

    // Función para renderizar los elementos de la página actual
    function renderPage(page) {

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentPageData = data.slice(startIndex, endIndex);
        const transactionList = document.getElementById('transaction-list');

        transactionList.innerHTML = '';

        currentPageData.forEach(transaction => {

            const row = document.createElement('tr');

            // Formatear la fecha a DD/MM/YYYY
            const formattedDate = formatDate(transaction.date);

            // Formatear el monto a CLP
            const formattedAmount = formatCurrency(transaction.amount);

            row.innerHTML = `
                <td>${transaction.type}</td>
                <td>${formattedAmount}</td>
                <td>${formattedDate}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="openEditModal(${transaction.id}, '${transaction.type}', ${transaction.amount}, '${transaction.date}')">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="openDeleteModal(${transaction.id})">Eliminar</button>
                </td>
            `;
            transactionList.appendChild(row);
        });

        updatePaginationButtons();
    }

    // Función para formatear la fecha a DD/MM/YYYY
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    // Función para formatear el monto a CLP
    function formatCurrency(amount) {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
    }

    // Función para actualizar el estado de los botones de paginación
    function updatePaginationButtons() {

        const prevPageBtn = document.getElementById('prev-page-btn');
        const nextPageBtn = document.getElementById('next-page-btn');

        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === Math.ceil(data.length / itemsPerPage);
    }

    // Evento de click para el botón "Anterior"
    document.getElementById('prev-page-btn').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderPage(currentPage);
        }
    });

    // Evento de click para el botón "Siguiente"
    document.getElementById('next-page-btn').addEventListener('click', function() {
        if (currentPage < Math.ceil(data.length / itemsPerPage)) {
            currentPage++;
            renderPage(currentPage);
        }
    });

    // Obtener los datos de las transacciones al cargar la página
    fetchTransactions();
});

// script para eliminar una transacción
document.getElementById('confirm-delete-btn').addEventListener('click', function() {

    if (transactionIdToDelete) {

        fetch('../../backend/api/delete_transaction.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: transactionIdToDelete })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                location.reload();
            } else {
                alert('Failed to delete transaction: ' + data.message);
            }
        });
    }
});

//script para editar una transacción
document.getElementById('edit-form').addEventListener('submit', function(event) {

    event.preventDefault();

    const id = document.getElementById('edit-id').value;
    const type = document.getElementById('edit-type').value;
    const amount = document.getElementById('edit-amount').value;
    const date = document.getElementById('edit-date').value;

    fetch('../../backend/api/update_transaction.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, type, amount, date })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            location.reload();
        } else {
            alert('Failed to update transaction: ' + data.message);
        }
    });
});

//modal para editar una transacción
function openEditModal(id, type, amount, date) {
    $('#edit-id').val(id);
    $('#edit-type').val(type);
    $('#edit-amount').val(amount);
    $('#edit-date').val(date);
    $('#editModal').modal('show');
}

// modal para eliminar una transacción
function openDeleteModal(id) {
    transactionIdToDelete = id;
    $('#deleteModal').modal('show');
}
