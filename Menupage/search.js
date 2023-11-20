const searchInput = document.getElementById("search");
const menuItems = document.querySelectorAll(".menu-item");

searchInput.addEventListener("input", () => {
  filterItems(searchInput.value.toLowerCase());
});

// Search Bar Function
function filterItems(query) {
  menuItems.forEach((menuItem) => {
    const name = menuItem.getAttribute("data-name").toLowerCase();
    if (name.includes(query)) {
      menuItem.style.display = "inline-block";
    } else {
      menuItem.style.display = "none";
    }
  });
}
