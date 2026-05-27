export type ComplianceType = 'privacy' | 'terms' | 'cookies' | 'aml' | 'inan'
export type Jurisdiction = 'PY' | 'UY' | 'EU'

export interface ComplianceDoc {
  type: ComplianceType
  jurisdiction: Jurisdiction
  title: string
  content: string
}

function tpl(str: string, vars: Record<string, string>) {
  return str.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] || `{{${k}}}`)
}

export function privacyPolicy(vars: { businessName: string; domain: string; email: string; address?: string; phone?: string }): ComplianceDoc {
  return {
    type: 'privacy',
    jurisdiction: 'PY',
    title: `Política de Privacidad - ${vars.businessName}`,
    content: tpl(`# Política de Privacidad

**Última actualización:** {{date}}

## 1. Identificación del Responsable
- **Nombre:** {{businessName}}
- **Dominio:** {{domain}}
- **Correo:** {{email}}
- **Dirección:** {{address}}
- **Teléfono:** {{phone}}

## 2. Datos que Recopilamos
- Información de contacto (nombre, email, teléfono)
- Datos de navegación (cookies, páginas visitadas)
- Información de compras y transacciones

## 3. Finalidad del Tratamiento
- Proveer nuestros servicios y productos
- Comunicación con el cliente
- Mejora de nuestros servicios
- Cumplimiento de obligaciones legales

## 4. Base Legal
- Consentimiento del titular
- Ejecución de un contrato
- Cumplimiento de obligaciones legales (Ley 1682/01 - Paraguay)

## 5. Derechos del Usuario
- Acceso, rectificación, cancelación y oposición (ARCO)
- Portabilidad de datos
- Revocación del consentimiento

## 6. Conservación de Datos
Conservamos sus datos mientras sea necesario para los fines descritos o mientras exista una obligación legal.

## 7. Seguridad
Implementamos medidas técnicas y organizativas para proteger sus datos personales.

## 8. Cookies
Utilizamos cookies esenciales para el funcionamiento del sitio. Puede configurar su navegador para rechazarlas.

## 9. Contacto
Para ejercer sus derechos o cualquier consulta: {{email}}

## 10. Legislación Aplicable
Esta política se rige por la legislación de la República del Paraguay.`, { ...vars, date: new Date().toLocaleDateString('es-PY') }),
  }
}

export function cookiesPolicy(vars: { businessName: string; domain: string }): ComplianceDoc {
  return {
    type: 'cookies',
    jurisdiction: 'PY',
    title: `Política de Cookies - ${vars.businessName}`,
    content: tpl(`# Política de Cookies

**Última actualización:** {{date}}

## ¿Qué son las cookies?
Las cookies son pequeños archivos de texto que se almacenan en su navegador cuando visita un sitio web.

## Cookies que utilizamos
- **Cookies esenciales:** Necesarias para el funcionamiento del sitio
- **Cookies de análisis:** Google Analytics para entender cómo se usa el sitio
- **Cookies de preferencias:** Recordar sus preferencias de navegación

## Control de cookies
Puede gestionar las cookies desde la configuración de su navegador:
- Chrome: Configuración → Privacidad y seguridad
- Firefox: Preferencias → Privacidad y seguridad
- Safari: Preferencias → Privacidad

## Más información
Para más información: {{domain}}`, { ...vars, date: new Date().toLocaleDateString('es-PY') }),
  }
}

export function termsOfService(vars: { businessName: string; domain: string; email: string }): ComplianceDoc {
  return {
    type: 'terms',
    jurisdiction: 'PY',
    title: `Términos y Condiciones - ${vars.businessName}`,
    content: tpl(`# Términos y Condiciones

**Última actualización:** {{date}}

## 1. Aceptación de los Términos
Al acceder y utilizar este sitio web, usted acepta estos términos y condiciones.

## 2. Descripción del Servicio
{{businessName}} ofrece servicios/productos a través de {{domain}}.

## 3. Precios y Pagos
Los precios se muestran en Guaraníes (PYG) e incluyen IVA cuando corresponda.
Los pagos se procesan a través de Bancard y Pagopar.

## 4. Envíos y Entregas
Los plazos de entrega se especifican en cada producto. No nos responsabilizamos por retrasos del courier.

## 5. Devoluciones y Reembolsos
Aceptamos devoluciones dentro de los 7 días posteriores a la recepción, según lo establecido por la Ley 1334/98 del Consumidor en Paraguay.

## 6. Propiedad Intelectual
Todo el contenido del sitio es propiedad de {{businessName}}.

## 7. Limitación de Responsabilidad
No nos responsabilizamos por daños indirectos derivados del uso del sitio.

## 8. Legislación Aplicable
Estos términos se rigen por las leyes de la República del Paraguay.

## 9. Contacto
Para consultas: {{email}}`, { ...vars, date: new Date().toLocaleDateString('es-PY') }),
  }
}

export function getComplianceDocs(type: ComplianceType, vars: Record<string, string>): ComplianceDoc {
  switch (type) {
    case 'privacy': return privacyPolicy(vars as any)
    case 'cookies': return cookiesPolicy(vars as any)
    case 'terms': return termsOfService(vars as any)
    default: throw new Error(`Compliance type ${type} not implemented`)
  }
}
