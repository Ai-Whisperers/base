export interface BusinessType {
  id: string
  name: string
  vertical: string
  subVertical?: string
  description?: string
  sections?: string[]
  features?: Record<string, boolean>
  commerce?: boolean
  booking?: boolean
  seoTemplate?: string
}

export interface Vertical {
  id: string
  name: string
  icon?: string
  subVerticals?: { id: string; name: string }[]
}

export const VERTICALS: Vertical[] = [
  { id: 'beauty-wellness', name: 'Belleza y Bienestar', icon: 'sparkles', subVerticals: [
    { id: 'salon', name: 'Salones de Belleza' },
    { id: 'barberia', name: 'Barberías' },
    { id: 'spa', name: 'SPA y Masajes' },
    { id: 'depilacion', name: 'Depilación' },
    { id: 'manicura', name: 'Manicura y Pedicura' },
    { id: 'maquillaje', name: 'Maquillaje Profesional' },
  ]},
  { id: 'food-beverage', name: 'Comidas y Bebidas', icon: 'utensils', subVerticals: [
    { id: 'restaurante', name: 'Restaurantes' },
    { id: 'cafeteria', name: 'Cafeterías' },
    { id: 'pizzeria', name: 'Pizzerías' },
    { id: 'heladeria', name: 'Heladerías' },
    { id: 'panaderia', name: 'Panaderías' },
    { id: 'comida-rapida', name: 'Comida Rápida' },
  ]},
  { id: 'professional-services', name: 'Servicios Profesionales', icon: 'briefcase', subVerticals: [
    { id: 'abogacia', name: 'Bufetes de Abogados' },
    { id: 'contabilidad', name: 'Estudios Contables' },
    { id: 'escribania', name: 'Escribanías' },
    { id: 'arquitectura', name: 'Arquitectura' },
    { id: 'consultoria', name: 'Consultoría' },
  ]},
  { id: 'health-fitness', name: 'Salud y Fitness', icon: 'heart', subVerticals: [
    { id: 'gimnasio', name: 'Gimnasios' },
    { id: 'fisioterapia', name: 'Fisioterapia' },
    { id: 'psicologia', name: 'Psicología' },
    { id: 'odontologia', name: 'Odontología' },
    { id: 'medicina', name: 'Medicina General' },
  ]},
  { id: 'real-estate', name: 'Bienes Raíces', icon: 'building', subVerticals: [
    { id: 'inmobiliaria', name: 'Inmobiliarias' },
    { id: 'tasadora', name: 'Empresas Tasadoras' },
    { id: 'constructora', name: 'Constructoras' },
  ]},
  { id: 'retail-ecommerce', name: 'Tiendas y E-commerce', icon: 'shopping-bag', subVerticals: [
    { id: 'indumentaria', name: 'Indumentaria' },
    { id: 'calzado', name: 'Calzado' },
    { id: 'accesorios', name: 'Accesorios' },
    { id: 'regalos', name: 'Regalos y Souvenirs' },
    { id: 'articulos-deportivos', name: 'Artículos Deportivos' },
  ]},
  { id: 'arts-entertainment', name: 'Arte y Entretenimiento', icon: 'palette', subVerticals: [
    { id: 'tatuajes', name: 'Tatuajes y Piercings' },
    { id: 'musica', name: 'Música' },
    { id: 'fotografia', name: 'Fotografía' },
    { id: 'arte', name: 'Galerías de Arte' },
  ]},
  { id: 'automotive', name: 'Automotriz', icon: 'car', subVerticals: [
    { id: 'taller', name: 'Talleres Mecánicos' },
    { id: 'lavadero', name: 'Lavaderos de Autos' },
    { id: 'vendedor-autos', name: 'Vendedores de Autos' },
  ]},
  { id: 'hospitality-tourism', name: 'Hotelería y Turismo', icon: 'map-pin', subVerticals: [
    { id: 'hotel-resort', name: 'Hoteles y Resorts' },
    { id: 'short-term-rental', name: 'Alquiler Temporal' },
    { id: 'hostel-budget', name: 'Hostels y Alojamiento Económico' },
    { id: 'tour-operator', name: 'Operadores Turísticos' },
    { id: 'travel-agency', name: 'Agencias de Viajes' },
    { id: 'event-venue', name: 'Salones de Eventos' },
    { id: 'transport-tourism', name: 'Transporte Turístico' },
    { id: 'rv-camping', name: 'Camping y RV' },
    { id: 'specialty-lodging', name: 'Alojamientos Especiales' },
  ]},
  { id: 'service-booking', name: 'Reservas de Servicios', icon: 'calendar-check', subVerticals: [
    { id: 'photography', name: 'Fotografía' },
    { id: 'events-entertainment', name: 'Eventos y Entretenimiento' },
    { id: 'coaching', name: 'Coaching' },
    { id: 'personal-training', name: 'Entrenamiento Personal' },
    { id: 'tutoring-private', name: 'Tutorías Privadas' },
    { id: 'officiant-celebrant', name: 'Oficiantes y Celebrantes' },
    { id: 'home-organization', name: 'Organización del Hogar' },
    { id: 'errands-concierge', name: 'Mandados y Concierge' },
  ]},
  { id: 'portfolio-professional', name: 'Portafolio Profesional', icon: 'briefcase', subVerticals: [
    { id: 'graphic-design', name: 'Diseño Gráfico' },
    { id: 'architecture-interior', name: 'Arquitectura e Interiores' },
    { id: 'fine-arts', name: 'Bellas Artes' },
    { id: 'writing-editorial', name: 'Redacción y Editorial' },
    { id: 'videography-film', name: 'Video y Cine' },
    { id: 'music-audio', name: 'Música y Audio' },
    { id: 'fashion-design', name: 'Diseño de Moda' },
    { id: 'industrial-product-design', name: 'Diseño Industrial' },
  ]},
  { id: 'trades-home-services', name: 'Oficios y Servicios del Hogar', icon: 'wrench', subVerticals: [
    { id: 'plumbing', name: 'Plomería' },
    { id: 'electrical', name: 'Electricidad' },
    { id: 'hvac', name: 'Climatización' },
    { id: 'roofing', name: 'Techos' },
    { id: 'general-contracting', name: 'Contratación General' },
    { id: 'painting-finishing', name: 'Pintura y Acabados' },
    { id: 'flooring', name: 'Pisos' },
    { id: 'landscaping', name: 'Jardinería' },
    { id: 'cleaning-residential', name: 'Limpieza Residencial' },
    { id: 'cleaning-commercial', name: 'Limpieza Comercial' },
    { id: 'pest-control', name: 'Control de Plagas' },
    { id: 'handyman', name: 'Servicios Múltiples' },
    { id: 'pool-spa', name: 'Piletas y Spa' },
    { id: 'locksmith-security', name: 'Cerrajería y Seguridad' },
  ]},
  { id: 'education-training', name: 'Educación y Capacitación', icon: 'book-open', subVerticals: [
    { id: 'tutoring-k12', name: 'Tutoría Escolar' },
    { id: 'test-prep', name: 'Preparación de Exámenes' },
    { id: 'language', name: 'Idiomas' },
    { id: 'music-art', name: 'Música y Arte' },
    { id: 'trade-vocational', name: 'Formación Técnica' },
    { id: 'tech-bootcamp', name: 'Bootcamps Tecnológicos' },
    { id: 'early-childhood', name: 'Primera Infancia' },
    { id: 'driving-school', name: 'Escuelas de Manejo' },
    { id: 'corporate-training', name: 'Capacitación Corporativa' },
    { id: 'online-courses', name: 'Cursos Online' },
  ]},
  { id: 'b2b-professional', name: 'Servicios Profesionales B2B', icon: 'handshake', subVerticals: [
    { id: 'legal', name: 'Servicios Legales' },
    { id: 'accounting-tax', name: 'Contabilidad e Impuestos' },
    { id: 'management-consulting', name: 'Consultoría Gerencial' },
    { id: 'marketing-agency', name: 'Agencias de Marketing' },
    { id: 'hr-recruiting', name: 'RRHH y Reclutamiento' },
    { id: 'translation-localization', name: 'Traducción y Localización' },
    { id: 'research-market', name: 'Investigación de Mercado' },
    { id: 'engineering-consulting', name: 'Consultoría de Ingeniería' },
    { id: 'environmental-consulting', name: 'Consultoría Ambiental' },
    { id: 'business-process-outsource', name: 'Outsourcing de Procesos' },
    { id: 'investigations-security', name: 'Investigaciones y Seguridad' },
  ]},
  { id: 'real-estate-relocation', name: 'Bienes Raíces y Reubicación', icon: 'map-pinned', subVerticals: [
    { id: 'residential-brokerage', name: 'Corretaje Residencial' },
    { id: 'commercial-brokerage', name: 'Corretaje Comercial' },
    { id: 'property-management', name: 'Administración de Propiedades' },
    { id: 'appraisal-inspection', name: 'Tasaciones e Inspecciones' },
    { id: 'relocation-services', name: 'Servicios de Reubicación' },
    { id: 'moving-storage', name: 'Mudanzas y Almacenamiento' },
    { id: 'title-escrow', name: 'Títulos y Escrow' },
    { id: 'land-development', name: 'Desarrollo de Terrenos' },
  ]},
  { id: 'trades-industrial', name: 'Industria y Manufactura', icon: 'factory', subVerticals: [
    { id: 'machining-fabrication', name: 'Maquinado y Fabricación' },
    { id: 'contract-manufacturing', name: 'Manufactura por Contrato' },
    { id: 'printing-signage', name: 'Imprenta y Cartelería' },
    { id: 'packaging-labeling', name: 'Empaque y Etiquetado' },
    { id: 'industrial-equipment', name: 'Equipos Industriales' },
    { id: 'textiles-apparel-mfg', name: 'Textil y Confección' },
    { id: 'food-processing', name: 'Procesamiento de Alimentos' },
    { id: 'chemicals-materials', name: 'Químicos y Materiales' },
    { id: 'industrial-maintenance', name: 'Mantenimiento Industrial' },
    { id: 'recycling-waste', name: 'Reciclaje y Residuos' },
  ]},
  { id: 'agriculture-agribusiness', name: 'Agricultura y Agronegocios', icon: 'tractor', subVerticals: [
    { id: 'crop-farming', name: 'Cultivos' },
    { id: 'livestock-ranch', name: 'Ganadería' },
    { id: 'csa-direct', name: 'CSA y Venta Directa' },
    { id: 'specialty-crop', name: 'Cultivos Especiales' },
    { id: 'aquaculture', name: 'Acuicultura' },
    { id: 'apiary', name: 'Apicultura' },
    { id: 'ag-services', name: 'Servicios Agrícolas' },
    { id: 'ag-equipment', name: 'Equipos Agrícolas' },
    { id: 'forestry', name: 'Forestal' },
  ]},
  { id: 'logistics-transport', name: 'Logística y Transporte', icon: 'truck', subVerticals: [
    { id: 'trucking-freight', name: 'Camiones y Carga' },
    { id: 'freight-brokerage', name: 'Corretaje de Carga' },
    { id: 'warehousing', name: 'Almacenamiento' },
    { id: 'courier-lastmile', name: 'Mensajería y Última Milla' },
    { id: 'marine-port', name: 'Puertos y Marítimo' },
    { id: 'aviation-cargo', name: 'Carga Aérea' },
    { id: 'rail-intermodal', name: 'Ferrocarril e Intermodal' },
    { id: 'moving-specialty', name: 'Mudanzas Especializadas' },
  ]},
  { id: 'finance-insurance', name: 'Finanzas y Seguros', icon: 'wallet', subVerticals: [
    { id: 'financial-advisory', name: 'Asesoría Financiera' },
    { id: 'accounting-bookkeeping', name: 'Contabilidad' },
    { id: 'tax-prep', name: 'Preparación de Impuestos' },
    { id: 'lending-retail', name: 'Préstamos' },
    { id: 'credit-union-community-bank', name: 'Cooperativas y Bancos' },
    { id: 'insurance-brokerage', name: 'Corretaje de Seguros' },
    { id: 'insurance-specialty', name: 'Seguros Especializados' },
    { id: 'fintech-local', name: 'Fintech Local' },
    { id: 'crypto-local', name: 'Crypto Local' },
    { id: 'debt-credit-services', name: 'Deuda y Crédito' },
  ]},
  { id: 'technology-digital', name: 'Tecnología y Digital', icon: 'monitor', subVerticals: [
    { id: 'it-managed-services', name: 'Servicios IT Gestionados' },
    { id: 'web-digital-agency', name: 'Agencias Web y Digital' },
    { id: 'saas-vendor', name: 'Proveedores SaaS' },
    { id: 'cybersecurity', name: 'Ciberseguridad' },
    { id: 'data-analytics', name: 'Datos y Analítica' },
    { id: 'ai-ml-services', name: 'IA y Machine Learning' },
    { id: 'hardware-iot', name: 'Hardware e IoT' },
    { id: 'av-integration', name: 'Integración AV' },
    { id: 'repair-tech', name: 'Reparación Tecnológica' },
  ]},
  { id: 'arts-entertainment-venues', name: 'Artes y Entretenimiento', icon: 'palette', subVerticals: [
    { id: 'live-music-venue', name: 'Música en Vivo' },
    { id: 'theater-performing', name: 'Teatro y Actuación' },
    { id: 'cinema', name: 'Cine' },
    { id: 'museum-gallery', name: 'Museos y Galerías' },
    { id: 'comedy-club', name: 'Comedia' },
    { id: 'escape-room-arcade', name: 'Escape Rooms y Arcades' },
    { id: 'amusement-family', name: 'Parques y Familia' },
    { id: 'nightlife-club', name: 'Vida Nocturna' },
    { id: 'casino-gambling', name: 'Casinos y Juegos' },
    { id: 'events-festivals', name: 'Eventos y Festivales' },
  ]},
  { id: 'sports-recreation', name: 'Deportes y Recreación', icon: 'trophy', subVerticals: [
    { id: 'climbing-adventure', name: 'Escalada y Aventura' },
    { id: 'racquet-sports', name: 'Deportes de Raqueta' },
    { id: 'golf', name: 'Golf' },
    { id: 'water-sports', name: 'Deportes Acuáticos' },
    { id: 'winter-sports', name: 'Deportes de Invierno' },
    { id: 'motorsports', name: 'Motores' },
    { id: 'team-sports-league', name: 'Ligas Deportivas' },
    { id: 'martial-arts', name: 'Artes Marciales' },
    { id: 'equestrian', name: 'Equitación' },
    { id: 'esports-gaming', name: 'Esports y Gaming' },
  ]},
  { id: 'pets-animals', name: 'Mascotas y Animales', icon: 'paw-print', subVerticals: [
    { id: 'pet-grooming', name: 'Peluquería Canina' },
    { id: 'pet-boarding-daycare', name: 'Guardería y Hospedaje' },
    { id: 'pet-training', name: 'Adiestramiento' },
    { id: 'pet-retail', name: 'Tiendas de Mascotas' },
    { id: 'pet-sitting-walking', name: 'Paseo y Cuidado' },
    { id: 'animal-rescue-shelter', name: 'Rescate y Refugios' },
    { id: 'equestrian-breeding', name: 'Cría Equina' },
  ]},
  { id: 'media-publishing', name: 'Medios y Publicación', icon: 'newspaper', subVerticals: [
    { id: 'local-news', name: 'Noticias Locales' },
    { id: 'magazine-niche', name: 'Revistas Especializadas' },
    { id: 'podcast-studio', name: 'Estudios de Podcast' },
    { id: 'indie-publisher', name: 'Editorial Independiente' },
    { id: 'ad-media-local', name: 'Publicidad Local' },
    { id: 'content-creator', name: 'Creadores de Contenido' },
    { id: 'photo-stock-agency', name: 'Agencias de Fotografía' },
    { id: 'print-distribution', name: 'Distribución Impresa' },
  ]},
  { id: 'membership-community', name: 'Membresías y Comunidad', icon: 'users', subVerticals: [
    { id: 'nonprofit-charity', name: 'ONG y Beneficencia' },
    { id: 'religious-congregation', name: 'Congregaciones Religiosas' },
    { id: 'trade-association', name: 'Asociaciones Gremiales' },
    { id: 'professional-society', name: 'Sociedades Profesionales' },
    { id: 'social-club', name: 'Clubes Sociales' },
    { id: 'coworking-makerspace', name: 'Coworking y Makerspace' },
    { id: 'fraternal-order', name: 'Órdenes Fraternales' },
    { id: 'community-center', name: 'Centros Comunitarios' },
    { id: 'advocacy-civic', name: 'Activismo y Cívico' },
    { id: 'alumni-fan', name: 'Exalumnos y Fans' },
  ]},
  { id: 'death-care', name: 'Servicios Funerarios', icon: 'church', subVerticals: [
    { id: 'funeral-home', name: 'Funerarias' },
    { id: 'cemetery-memorial', name: 'Cementerios y Memoriales' },
    { id: 'cremation', name: 'Cremación' },
    { id: 'pre-planning', name: 'Planificación Anticipada' },
    { id: 'monument-headstone', name: 'Monumentos y Lápidas' },
  ]},
]

export const BUSINESS_FEATURES = {
  COMMERCE: 'commerce',
  BOOKING: 'booking',
  BLOG: 'blog',
  PORTFOLIO: 'portfolio',
  MENU: 'menu',
  CATALOG: 'catalog',
  WHATSAPP_ORDERING: 'whatsapp-ordering',
  MULTI_LOCATION: 'multi-location',
  REVIEWS: 'reviews',
  GALLERY: 'gallery',
  FAQ: 'faq',
  TESTIMONIALS: 'testimonials',
  B2B: 'b2b',
  LOYALTY: 'loyalty',
} as const

export const DEFAULT_SECTIONS_BY_VERTICAL: Record<string, string[]> = {
  'beauty-wellness': ['hero', 'services', 'gallery', 'testimonials', 'pricing', 'booking', 'contact'],
  'food-beverage': ['hero', 'menu', 'gallery', 'reviews', 'location', 'contact'],
  'professional-services': ['hero', 'services', 'team', 'testimonials', 'contact'],
  'health-fitness': ['hero', 'services', 'pricing', 'team', 'testimonials', 'contact'],
  'real-estate': ['hero', 'properties', 'about', 'testimonials', 'contact'],
  'retail-ecommerce': ['hero', 'products', 'categories', 'contact'],
  'arts-entertainment': ['hero', 'portfolio', 'services', 'testimonials', 'contact'],
  'automotive': ['hero', 'services', 'gallery', 'contact'],
  'hospitality-tourism': ['hero', 'services', 'gallery', 'reviews', 'booking', 'location', 'contact'],
  'service-booking': ['hero', 'services', 'portfolio', 'pricing', 'booking', 'testimonials', 'contact'],
  'portfolio-professional': ['hero', 'portfolio', 'services', 'testimonials', 'contact'],
  'trades-home-services': ['hero', 'services', 'gallery', 'reviews', 'contact'],
  'education-training': ['hero', 'courses', 'about', 'testimonials', 'pricing', 'contact'],
  'b2b-professional': ['hero', 'services', 'team', 'case-studies', 'testimonials', 'contact'],
  'real-estate-relocation': ['hero', 'properties', 'about', 'testimonials', 'contact', 'location'],
  'trades-industrial': ['hero', 'services', 'gallery', 'catalog', 'contact'],
  'agriculture-agribusiness': ['hero', 'products', 'about', 'gallery', 'contact'],
  'logistics-transport': ['hero', 'services', 'coverage', 'contact'],
  'finance-insurance': ['hero', 'services', 'team', 'faq', 'testimonials', 'contact'],
  'technology-digital': ['hero', 'services', 'portfolio', 'pricing', 'team', 'contact'],
  'arts-entertainment-venues': ['hero', 'events', 'gallery', 'pricing', 'booking', 'contact'],
  'sports-recreation': ['hero', 'activities', 'pricing', 'gallery', 'booking', 'contact'],
  'pets-animals': ['hero', 'services', 'gallery', 'testimonials', 'contact'],
  'media-publishing': ['hero', 'articles', 'about', 'subscribe', 'contact'],
  'membership-community': ['hero', 'about', 'events', 'join', 'contact'],
  'death-care': ['hero', 'services', 'about', 'faq', 'contact'],
}

export function getVertical(id: string): Vertical | undefined {
  return VERTICALS.find(v => v.id === id)
}

export function getSubVertical(verticalId: string, subId: string): { id: string; name: string } | undefined {
  return VERTICALS.find(v => v.id === verticalId)?.subVerticals?.find(sv => sv.id === subId)
}

export function lookupBusinessType(id: string): { vertical: Vertical; subVertical?: { id: string; name: string } } | undefined {
  for (const v of VERTICALS) {
    if (v.id === id) return { vertical: v }
    if (v.subVerticals) {
      const sv = v.subVerticals.find(s => s.id === id)
      if (sv) return { vertical: v, subVertical: sv }
    }
  }
  return undefined
}

export function getSectionTemplates(verticalId: string, subVerticalId?: string): string[] {
  if (subVerticalId) {
    const key = `${verticalId}/${subVerticalId}`
    if (key in DEFAULT_SECTIONS_BY_VERTICAL) {
      return DEFAULT_SECTIONS_BY_VERTICAL[key]
    }
  }
  return DEFAULT_SECTIONS_BY_VERTICAL[verticalId] || ['hero', 'contact']
}

export function getFeaturesForType(verticalId: string, subVerticalId?: string): Record<string, boolean> {
  const features: Record<string, boolean> = {}

  const vertical = getVertical(verticalId)
  if (!vertical) return features

  const segments = getSectionTemplates(verticalId, subVerticalId)

  if (segments.includes('booking') || segments.includes('pricing')) {
    features[BUSINESS_FEATURES.BOOKING] = true
  }
  if (segments.includes('menu')) {
    features[BUSINESS_FEATURES.MENU] = true
  }
  if (segments.includes('gallery')) {
    features[BUSINESS_FEATURES.GALLERY] = true
  }
  if (segments.includes('testimonials')) {
    features[BUSINESS_FEATURES.TESTIMONIALS] = true
  }
  if (segments.includes('reviews')) {
    features[BUSINESS_FEATURES.REVIEWS] = true
  }
  if (segments.includes('portfolio') || segments.includes('case-studies')) {
    features[BUSINESS_FEATURES.PORTFOLIO] = true
  }
  if (segments.includes('faq')) {
    features[BUSINESS_FEATURES.FAQ] = true
  }
  if (segments.includes('products') || segments.includes('catalog')) {
    features[BUSINESS_FEATURES.CATALOG] = true
  }

  const b2bVerticals = ['b2b-professional', 'trades-industrial', 'logistics-transport', 'finance-insurance']
  if (b2bVerticals.includes(verticalId)) {
    features[BUSINESS_FEATURES.B2B] = true
  }

  const commerceVerticals = ['retail-ecommerce', 'food-beverage']
  if (commerceVerticals.includes(verticalId)) {
    features[BUSINESS_FEATURES.COMMERCE] = true
  }

  return features
}

export function getBusinessTypeId(verticalId: string, subVerticalId?: string): string {
  return subVerticalId ? `${verticalId}/${subVerticalId}` : verticalId
}

export function parseBusinessTypeId(typeId: string): { verticalId: string; subVerticalId?: string } {
  const parts = typeId.split('/')
  return { verticalId: parts[0], subVerticalId: parts[1] }
}
