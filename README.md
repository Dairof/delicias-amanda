# Delicias Amanda — Organización de contenido

## Carpetas
- assets/fotos/          → tus fotos reales (platos, decoraciones, bebidas)
- assets/pdfs/           → menús en PDF (nombres sin espacios)
- assets/placeholders/   → imágenes de ejemplo (puedes borrarlas cuando tengas fotos reales)

## Editar sin tocar todo
1) styles.css  → colores / tipografías / tamaño
2) script.js   → catálogo, galería, WhatsApp
3) pdfIndex.js → lista de PDFs (título, categoría, descripción)

## Agregar un nuevo PDF
1) Copia el PDF a: assets/pdfs/
2) Abre pdfIndex.js y agrega un objeto:
   {
     "id": "PDF19",
     "title": "Nombre del menú",
     "category": "Categoría",
     "file": "assets/pdfs/archivo.pdf",
     "desc": "Descripción corta"
   }

## Agregar fotos
- Pon tus imágenes en assets/fotos/
- En script.js, cambia img: "assets/fotos/tu-foto.jpg"
