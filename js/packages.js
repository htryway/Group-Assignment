/* Renders package/experience cards from the shared data file. */

function nlLearnMoreHref(item) {
  // The Ultimate Gamer Pass has its own fully built page (see spec).
  if (item.id === "ultimate-gamer-pass") return "package-ultimate-gamer-pass.html";
  return `package.html?id=${item.id}`;
}

function nlCardHTML(item) {
  return `
    <article class="card">
      <span class="card-badge">${item.badge}</span>
      <h3>${item.name}</h3>
      <p class="price">R${item.price.toLocaleString("en-ZA")}</p>
      <p>${item.summary}</p>
      <a class="card-link" href="${nlLearnMoreHref(item)}">Learn More &rarr;</a>
    </article>`;
}

function nlRenderCards(containerId, items) {
  const mount = document.getElementById(containerId);
  if (!mount) return;
  mount.innerHTML = items.map(nlCardHTML).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  nlRenderCards("packages-grid", NL_DATA.packages);
  nlRenderCards("experiences-grid", NL_DATA.experiences);
});
