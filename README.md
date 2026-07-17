# FlexOffers MCP Server 🐝

MCP server para la API de FlexOffers v3. Expone los endpoints más útiles como tools para Claude Desktop, Cursor, Windsurf, o cualquier cliente compatible con MCP.

## Instalación

```bash
cd flexoffers-mcp
npm install
npm run build
```

## Configuración

### Claude Desktop

Edita `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "flexoffers": {
      "command": "node",
      "args": ["/ruta/absoluta/a/flexoffers-mcp/dist/index.js"],
      "env": {
        "FLEXOFFERS_API_KEY": "tu_api_key_aqui"
      }
    }
  }
}
```

### Cursor / Windsurf

Agrega al archivo de configuración MCP del IDE:

```json
{
  "mcpServers": {
    "flexoffers": {
      "command": "node",
      "args": ["/ruta/absoluta/a/flexoffers-mcp/dist/index.js"],
      "env": {
        "FLEXOFFERS_API_KEY": "tu_api_key_aqui"
      }
    }
  }
}
```

### Dev (sin compilar)

```bash
FLEXOFFERS_API_KEY=xxx npm run dev
```

## Tools disponibles

| Tool | Descripción |
|------|-------------|
| `fo_list_advertisers` | Lista/busca programas de afiliados con filtros |
| `fo_get_categories` | Obtiene todas las categorías |
| `fo_get_featured_advertisers` | Anunciantes destacados |
| `fo_list_promotions` | Cupones y promociones activas |
| `fo_get_promotion_types` | Tipos de promoción disponibles |
| `fo_search_products` | Busca productos en el catálogo |
| `fo_search_products_full` | Productos con datos completos (precio, descuentos) |
| `fo_list_catalogs` | Lista catálogos de productos disponibles |
| `fo_count_products` | Cuenta productos antes de un pull masivo |
| `fo_generate_deeplink` | Genera un link de afiliado monetizado |
| `fo_list_cards` | Ofertas de tarjetas de crédito |
| `fo_get_payment_summary` | Resumen de pagos por periodo |
| `fo_get_payment_details` | Detalle de pagos por anunciante |
| `fo_list_all_sales` | Lista ventas de `/allsales` por rango de fechas |
| `fo_export_report` | Exporta reporte de clicks o ventas (CSV) |

## Ejemplos de uso (en Claude)

```
¿Cuáles son mis advertisers aprobados en la categoría de electrónicos?
→ usa fo_list_advertisers con ProgramStatus=Approved

Dame los mejores cupones activos de hoy
→ usa fo_list_promotions con couponsOnly=true y startDate de hoy

Genera un deeplink para https://amazon.com/producto/123
→ usa fo_generate_deeplink

¿Cuánto gané en marzo 2026?
→ usa fo_get_payment_summary con startdate=03/01/2026 enddate=03/31/2026

Trae las ventas de ayer con detalle de productos
→ usa fo_list_all_sales con status=all, reportType=details, startDate=07/16/2026, endDate=07/16/2026, dateType=eventDate, page=1, pageSize=500
```
