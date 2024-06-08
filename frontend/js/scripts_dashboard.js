
document.addEventListener('DOMContentLoaded', function() {
    fetch('../../backend/api/get_monthly_summary.php')
        .then(response => response.json())
        .then(data => {
            const labels = data.map(item => item.month);
            const incomeData = data.map(item => item.total_income);
            const expenseData = data.map(item => item.total_expense);

            //Creamos dashboard para ingresos mensuales
            const incomeCtx = document.getElementById('incomeChart').getContext('2d');
            new Chart(incomeCtx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Ingresos mensuales',
                        data: incomeData,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        fill: false
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            //dashboard de gastos mensuales
            const expenseCtx = document.getElementById('expenseChart').getContext('2d');
            new Chart(expenseCtx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Gastos Mensuales',
                        data: expenseData,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        fill: false
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });
});

document.addEventListener('DOMContentLoaded', function() {
    fetch('../../backend/api/get_monthly_earnings.php')
        .then(response => response.json())
        .then(data => {
            const labels = data.map(item => item.month);
            const gainData = data.map(item => item.total_gain);

            //Creamos dashboard para ganancias mensuales
            const gainCtx = document.getElementById('gainChart').getContext('2d');
            new Chart(gainCtx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Monthly Gains',
                        data: gainData,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        fill: false
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });
});
