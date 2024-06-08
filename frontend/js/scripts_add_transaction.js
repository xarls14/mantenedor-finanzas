document.getElementById('transaction-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const type = document.getElementById('type').value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;

    // Enviar datos al backend para agregar una nueva transacción
    fetch('../../backend/api/add_transaction.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type, amount, date })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            window.location.href = './index.html';//redirige a index.html luego de la acción
        } else {
            alert('Failed to add transaction: ' + data.message);
        }
    });
});