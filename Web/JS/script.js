document.addEventListener("DOMContentLoaded", function () {
    const yearLinks = document.querySelectorAll("#year-menu a");
    const monthMenu = document.getElementById("month-menu");
    const contentSection = document.getElementById("content");

    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    yearLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const year = e.target.dataset.year;

            // Limpia el menú de meses y el contenido
            monthMenu.innerHTML = `<h2>${year}</h2>`;
            contentSection.innerHTML = ''; // Limpiar contenido previo
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

                    // Cargar memes o videos para el mes seleccionado
                    loadMemes(selectedYear, selectedMonth);
                });
            });

            // Cambiar el color del enlace activo
            yearLinks.forEach(yl => yl.classList.remove("active"));
            e.target.classList.add("active");
        });
    });

    function loadMemes(year, month) {
        contentSection.innerHTML = ''; // Limpiar contenido previo
    
        if (year === "2018" && month === "Enero") {
            contentSection.innerHTML = `
                <h3>Meme de ${month} ${year}</h3>
                <video width="400" controls>
                    <source src="memes/${year}/${month}/2018enero.mp4" type="video/mp4">
                    Tu navegador no soporta la etiqueta de video.
                </video>
                <p>¡Disfruta del meme!</p>
            `;
        } else {
            contentSection.innerHTML = `<p>No hay memes disponibles para ${month} ${year}.</p>`;
        }
    }
});
