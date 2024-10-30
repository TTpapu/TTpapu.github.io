document.addEventListener("DOMContentLoaded", function () {
    const yearLinks = document.querySelectorAll("#year-menu a");
    const monthMenu = document.getElementById("month-menu");

    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    yearLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const year = e.target.dataset.year;

            // Limpia el menú de meses
            monthMenu.innerHTML = `<h2>${year}</h2>`;
            const ul = document.createElement("ul");

            months.forEach(month => {
                const li = document.createElement("li");
                li.innerHTML = `<a href="#" data-year="${year}" data-month="${month}">${month}</a>`;
                ul.appendChild(li);
            });

            monthMenu.appendChild(ul);

            // Agregar evento para cada mes
            const monthLinks = ul.querySelectorAll("a");
            monthLinks.forEach(monthLink => {
                monthLink.addEventListener("click", function (e) {
                    e.preventDefault();
                    const selectedYear = e.target.dataset.year;
                    const selectedMonth = e.target.dataset.month;

                    // Aquí puedes mostrar los memes o videos para el mes seleccionado
                    alert(`Seleccionaste ${selectedMonth} de ${selectedYear}`);
                });
            });
        });
    });
});
