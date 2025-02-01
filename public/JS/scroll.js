// shahad 
function scrollToCategories() {
    const categoriesSection = document.getElementById('categories');
    const headerOffset = 150;
    const elementPosition = categoriesSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
}
