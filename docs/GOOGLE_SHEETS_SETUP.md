# 📊 Configuración de Google Sheets para CRM Automático

Esta guía te ayudará a configurar la integración directa con Google Sheets para que los leads del Diagnóstico 3D se guarden automáticamente en tiempo real.

## ✅ Ventajas vs N8N

- ✅ **Automático y en tiempo real** - No depende de servicios externos
- ✅ **Sin costo adicional** - No necesitas pagar por N8N/Zapier
- ✅ **Más rápido** - Escribe directo en Sheets sin intermediarios
- ✅ **Más confiable** - No depende de webhooks o polling
- ✅ **Datos estructurados** - Columnas perfectamente ordenadas

---

## 🔧 Pasos de Configuración

### 1. Crear Service Account en Google Cloud

1. **Ve a** [Google Cloud Console](https://console.cloud.google.com)
2. **Selecciona o crea** un proyecto
3. **Ve a** "IAM & Admin" → "Service Accounts"
4. **Clic en** "Create Service Account"
5. **Nombre**: `impulsa-lab-crm` (o el que prefieras)
6. **Descripción**: "Service account for CRM automation"
7. **Clic en** "Create and Continue"
8. **Rol**: No necesitas asignar roles de proyecto
9. **Clic en** "Done"

### 2. Generar Credenciales JSON

1. **Encuentra** el service account que acabas de crear
2. **Clic en** los 3 puntos (⋮) → "Manage Keys"
3. **Clic en** "Add Key" → "Create new key"
4. **Selecciona** "JSON"
5. **Descarga** el archivo JSON (guárdalo en un lugar seguro)

El archivo JSON tiene esta estructura:
```json
{
  "type": "service_account",
  "project_id": "tu-proyecto",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "impulsa-lab-crm@tu-proyecto.iam.gserviceaccount.com",
  ...
}
```

### 3. Crear Google Sheet

1. **Ve a** [Google Sheets](https://sheets.google.com)
2. **Crea** un nuevo spreadsheet
3. **Nómbralo**: "ImpulsaLab - Leads CRM"
4. **Renombra la primera hoja** a: `Leads` (importante, debe ser exactamente "Leads")
5. **Copia el ID** del spreadsheet de la URL:
   ```
   https://docs.google.com/spreadsheets/d/[ESTE_ES_EL_ID]/edit
   ```

### 4. Compartir el Sheet con el Service Account

1. **Clic en** "Compartir" (botón verde en la esquina superior derecha)
2. **Pega** el email del service account (del archivo JSON: `client_email`)
   - Ejemplo: `impulsa-lab-crm@tu-proyecto.iam.gserviceaccount.com`
3. **Selecciona** permisos de "Editor"
4. **Desmarca** "Notify people" (no es necesario enviar email)
5. **Clic en** "Share"

### 5. Configurar Variables de Entorno en Vercel

1. **Ve a** tu proyecto en Vercel → Settings → Environment Variables
2. **Agrega estas 4 variables**:

```bash
# Email del service account (del archivo JSON)
GOOGLE_SHEETS_CLIENT_EMAIL=impulsa-lab-crm@tu-proyecto.iam.gserviceaccount.com

# Private key del service account (del archivo JSON)
# IMPORTANTE: Copia TODO el contenido incluyendo -----BEGIN y -----END
GOOGLE_SHEETS_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
-----END PRIVATE KEY-----

# ID del spreadsheet (de la URL)
GOOGLE_SHEETS_SPREADSHEET_ID=1abc123def456ghi789jkl

# Token secreto para inicializar headers (genera uno random)
INIT_SHEETS_SECRET_TOKEN=tu-token-super-secreto-aqui
```

**⚠️ IMPORTANTE para GOOGLE_SHEETS_PRIVATE_KEY:**
- Copia el valor EXACTO del campo `private_key` del archivo JSON
- Incluye las líneas `-----BEGIN PRIVATE KEY-----` y `-----END PRIVATE KEY-----`
- Mantén los saltos de línea (`\n`)

3. **Aplica** a todos los entornos (Production, Preview, Development)
4. **Redeploy** tu aplicación

### 6. Inicializar Headers del Sheet

1. **Abre** una terminal o Postman
2. **Ejecuta** este comando:

```bash
curl -X POST https://tuimpulsalab.com/api/diagnostic/init-sheets \
  -H "Authorization: Bearer tu-token-super-secreto-aqui"
```

3. **Deberías ver** una respuesta como:
```json
{
  "success": true,
  "message": "Headers del Google Sheet inicializados correctamente",
  "columns": [...]
}
```

4. **Verifica** que tu Google Sheet ahora tiene los headers en la primera fila:
   - Fecha | Nombre | Email | Teléfono | Empresa | etc.

---

## 📋 Estructura del Google Sheet

Después de inicializar, tu sheet tendrá estas columnas:

| A | B | C | D | E | F | G | H | I | J | K | L | M |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Fecha | Nombre | Email | Teléfono | Empresa | Industria | Empleados | Score Finanzas | Score Operaciones | Score Marketing | Score Promedio | Origen | Timestamp Creación |

### Ejemplo de datos:
| Fecha | Nombre | Email | Teléfono | Empresa | Industria | Empleados | Score Finanzas | Score Operaciones | Score Marketing | Score Promedio | Origen | Timestamp |
|-------|--------|-------|----------|---------|-----------|-----------|----------------|-------------------|-----------------|----------------|--------|-----------|
| 2026-01-06 | Juan Pérez | juan@example.com | 555-1234 | Antology | Alimentos | 50 | 75 | 82 | 68 | 75 | Registrado | 2026-01-06T10:30:00Z |

---

## 🧪 Probar la Integración

1. **Completa** un Diagnóstico 3D en tu sitio
2. **Confirma** los datos en el paso de confirmación
3. **Verifica** que:
   - ✅ Recibes el correo de reporte
   - ✅ El admin recibe el correo con JSON
   - ✅ **NUEVO: Los datos aparecen automáticamente en Google Sheets**

---

## 🔍 Troubleshooting

### Error: "Credentials not configured"
- **Solución**: Verifica que las 3 variables de entorno estén configuradas en Vercel

### Error: "The caller does not have permission"
- **Solución**: Asegúrate de compartir el Google Sheet con el email del service account

### Error: "Unable to parse range: Leads!A:M"
- **Solución**: Verifica que la hoja se llame exactamente "Leads" (no "Sheet1")

### Private key error
- **Solución**: Asegúrate de copiar el `private_key` completo del JSON, incluyendo:
  - `-----BEGIN PRIVATE KEY-----`
  - Todo el contenido
  - `-----END PRIVATE KEY-----`
  - Los `\n` deben permanecer como `\n` literalmente

### No aparecen datos en el sheet
- **Verifica** los logs de Vercel para ver si hay errores
- **Asegúrate** de que el spreadsheet ID sea correcto
- **Verifica** que la hoja se llame "Leads"

---

## 📊 Opcional: Dashboard y Análisis

Una vez que tengas datos en Google Sheets, puedes:

1. **Crear gráficos** directamente en Sheets para visualizar:
   - Leads por fecha
   - Distribución de scores
   - Industrias más comunes
   - Tasa de conversión

2. **Conectar con Google Data Studio** para dashboards profesionales

3. **Usar fórmulas** para análisis automático:
   ```excel
   =COUNTIF(B:B,"*@*")  // Total de leads
   =AVERAGE(K:K)         // Score promedio
   =COUNTIF(F:F,"Tecnología")  // Leads de tecnología
   ```

---

## ✅ Listo!

Ahora cada vez que un lead complete el Diagnóstico 3D:
1. ✉️ Recibe su reporte por email
2. ✉️ El admin recibe notificación con JSON
3. 📊 **Los datos se guardan automáticamente en Google Sheets**

**No necesitas N8N, Zapier ni ninguna herramienta externa.** Todo es automático y en tiempo real! 🚀
