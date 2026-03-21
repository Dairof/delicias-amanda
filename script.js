import { MENU, DOC_NOTES } from './menuData.js';
import { PDF_MENUS, PDF_CATEGORIES } from './pdfIndex.js';

const PHONE = "57" + "3102482193"; // Colombia +57
const FALLBACK_IMG = "assets/placeholders/food.svg";

const products = [
  {
    id: "D1",
    name: "Desayuno Empresarial",
    cat: "desayuno",
    price: "Cotiza por WhatsApp",
    desc: "Ejemplo: Fruta + omelet + bebida fría/caliente + porción de queso + pan de granos.",
    img: "assets/placeholders/DesayunoE.jpeg",
  },
  {
    id: "D2",
    name: "Desayuno Familiar",
    cat: "desayuno",
    price: "Cotiza por WhatsApp",
    desc: "Ejemplo: Quiche Lorraine + fresa con kiwi + jugo natural + bebida fría/caliente.",
    img: "assets/placeholders/DesayunoF.jpeg",
  },
  {
    id: "D3",
    name: "Desayuno Sorpresa",
    cat: "desayuno",
    price: "Cotiza por WhatsApp",
    desc: "Sandwich + bebida fría + flores + chocolatina + foto.",
    img: "assets/placeholders/DesayunoS.jpeg",
  },
  {
    id: "V1",
    name: "Vino (opción a elegir)",
    cat: "vino",
    price: "Cotiza por WhatsApp",
    desc: "Blanco / tinto / espumoso (según gusto del cliente).",
    img: "assets/placeholders/GatoN.jpg",
  },
  {
    id: "DC1",
    name: "Decoración Cumpleaños",
    cat: "decoracion",
    price: "Cotiza por WhatsApp",
    desc: "Globos + letrero + colores a elección.",
    img: "assets/placeholders/Cumpleaños.jpeg",
  },
  {
    id: "DC2",
    name: "Decoración Aniversario",
    cat: "decoracion",
    price: "Cotiza por WhatsApp",
    desc: "Detalles especiales + dedicatoria.",
    img: "assets/placeholders/Aniversario.jpg",
  },
  {
    id: "DC3",
    name: "Decoración temática",
    cat: "decoracion",
    price: "Cotiza por WhatsApp",
    desc: "Detalles especiales + dedicatoria.",
    img: "assets/placeholders/tematica.jpg",
  },
  {
    id: "DC4",
    name: "Decoración evento",
    cat: "decoracion",
    price: "Cotiza por WhatsApp",
    desc: "Detalles especiales + dedicatoria.",
    img: "assets/placeholders/evento.jpeg",
  },
  {
    id: "P1",
    name: "Postre (opción a elegir)",
    cat: "postres",
    price: "Cotiza por WhatsApp",
    desc: "Cheesecake / tres leches / brownie (según disponibilidad).",
    img: "assets/placeholders/postre.jpg",
  },
  {
    id: "T1",
    name: "Torta (opción a elegir)",
    cat: "tortas",
    price: "Cotiza por WhatsApp",
    desc: "Cheesecake / tres leches / brownie (según disponibilidad).",
    img: "assets/placeholders/torta.jpeg",
  },
  {
    id: "PO1",
    name: "Ponques (opción a elegir)",
    cat: "ponques",
    price: "Cotiza por WhatsApp",
    desc: "Cheesecake / tres leches / brownie (según disponibilidad).",
    img: "assets/placeholders/ponque.jpg",
  },
];

const grid = document.getElementById("grid");
const chips = document.querySelectorAll("#catalogo .chip");
let selectedProduct = null;

function waLink(message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${PHONE}?text=${text}`;
}

function openWA(message) {
  window.open(waLink(message), "_blank");
}

function humanizeCategory(cat = "") {
  const map = {
    desayuno: "Desayuno",
    vino: "Vino",
    decoracion: "Decoración",
    postres: "Postres",
    tortas: "Tortas",
    ponques: "Ponqués",
  };
  return map[cat] || cat;
}

function formatDateForMessage(value) {
  if (!value) return "";
  const [y, m, d] = value.split("-");
  if (!y || !m || !d) return value;
  return `${d}/${m}/${y}`;
}

function updatePickedProductUI() {
  const box = document.getElementById("pickedProduct");
  if (!box) return;

  if (!selectedProduct) {
    box.textContent = "Aún no has seleccionado un producto del catálogo.";
    box.classList.add("is-empty");
    return;
  }

  box.textContent = `Producto seleccionado: ${selectedProduct.name} (${selectedProduct.id}) • ${humanizeCategory(selectedProduct.cat)}`;
  box.classList.remove("is-empty");
}

function selectProduct(prod, scrollToForm = true) {
  selectedProduct = prod;
  updatePickedProductUI();

  const productoManual = document.getElementById("productoManual");
  if (productoManual) {
    productoManual.value = prod.name;
  }

  const notas = document.getElementById("notas");
  if (notas && !notas.value.trim()) {
    notas.placeholder = `Ej: ${prod.name}, cantidad de personas, presupuesto, colores, dedicatoria...`;
  }

  if (scrollToForm) {
    document.querySelector(".hero__card")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function buildCatalogMessage(extra = "", pickedProduct = selectedProduct) {
  const productoManual = document.getElementById("productoManual")?.value.trim() || "";
  const ocasion = document.getElementById("ocasion")?.value.trim() || "";
  const fecha = formatDateForMessage(document.getElementById("fecha")?.value || "");
  const zona = document.getElementById("zona")?.value.trim() || "";
  const notas = document.getElementById("notas")?.value.trim() || "";

  let msg = `Hola,
Quiero cotizar con Delicias Amanda.

`;

  if (pickedProduct) {
    msg += `Producto: ${pickedProduct.name} (${pickedProduct.id})
`;
    msg += `Categoría: ${humanizeCategory(pickedProduct.cat)}

`;
  } else if (productoManual) {
    msg += `Producto o servicio: ${productoManual}

`;
  }

  if (ocasion) msg += `Ocasión: ${ocasion}
`;
  if (fecha) msg += `Fecha: ${fecha}
`;
  if (zona) msg += `Zona: ${zona}
`;
  if (notas) msg += `Notas: ${notas}
`;

  if (extra) msg += `\n${extra}`;
  return msg.trim();
}

function buildQuickContactMessage(extra = "") {
  const nombre = document.getElementById("nombre")?.value.trim() || "";
  const necesidad = document.getElementById("necesidad")?.value.trim() || "";
  const detalle = document.getElementById("detalle")?.value.trim() || "";

  let msg = `Hola,
Quiero comunicarme con Delicias Amanda.

`;

  if (nombre) msg += `Nombre: ${nombre}
`;
  if (necesidad) msg += `Necesito: ${necesidad}
`;
  if (detalle) msg += `Detalles: ${detalle}
`;

  if (extra) msg += `\n${extra}`;
  return msg.trim();
}

function validateMainQuoteForm() {
  const productoManual = document.getElementById("productoManual")?.value.trim() || "";
  const ocasion = document.getElementById("ocasion")?.value.trim() || "";
  const fecha = document.getElementById("fecha")?.value.trim() || "";
  const zona = document.getElementById("zona")?.value.trim() || "";

  if (!selectedProduct && !productoManual) {
    alert("Escribe un producto o selecciona uno desde el catálogo.");
    return false;
  }

  if (!ocasion || !fecha || !zona) {
    alert("Completa ocasión, fecha y zona antes de enviar la cotización.");
    return false;
  }

  return true;
}

function validateQuickContactForm() {
  const nombre = document.getElementById("nombre")?.value.trim() || "";
  const necesidad = document.getElementById("necesidad")?.value.trim() || "";
  const detalle = document.getElementById("detalle")?.value.trim() || "";

  if (!nombre && !necesidad && !detalle) {
    alert("Escribe al menos un dato en el mensaje rápido.");
    return false;
  }

  return true;
}

function renderCatalog(filter = "all") {
  if (!grid) return;

  grid.innerHTML = "";
  const list = filter === "all" ? products : products.filter(p => p.cat === filter);

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "item";
    card.innerHTML = `
      <div class="item__img">
        <img src="${p.img}" alt="${p.name}" loading="lazy"
             onerror="this.onerror=null;this.src='${FALLBACK_IMG}';" />
      </div>
      <div class="item__body">
        <h3 class="item__title">${p.name}</h3>
        <div class="price">${p.price}</div>
        <p class="muted" style="margin:0; line-height:1.4">${p.desc}</p>
        <div class="item__actions">
          <button class="btn2 btn2--primary" data-id="${p.id}">Cotizar</button>
          <button class="btn2 btn2--secondary" data-id="${p.id}" data-share="1">Compartir</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ========= Galería ========= */
const gallery = document.getElementById("gallery");
const galleryChips = document.querySelectorAll("#galeria .chip");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalCap = document.getElementById("modalCap");

let zoom = 1;
let panX = 0;
let panY = 0;
let isPanning = false;
let startX = 0;
let startY = 0;

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function applyTransform() {
  if (!modalImg) return;
  modalImg.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom})`;
  modalImg.style.cursor = zoom > 1 ? "grab" : "zoom-in";
}

function resetZoom() {
  zoom = 1;
  panX = 0;
  panY = 0;
  applyTransform();
}

const galleryItems = [
  {
    id: "G1",
    title: "Decoración cumpleaños",
    cat: "decoracion",
    sub: "Globos + detalles cálidos",
    img: "assets/placeholders/cumple.jpg",
  },
  {
    id: "G2",
    title: "Decoración Grado (dorado)",
    cat: "decoracion",
    sub: "Elegante",
    img: "assets/placeholders/Grado.jpg",
  },
  {
    id: "G3",
    title: "Plato fuerte (ejemplo)",
    cat: "platos",
    sub: "Presentación tipo evento",
    img: "assets/placeholders/fuerte.jpg",
  },
  {
    id: "G4",
    title: "Tabla / entrada (ejemplo)",
    cat: "platos",
    sub: "Perfecto para compartir",
    img: "assets/placeholders/entrada.jpg",
  },
  {
    id: "G5",
    title: "Bebida (ejemplo)",
    cat: "bebidas",
    sub: "Fría y refrescante",
    img: "assets/placeholders/bebidas.jpg",
  },
    {
    id: "G6",
    title: "Decoración primera comunión",
    cat: "decoracion",
    sub: "Colores azul y blanco",
    img: "assets/placeholders/comunion.jpg",
  },
    {
    id: "G7",
    title: "Decoración de matrimonio",
    cat: "decoracion",
    sub: "Colores suaves y calidos",
    img: "assets/placeholders/matri.jpg",
  },
    {
    id: "G8",
    title: "Desayuno Sorpresa",
    cat: "desayuno",
    sub: "Colores suaves y calidos",
    img: "assets/placeholders/Desayuno.jpeg",
  },
];

let gFilter = "all";
let visibleGallery = [];
let modalList = [];
let modalIndex = 0;

function renderGallery() {
  if (!gallery) return;

  visibleGallery = gFilter === "all"
    ? galleryItems
    : galleryItems.filter(i => i.cat === gFilter);

  gallery.innerHTML = visibleGallery.map((i, idx) => `
    <article class="gItem" data-idx="${idx}">
      <img src="${i.img}" alt="${i.title}" loading="lazy"
           onerror="this.onerror=null;this.src='${FALLBACK_IMG}';" />
      <div class="gCap">${i.title}</div>
      <div class="gSub">${i.sub || ""}</div>
    </article>
  `).join("");
}

function updateModalNav() {
  if (!modal) return;
  const show = modalList.length > 1;
  modal.querySelectorAll(".modal__nav").forEach(btn => {
    btn.style.display = show ? "" : "none";
  });
}

function setModalByIndex(i) {
  if (!modalList.length || !modalImg || !modalCap) return;

  modalIndex = (i + modalList.length) % modalList.length;

  const item = modalList[modalIndex];
  modalImg.src = item.img;
  modalImg.alt = item.title || "";
  modalCap.textContent = item.sub ? `${item.title} — ${item.sub}` : (item.title || "");
  resetZoom();
  updateModalNav();
}

function openModal(item, list = null, idx = 0) {
  if (!modal) return;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  modalList = (Array.isArray(list) && list.length) ? list : [item];
  setModalByIndex(idx);
}

function closeModal() {
  if (!modal) return;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  resetZoom();

  modalList = [];
  modalIndex = 0;
}

function nextPhoto() { setModalByIndex(modalIndex + 1); }
function prevPhoto() { setModalByIndex(modalIndex - 1); }

modal?.addEventListener("click", (e) => {
  const nav = e.target.closest("[data-nav]");
  if (!nav) return;
  if (nav.dataset.nav === "next") nextPhoto();
  if (nav.dataset.nav === "prev") prevPhoto();
});

document.addEventListener("keydown", (e) => {
  if (!modal?.classList.contains("is-open")) return;
  if (e.key === "ArrowRight") nextPhoto();
  if (e.key === "ArrowLeft") prevPhoto();
  if (e.key === "Escape") closeModal();
});

if (galleryChips?.length) {
  galleryChips.forEach(ch => {
    ch.addEventListener("click", () => {
      galleryChips.forEach(c => c.classList.remove("is-active"));
      ch.classList.add("is-active");
      gFilter = ch.dataset.gfilter || "all";
      renderGallery();
    });
  });
}

gallery?.addEventListener("click", (e) => {
  const card = e.target.closest(".gItem");
  if (!card) return;

  const idx = Number(card.dataset.idx);
  if (Number.isNaN(idx)) return;

  openModal(visibleGallery[idx], visibleGallery, idx);
});

modal?.addEventListener("click", (e) => {
  const closeEl = e.target.closest("[data-close]");
  if (closeEl) closeModal();
});

modal?.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-zoom]");
  if (!btn) return;

  const action = btn.dataset.zoom;
  if (action === "+") zoom = clamp(zoom * 1.2, 1, 5);
  if (action === "-") zoom = clamp(zoom / 1.2, 1, 5);
  if (action === "reset") resetZoom();

  applyTransform();
});

modalImg?.addEventListener("wheel", (e) => {
  e.preventDefault();
  const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
  zoom = clamp(zoom * factor, 1, 5);
  applyTransform();
}, { passive: false });

modalImg?.addEventListener("click", () => {
  zoom = zoom === 1 ? 2 : 1;
  if (zoom === 1) {
    panX = 0;
    panY = 0;
  }
  applyTransform();
});

modalImg?.addEventListener("pointerdown", (e) => {
  if (zoom <= 1) return;
  isPanning = true;
  modalImg.setPointerCapture(e.pointerId);
  startX = e.clientX - panX;
  startY = e.clientY - panY;
  modalImg.style.cursor = "grabbing";
});

modalImg?.addEventListener("pointermove", (e) => {
  if (!isPanning) return;
  panX = e.clientX - startX;
  panY = e.clientY - startY;
  applyTransform();
});

modalImg?.addEventListener("pointerup", () => {
  isPanning = false;
  modalImg.style.cursor = zoom > 1 ? "grab" : "zoom-in";
});

modalImg?.addEventListener("pointercancel", () => {
  isPanning = false;
  modalImg.style.cursor = zoom > 1 ? "grab" : "zoom-in";
});

let pinchStartDist = null;
let pinchStartZoom = 1;

modalImg?.addEventListener("touchstart", (e) => {
  if (e.touches.length === 2) {
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    pinchStartDist = Math.hypot(dx, dy);
    pinchStartZoom = zoom;
  }
}, { passive: true });

modalImg?.addEventListener("touchmove", (e) => {
  if (e.touches.length === 2 && pinchStartDist) {
    e.preventDefault();
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    const dist = Math.hypot(dx, dy);
    zoom = clamp(pinchStartZoom * (dist / pinchStartDist), 1, 5);
    applyTransform();
  }
}, { passive: false });

modalImg?.addEventListener("touchend", () => {
  pinchStartDist = null;
});

/* ========= Catálogo ========= */
chips.forEach(ch => {
  ch.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("is-active"));
    ch.classList.add("is-active");
    renderCatalog(ch.dataset.filter);
  });
});

grid?.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const id = btn.dataset.id;
  const prod = products.find(p => p.id === id);
  if (!prod) return;

  if (btn.dataset.share) {
    const shareText = `Mira este producto de Delicias Amanda: ${prod.name}`;
    navigator.clipboard?.writeText(shareText);
    alert("Copiado para compartir ✅");
    return;
  }

  selectProduct(prod, true);
});

/* ========= Botones WhatsApp ========= */
document.getElementById("btnHeroWA")?.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".hero__card")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

document.getElementById("btnCardWA")?.addEventListener("click", () => {
  if (!validateMainQuoteForm()) return;
  openWA(buildCatalogMessage());
});

document.getElementById("btnFooterWA")?.addEventListener("click", (e) => {
  e.preventDefault();
  if (!validateQuickContactForm()) return;
  openWA(buildQuickContactMessage("Vengo desde la web 👍"));
});

document.getElementById("btnFormWA")?.addEventListener("click", () => {
  if (!validateQuickContactForm()) return;
  openWA(buildQuickContactMessage());
});

document.getElementById("fabWA")?.addEventListener("click", (e) => {
  e.preventDefault();
  openWA("Hola, quiero información sobre sus servicios.");
});

/* Año */
document.getElementById("year").textContent = new Date().getFullYear();

/* Menú móvil */
const burger = document.getElementById("burger");
const mobile = document.getElementById("mobile");

burger?.addEventListener("click", () => {
  const open = mobile?.style.display === "flex";
  if (mobile) {
    mobile.style.display = open ? "none" : "flex";
  }
});

/* ========= Menú completo ========= */
/* ========= Menú completo ========= */
const menuCats = document.getElementById("menuCats");
const menuList = document.getElementById("menuList");
const menuSearch = document.getElementById("menuSearch");

const ALL = "__ALL__";
let activeCat = ALL;

const HIDDEN_MENU_TITLES = new Set([
  "EN EL MENU DE VEGETARIANOS CORREGIR"
]);

const MENU_TITLE_ALIAS = {
  "DE 2": "Refrigerios de 2 opciones",
  "DE 3": "Refrigerios de 3 opciones",
  "MENUS VEGETARIANOS": "Menús vegetarianos",
  "PLATOS FUERTES AVES": "Aves",
  "PLATOS FUERTES COMIDA MARINERA": "Comida marinera",
  "CARNE DE RES": "Res",
  "CARNE DE CERDO": "Cerdo",
  "PLATOS ALTERNATIVOS O INTERMEDIOS": "Alternativos e intermedios",
  "ENSALADAS ACOMPAÑADAS DE ROLLOS HOJALDRADOS": "Con rollos hojaldrados",
  "ENSALADAS ACOMPAÑADAS DE VOLAUVENT´S": "Con volauvent's",
  "ENSALADAS ACOMPAÑADAS DE CANASTILLAS DE PAPA": "Con canastillas de papa",
  "ENSALADAS ACOMPAÑADA DE PASTELES": "Con pasteles",
  "PARA LAS ENTRADAS AGREGAR CREMAS": "Cremas para acompañar",
  "PAELLA CON FIDEOS GRUESOS": "Paellas y espaguetis",
  "TABLA DE QUESOS": "Tabla de quesos",
  "TABLA DE CARNES": "Tabla de carnes",
  "TABLA MIXTA": "Tabla mixta",
  "CARNES PARA PLATOS FUERTES AVES": "Corte base para aves"
};

const MENU_GROUPS = [
  {
    key: "desayunos",
    label: "Desayunos y refrigerios",
    sections: ["DE 2", "DE 3", "DESAYUNOS"]
  },
  {
    key: "entradas",
    label: "Entradas",
    sections: ["ENTRADAS", "PARA LAS ENTRADAS AGREGAR CREMAS"]
  },
  {
    key: "platos-fuertes",
    label: "Platos fuertes",
    sections: [
      "PLATOS FUERTES AVES",
      "PLATOS FUERTES COMIDA MARINERA",
      "CARNE DE RES",
      "CARNE DE CERDO",
      "PLATOS TIPICOS",
      "ASADOS",
      "CARNES PARA PLATOS FUERTES AVES"
    ]
  },
  {
    key: "ensaladas",
    label: "Ensaladas",
    sections: [
      "ENSALADAS",
      "PLATOS ALTERNATIVOS O INTERMEDIOS",
      "ENSALADAS ACOMPAÑADAS DE ROLLOS HOJALDRADOS",
      "ENSALADAS ACOMPAÑADAS DE VOLAUVENT´S",
      "ENSALADAS ACOMPAÑADAS DE CANASTILLAS DE PAPA",
      "ENSALADAS ACOMPAÑADA DE PASTELES"
    ]
  },
  {
    key: "bebidas",
    label: "Bebidas",
    sections: ["BEBIDAS", "JUGOS NATURALES", "COCTELES"]
  },
  {
    key: "vegetarianos",
    label: "Vegetarianos",
    sections: ["MENUS VEGETARIANOS"]
  },
  {
    key: "pastas-arroces",
    label: "Pastas y arroces",
    sections: [
      "CREPES",
      "ARROCES",
      "PASTAS",
      "MACARRONES",
      "CANELONES",
      "PAELLA CON FIDEOS GRUESOS",
      "TALLARINES",
      "RAVIOLES"
    ]
  },
  {
    key: "vinos-tablas",
    label: "Vinos y tablas",
    sections: ["VINOS", "TABLA DE QUESOS", "TABLA DE CARNES", "TABLA MIXTA"]
  }
];

const FEATURED_MENU_GROUP_KEYS = [
  "desayunos",
  "entradas",
  "platos-fuertes",
  "ensaladas",
  "bebidas",
  "vegetarianos"
];

function normalizeText(value = "") {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function contains(q, text) {
  return normalizeText(text).includes(normalizeText(q));
}

function cleanMenuSections() {
  return MENU
    .filter(sec => !HIDDEN_MENU_TITLES.has(sec.title))
    .map(sec => ({
      ...sec,
      items: [...new Set((sec.items || []).map(it => it.trim()).filter(Boolean))]
    }));
}

const CLEAN_MENU = cleanMenuSections();
const MENU_BY_TITLE = new Map(CLEAN_MENU.map(sec => [sec.title, sec]));

function getMenuSectionLabel(title = "") {
  return MENU_TITLE_ALIAS[title] || title;
}

function makeChip(label, value, active) {
  const b = document.createElement("button");
  b.className = "chip" + (active ? " is-active" : "");
  b.textContent = label;
  b.dataset.cat = value;
  b.type = "button";
  return b;
}

function getGroupByKey(key) {
  return MENU_GROUPS.find(g => g.key === key);
}

function getVisibleItems(sec, q) {
  if (!q) return sec.items;
  return sec.items.filter(it => contains(q, it));
}

function getSectionsForGroup(groupKey, q = "") {
  const group = getGroupByKey(groupKey);
  if (!group) return [];

  return group.sections
    .map(title => MENU_BY_TITLE.get(title))
    .filter(Boolean)
    .map(sec => {
      const visibleItems = getVisibleItems(sec, q);
      const displayTitle = getMenuSectionLabel(sec.title);

      const matchesSection =
        !q ||
        contains(q, sec.title) ||
        contains(q, displayTitle);

      return {
        ...sec,
        displayTitle,
        visibleItems,
        matchesSection
      };
    })
    .filter(sec => {
      if (!q) return true;
      return sec.matchesSection || sec.visibleItems.length > 0;
    });
}

function getGroupCount(sections) {
  return sections.reduce((acc, sec) => acc + sec.visibleItems.length, 0);
}

function renderMenu() {
  if (!menuList) return;

  const q = (menuSearch?.value || "").trim();
  menuList.innerHTML = "";

  const groupKeysToRender =
    activeCat === ALL
      ? MENU_GROUPS.map(g => g.key)
      : [activeCat];

  const groupsToRender = groupKeysToRender
    .map(key => {
      const group = getGroupByKey(key);
      const sections = getSectionsForGroup(key, q);
      return {
        ...group,
        sections,
        total: getGroupCount(sections)
      };
    })
    .filter(group => group && group.sections.length > 0);

  if (!groupsToRender.length) {
    const div = document.createElement("div");
    div.className = "menuEmpty";
    div.textContent = "No se encontraron resultados con ese filtro o búsqueda.";
    menuList.appendChild(div);
    return;
  }

  groupsToRender.forEach(group => {
    const article = document.createElement("article");
    article.className = "menuGroup";

    const head = document.createElement("div");
    head.className = "menuGroup__head";
    head.innerHTML = `
      <div>
        <p class="menuGroup__eyebrow">Categoría</p>
        <h3>${group.label}</h3>
      </div>
      <span class="menuGroup__count">${group.total} opciones</span>
    `;

    const subgrid = document.createElement("div");
    subgrid.className = "menuGroup__subgrid";

    group.sections.forEach((sec, idx) => {
      const details = document.createElement("details");
      details.className = "menuSection";

      const shouldOpen =
        q.length > 0 ||
        (activeCat !== ALL && idx === 0) ||
        group.sections.length === 1;

      details.open = shouldOpen;

      const summary = document.createElement("summary");
      summary.innerHTML = `
        <span class="menuSection__title">${sec.displayTitle}</span>
        <span class="menuSection__count">${sec.visibleItems.length} ítems</span>
      `;

      const body = document.createElement("div");
      body.className = "menuBody";

      const ul = document.createElement("ul");

      sec.visibleItems.forEach(it => {
        const li = document.createElement("li");
        li.textContent = it;
        ul.appendChild(li);
      });

      body.appendChild(ul);
      details.appendChild(summary);
      details.appendChild(body);
      subgrid.appendChild(details);
    });

    article.appendChild(head);
    article.appendChild(subgrid);
    menuList.appendChild(article);
  });
}

function renderMenuCats() {
  if (!menuCats) return;

  menuCats.innerHTML = "";
  menuCats.appendChild(makeChip("Todo", ALL, activeCat === ALL));

  FEATURED_MENU_GROUP_KEYS.forEach(key => {
    const group = getGroupByKey(key);
    if (!group) return;
    menuCats.appendChild(makeChip(group.label, key, activeCat === key));
  });

  const moreBtn = document.createElement("button");
  moreBtn.className = "chip";
  moreBtn.type = "button";
  moreBtn.textContent = "Más categorías";

  let expandedCats = false;

  moreBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    expandedCats = !expandedCats;

    [...menuCats.querySelectorAll('[data-extra-cat="1"]')].forEach(el => el.remove());

    if (expandedCats) {
      MENU_GROUPS
        .filter(g => !FEATURED_MENU_GROUP_KEYS.includes(g.key))
        .forEach(group => {
          const chip = makeChip(group.label, group.key, activeCat === group.key);
          chip.dataset.extraCat = "1";
          menuCats.appendChild(chip);
        });

      moreBtn.textContent = "Menos categorías";
    } else {
      moreBtn.textContent = "Más categorías";
    }
  });

  menuCats.appendChild(moreBtn);

  menuCats.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn || !btn.dataset.cat) return;

    activeCat = btn.dataset.cat;

    [...menuCats.querySelectorAll(".chip")].forEach(c => c.classList.remove("is-active"));
    btn.classList.add("is-active");

    renderMenu();
  });
}

menuSearch?.addEventListener("input", () => renderMenu());

/* ========= Menús PDF ========= */
const pdfCats = document.getElementById("pdfCats");
const pdfList = document.getElementById("pdfList");
const pdfSearch = document.getElementById("pdfSearch");

const PDF_ALL = "__ALL__";
let activePdfCat = PDF_ALL;

function makePdfChip(label, value, active) {
  const b = document.createElement("button");
  b.className = "chip" + (active ? " is-active" : "");
  b.textContent = label;
  b.dataset.pdfcat = value;
  return b;
}

function renderPdfCats() {
  if (!pdfCats) return;

  pdfCats.innerHTML = "";
  pdfCats.appendChild(makePdfChip("Todo", PDF_ALL, true));

  (PDF_CATEGORIES || []).forEach(cat => {
    pdfCats.appendChild(makePdfChip(cat, cat, false));
  });

  pdfCats.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    activePdfCat = btn.dataset.pdfcat;
    [...pdfCats.querySelectorAll(".chip")].forEach(c => c.classList.remove("is-active"));
    btn.classList.add("is-active");
    renderPdfMenus();
  });
}

function renderPdfMenus() {
  if (!pdfList) return;

  const q = (pdfSearch?.value || "").trim().toLowerCase();

  const list = (PDF_MENUS || []).filter(p => {
    const catOk = activePdfCat === PDF_ALL ? true : p.category === activePdfCat;
    if (!catOk) return false;
    if (!q) return true;
    return (p.title || "").toLowerCase().includes(q) ||
           (p.category || "").toLowerCase().includes(q) ||
           (p.desc || "").toLowerCase().includes(q);
  });

  pdfList.innerHTML = "";

  if (!list.length) {
    const div = document.createElement("div");
    div.className = "menuEmpty";
    div.textContent = "No se encontraron PDFs con ese filtro / búsqueda.";
    pdfList.appendChild(div);
    return;
  }

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "pdfCard";
    const thumb = p.thumb || "assets/placeholders/food.svg";

    card.innerHTML = `
      <div class="pdfThumbWrap">
        <img class="pdfThumbWide"
             src="${thumb}"
             alt="Foto del menú: ${p.title}"
             data-title="${p.title}"
             data-sub="${p.category}"
             loading="lazy"
             onerror="this.onerror=null;this.src='${FALLBACK_IMG}';" />
        <div class="pdfBadge">${p.category}</div>
      </div>

      <div class="pdfCardContent">
        <h3 class="pdfTitle">${p.title}</h3>
        <p class="pdfDesc">${p.desc || ""}</p>

        <div class="pdfActions">
          <a class="btn2" href="${p.file}" target="_blank" rel="noopener">Abrir</a>
          <a class="btn2" href="${p.file}" download>Descargar</a>
        </div>
      </div>
    `;
    pdfList.appendChild(card);
  });
}

pdfList?.addEventListener("click", (e) => {
  const img = e.target.closest(".pdfThumbWide");
  if (!img) return;

  openModal({
    img: img.src,
    title: img.dataset.title || "Menú",
    sub: img.dataset.sub || ""
  });
});

pdfSearch?.addEventListener("input", () => renderPdfMenus());

/* ========= Init ========= */
renderCatalog("all");
renderGallery();
renderMenuCats();
renderMenu();
renderPdfCats();
renderPdfMenus();
updatePickedProductUI();

if (DOC_NOTES?.length) {
  console.log("Notas internas del documento (revisión):", DOC_NOTES);
}

/* ========= Hero slider ========= */
const sliderImgs = [
  "assets/hero/1.jpeg",
  "assets/hero/2.jpeg",
  "assets/hero/3.jpeg",
  "assets/hero/4.jpg",
  "assets/hero/5.jpeg",
  "assets/hero/6.jpeg",
  "assets/hero/7.jpeg",
  "assets/hero/8.jpg",
  "assets/hero/9.jpeg",
  "assets/hero/10.jpeg",
  "assets/hero/11.jpeg",
  "assets/hero/12.jpeg",
  "assets/hero/13.jpeg",
  "assets/hero/14.jpeg",
  "assets/hero/15.jpeg",
  "assets/hero/16.jpeg",
  "assets/hero/17.jpg",
  "assets/hero/18.jpg",
  "assets/hero/19.jpeg",
  "assets/hero/20.jpg",
  "assets/hero/21.jpeg",
  "assets/hero/22.jpeg",
  "assets/hero/23.jpg",
  "assets/hero/24.jpg",
  "assets/hero/25.jpg",
  "assets/hero/26.jpg",
];

const imgEl = document.getElementById("heroSlideImg");
const dotsEl = document.getElementById("heroDots");

let slideIdx = 0;
let slideTimer = null;

function renderDots() {
  if (!dotsEl) return;

  dotsEl.innerHTML = sliderImgs
    .map((_, i) => `<button type="button" class="${i === slideIdx ? "is-active" : ""}" data-i="${i}" aria-label="Slide ${i + 1}"></button>`)
    .join("");

  dotsEl.querySelectorAll("button").forEach((b) => {
    b.addEventListener("click", () => {
      slideIdx = Number(b.dataset.i);
      showSlide();
      restartTimer();
    });
  });
}

function showSlide() {
  if (!imgEl) return;
  imgEl.src = sliderImgs[slideIdx];
}

function nextSlide() {
  slideIdx = (slideIdx + 1) % sliderImgs.length;
  showSlide();
  renderDots();
}

function restartTimer() {
  clearInterval(slideTimer);
  slideTimer = setInterval(nextSlide, 3500);
}

if (imgEl) {
  sliderImgs.forEach((src) => {
    const im = new Image();
    im.src = src;
  });

  showSlide();
  renderDots();
  restartTimer();
}