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

            monthMenu.innerHTML = `<h2>${year}</h2>`;
            contentSection.innerHTML = ''; // Limpiar contenido previo
            const ul = document.createElement("ul");

            months.forEach((month, index) => {
                const li = document.createElement("li");
                li.innerHTML = `<a href="#" data-year="${year}" data-month="${index + 1}">${month}</a>`;
                ul.appendChild(li);
            });

            monthMenu.appendChild(ul);

            const monthLinks = ul.querySelectorAll("a");
            monthLinks.forEach(monthLink => {
                monthLink.addEventListener("click", function (e) {
                    e.preventDefault();
                    const selectedYear = e.target.dataset.year;
                    const selectedMonth = e.target.dataset.month;
                    loadMemes(selectedYear, selectedMonth);
                });
            });
        });
    });

    function loadMemes(year, month) {
        contentSection.innerHTML = ''; // Limpiar contenido previo

        const monthNames = [
            "", "enero", "febrero", "marzo", "abril", "mayo", "junio",
            "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ];

        const monthFolder = monthNames[month].toLowerCase();
        const videoPath = `memes/${year}/${monthFolder}/2017_${monthFolder}.mp4`;
        const imagePath = `memes/${year}/${monthFolder}/Multimedia.png`;

        // Verificar si hay contenido para el mes seleccionado
        checkFile(videoPath).then(videoExists => {
            checkFile(imagePath).then(imageExists => {
                if (videoExists && imageExists) {
                    contentSection.innerHTML = `
                        <h3>Meme de ${months[month - 1]} ${year}</h3>
                        <video width="400" controls autoplay>
                            <source src="${videoPath}" type="video/mp4">
                            Tu navegador no soporta la etiqueta de video.
                        </video>
                        <p>¡Disfruta del meme!</p>
                        <img src="${imagePath}" alt="Multimedia" width="400">
                    `;
                } else {
                    contentSection.innerHTML = `<p>No hay memes disponibles para ${months[month - 1]} ${year}.</p>`;
                }
            });
        });
    }

    function checkFile(path) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();
            xhr.open('HEAD', path, true);
            xhr.onload = function () {
                resolve(xhr.status === 200); // Resuelve true si el archivo existe
            };
            xhr.onerror = function () {
                resolve(false); // Resuelve false si hay un error
            };
            xhr.send();
        });
    }
});
