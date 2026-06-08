# Proyecto 02 — Dashboard de Productos

**Materia:** Desarrollo de Aplicaciones Web · **Código:** [código de la materia]
**Estudiante:** Alejandro Tapia
**Fecha:** 1 de junio de 2026

---

## Contenido

1. [Análisis](#análisis)
2. [Planificación](#planificación)
3. [Diseño](#diseño)
4. [Implementación](#implementación)
5. [Despliegue](#despliegue)
6. [Bibliografía](#bibliografía)

---

## Análisis

El proyecto consiste en el desarrollo de un **dashboard interactivo** orientado a la exploración, visualización e interpretación de datos de un dataset de e-commerce obtenido desde Kaggle. La aplicación se desarrolla con **React** y se conectará a **Firebase** para la gestión y el consumo de los datos.

### Descripción del dataset

Dataset: **«Online Sales Dataset - Popular Marketplace Data»**, disponible en Kaggle. Contiene **240 transacciones** de ventas en línea de un marketplace, distribuidas en **9 columnas** con variables categóricas y numéricas que permiten realizar comparaciones, agrupaciones y visualizaciones estadísticas significativas.

- **URL del dataset:** https://www.kaggle.com/datasets/shreyanshverma27/online-sales-dataset-popular-marketplace-data
- **Identificador y fecha:** Transaction ID, Date.
- **Variables categóricas:** Product Category (categoría: 6 valores — Beauty Products, Books, Clothing, Electronics, Home Appliances, Sports), Product Name (nombre del producto), Region (3 valores — Asia, Europe, North America) y Payment Method (método de pago).
- **Variables numéricas:** Unit Price (precio unitario), Units Sold (unidades vendidas) y Total Revenue (ingreso total de la transacción).

### Utilidad y justificación

El dashboard permite visualizar cómo se distribuyen los ingresos por categoría y por región, qué categorías generan más ventas y cuáles son los indicadores resumen del periodo, además de un detalle de las ventas con filtros interactivos. Se seleccionó este dataset porque está contenido en un único archivo CSV, es fácil de interpretar y reúne las variables categóricas y numéricas necesarias para generar indicadores y gráficos comparativos.

### Perfil del usuario

El dashboard está dirigido a un **administrador de tienda o analista comercial** que necesita comprender rápidamente el comportamiento del catálogo: identificar rangos de precios frecuentes, comparar categorías y conocer indicadores resumen (precio promedio, total de productos, número de categorías) para apoyar la toma de decisiones.

---

## Planificación

Se definieron las variables del dataset, la necesidad de información del usuario y el tipo de visualización más adecuado para responder a cada necesidad, así como los indicadores que resumen la información de forma rápida y comprensible.

### Tabla 1. Justificación de variables, necesidades y tipo de visualización

| Variables | Necesidad del usuario | Tipo de visualización |
|---|---|---|
| Total Revenue (numérica) + Product Category (categórica) | Comparar los ingresos generados por cada categoría e identificar cuáles predominan. | Gráfico de barras |
| Total Revenue (numérica) + Region (categórica) | Conocer la participación de cada región en los ingresos totales. | Gráfico de pastel |
| Product Category, Region, Payment Method (categóricas) | Acotar el análisis a un subconjunto de ventas según criterios del usuario. | Filtros interactivos (selectores) |

### Tabla 2. Justificación de indicadores con necesidades del usuario

| Indicador | Variables involucradas | Necesidad del usuario |
|---|---|---|
| Transacciones | (conteo de registros) | Conocer cuántas ventas componen la vista actual. |
| Precio promedio | Unit Price (numérica) | Conocer el valor promedio de los productos para tener una referencia general de precios. |
| Número de categorías | Product Category (categórica) | Saber en cuántas categorías se distribuyen las ventas. |
| Ingresos totales | Total Revenue (numérica) | Conocer el monto total generado por las ventas registradas. |

---

## Diseño

Se elaboró la estructura general de la interfaz del dashboard, estableciendo la distribución de los gráficos, indicadores, filtros interactivos y secciones de navegación. El diseño prioriza la **claridad visual**, la **organización de la información**, la **facilidad de uso** y la **adaptación a diferentes tamaños de pantalla** (diseño responsive), garantizando una experiencia de usuario intuitiva y accesible.

### Estructura de la interfaz (mockup)

La maqueta se implementó como una aplicación web en React con la librería de componentes **Material-UI (MUI)**. En esta fase la interfaz es únicamente visual: los gráficos se representan mediante recuadros de marcador de posición (*placeholders*), sin datos ni funcionalidad real, que serán reemplazados por gráficos dinámicos en la fase de implementación.

La interfaz se organiza en las siguientes secciones:

- **Encabezado:** título del dashboard, identidad visual y accesos rápidos.
- **Alertas:** mensaje informativo sobre el estado de la vista.
- **Panel de filtros (selector):** controles para filtrar por categoría, región, rango de precio y método de pago.
- **Indicadores (KPIs):** transacciones, precio promedio, número de categorías e ingresos totales.
- **Gráficos:** ingresos por categoría (barras) e ingresos por región (pastel).
- **Tabla:** detalle de las ventas.
- **Información adicional:** descripción del dataset y sus variables.

### Consideraciones de diseño responsive

Se utilizó el sistema de rejilla (**Grid**) de Material-UI con puntos de quiebre (*breakpoints*). En pantallas de escritorio el panel de filtros se muestra como columna lateral junto al contenido principal; en pantallas pequeñas pasa a ocupar el ancho completo y las secciones se apilan verticalmente.

---

## Implementación

En esta fase la maqueta se convirtió en una aplicación funcional conectada a una base de datos en la nube, reemplazando los marcadores de posición por gráficos, indicadores y filtros que operan sobre datos reales.

### Carga de datos en Firebase (Firestore)

El dataset se descargó de Kaggle y se transformó de CSV a JSON normalizando los nombres de campo a *camelCase* (`transactionId`, `date`, `category`, `productName`, `unitsSold`, `unitPrice`, `totalRevenue`, `region`, `paymentMethod`). Mediante un script de carga (`scripts/uploadToFirestore.mjs`) las **240 transacciones** se subieron a la colección **`sales`** de **Cloud Firestore** del proyecto `dashboard-react-aedef`, usando el `transactionId` como identificador de cada documento para evitar duplicados.

### Conexión del dashboard con Firestore

La conexión se inicializa en `src/firebase.ts` con la configuración del proyecto. Un *hook* personalizado (`src/useSales.ts`) lee la colección `sales` una sola vez al cargar la aplicación y expone los datos junto con los estados de **carga** (indicador de progreso) y **error** (alerta), garantizando una experiencia controlada ante fallos de red.

### Indicadores, gráficos y filtros dinámicos

- **Indicadores (KPIs):** se calculan en tiempo real a partir de las ventas filtradas (número de transacciones, precio promedio, número de categorías e ingresos totales).
- **Gráficos:** desarrollados con la librería **@mui/x-charts** — un gráfico de barras de *ingresos por categoría* y un gráfico de pastel de *ingresos por región*.
- **Filtros interactivos:** selectores de categoría, región y método de pago cuyas opciones se generan automáticamente a partir del dataset. Al cambiar un filtro se recalculan en vivo los KPIs, los gráficos y la tabla.
- **Tabla:** detalle de las ventas con paginación.

### Tecnologías utilizadas

React 19, TypeScript, Material-UI (MUI), @mui/x-charts, Firebase / Cloud Firestore y Vite como herramienta de construcción.

---

## Despliegue

*Pendiente.* La aplicación se desplegará en GitHub Pages (https://alejandrotapia20.github.io/dashboard) una vez completada la implementación.

---

## Bibliografía

- Kaggle: The World's AI Proving Ground. (s. f.). Recuperado de https://www.kaggle.com/
- Verma, S. (s. f.). *Online Sales Dataset - Popular Marketplace Data.* Kaggle. Recuperado de https://www.kaggle.com/datasets/shreyanshverma27/online-sales-dataset-popular-marketplace-data
- Habib, J. M. (2024, septiembre 17). *Understanding Types of Variables in Data Science: Numerical and Categorical.* Medium.
- Search for Charts by Data Visualization Functions. (s. f.). Recuperado de https://datavizcatalogue.com/search.html
- Holtz, Y., & Healy, C. (s. f.). *From Data to Viz.* Recuperado de https://www.data-to-viz.com/
