
const modal = document.getElementById("galleryModal");

const mainImage = document.getElementById("galleryMainImage");
const thumbnails = document.getElementById("galleryThumbnails");
const counter = document.getElementById("galleryCounter");

const closeButton = document.getElementById("galleryClose");
const prevButton = document.getElementById("galleryPrev");
const nextButton = document.getElementById("galleryNext");

let currentImages = [];
let currentIndex = 0;


// Открытие галереи
function openGallery(gallery) {

    const images = gallery.querySelectorAll(".gallery-data img");

    currentImages = Array.from(images).map(image => ({
        src: image.src,
        alt: image.alt
    }));

    if (currentImages.length === 0) return;

    currentIndex = 0;

    renderThumbnails();
    showImage(currentIndex);

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}


// Показ изображения
function showImage(index) {

    if (index < 0 || index >= currentImages.length) return;

    currentIndex = index;

    mainImage.src = currentImages[index].src;
    mainImage.alt = currentImages[index].alt;

    counter.textContent =
        `${String(index + 1).padStart(2, "0")} / ${String(currentImages.length).padStart(2, "0")}`;

    const allThumbnails = thumbnails.querySelectorAll(".gallery-thumbnail");

    allThumbnails.forEach((thumbnail, i) => {
        thumbnail.classList.toggle("active", i === index);
    });

    allThumbnails[index]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest"
    });
}


// Создание миниатюр
function renderThumbnails() {

    thumbnails.innerHTML = "";

    currentImages.forEach((image, index) => {

        const button = document.createElement("button");

        button.className = "gallery-thumbnail";
        button.type = "button";

        const img = document.createElement("img");

        img.src = image.src;
        img.alt = image.alt;

        button.appendChild(img);

        button.addEventListener("click", () => {
            showImage(index);
        });

        thumbnails.appendChild(button);

    });
}


// Следующее фото
function nextImage() {

    const nextIndex = (currentIndex + 1) % currentImages.length;

    showImage(nextIndex);
}


// Предыдущее фото
function prevImage() {

    const prevIndex =
        (currentIndex - 1 + currentImages.length) % currentImages.length;

    showImage(prevIndex);
}


// Закрытие галереи
function closeGallery() {

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


// Открытие по клику на обложку
document.querySelectorAll("[data-gallery-open]").forEach(button => {

    button.addEventListener("click", () => {

        const gallery = button.closest(".project-gallery");

        openGallery(gallery);

    });

});


// Кнопки переключения
nextButton.addEventListener("click", nextImage);
prevButton.addEventListener("click", prevImage);


// Закрытие
closeButton.addEventListener("click", closeGallery);


// Закрытие по клику на затемнённый фон
modal.addEventListener("click", event => {

    if (event.target === modal) {
        closeGallery();
    }

});


// Управление клавиатурой
document.addEventListener("keydown", event => {

    if (!modal.classList.contains("active")) return;

    if (event.key === "Escape") {
        closeGallery();
    }

    if (event.key === "ArrowRight") {
        nextImage();
    }

    if (event.key === "ArrowLeft") {
        prevImage();
    }

});
