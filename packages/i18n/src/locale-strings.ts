// ── Locale UI Strings ──
// Common UI translations shared across client sites.
// Each entry is a record of locale → string values for a specific UI component.
// Import specific translations or use getLocaleStrings() for dynamic lookup.

export interface LocaleStringSet {
  [locale: string]: Record<string, string>
}

// ── CookieBanner Translations ──
export const COOKIE_BANNER: Record<string, Record<string, string>> = {
  es: {
    text: "Usamos cookies para mejorar tu experiencia. Si continuás navegando, aceptás nuestra ",
    privacy: "política de privacidad",
    reject: "Rechazar",
    accept: "Aceptar",
  },
  en: {
    text: "We use cookies to improve your experience. By continuing to browse, you accept our ",
    privacy: "privacy policy",
    reject: "Reject",
    accept: "Accept",
  },
  nl: {
    text: "We gebruiken cookies om uw ervaring te verbeteren. Door verder te gaan, accepteert u ons ",
    privacy: "privacybeleid",
    reject: "Weigeren",
    accept: "Accepteren",
  },
  de: {
    text: "Wir verwenden Cookies, um Ihr Erlebnis zu verbessern. Durch weiteres Surfen akzeptieren Sie unsere ",
    privacy: "Datenschutzerklärung",
    reject: "Ablehnen",
    accept: "Akzeptieren",
  },
}

// ── GatewayPopup Translations ──
export const GATEWAY_POPUP: Record<string, Record<string, string>> = {
  es: {
    title: "Reinicio de sesión",
    text: "Se ha reiniciado la sesión correctamente. Puedes cerrar esta ventana.",
    close: "Cerrar",
  },
  en: {
    title: "Session reset",
    text: "Your session has been reset successfully. You can close this window.",
    close: "Close",
  },
  nl: {
    title: "Sessie reset",
    text: "Uw sessie is succesvol gereset. U kunt dit venster sluiten.",
    close: "Sluiten",
  },
  de: {
    title: "Sitzung zurückgesetzt",
    text: "Ihre Sitzung wurde erfolgreich zurückgesetzt. Sie können dieses Fenster schließen.",
    close: "Schließen",
  },
}

// ── ExitPopup Translations ──
export const EXIT_POPUP: Record<string, Record<string, string>> = {
  es: {
    title: "¿Considerando mudarte a Paraguay?",
    subtitle:
      "Descargá nuestra guía completa con todo lo que necesitás saber: costos, requisitos, trámites y más.",
    placeholder: "tu@email.com",
    ctaLabel: "Descargar guía gratuita",
    closeLabel: "No, gracias",
    confirmTitle: "¡Guía enviada!",
    confirmText:
      "Revisá tu bandeja de entrada. Si no lo ves en unos minutos, revisá spam.",
    disclaimer:
      "Sin spam. Te enviaremos la guía y 1-2 correos más. Podés cancelar cuando quieras.",
  },
  en: {
    title: "Moving to Paraguay?",
    subtitle:
      "Download our complete guide with everything you need to know: costs, requirements, paperwork and more.",
    placeholder: "your@email.com",
    ctaLabel: "Download free guide",
    closeLabel: "No, thanks",
    confirmTitle: "Guide sent!",
    confirmText:
      "Check your inbox. If you don't see it in a few minutes, check spam.",
    disclaimer:
      "No spam. We'll send the guide and 1-2 follow-up emails. You can unsubscribe anytime.",
  },
  nl: {
    title: "Overweegt u een verhuizing naar Paraguay?",
    subtitle:
      "Download onze complete gids met alles wat u moet weten: kosten, vereisten, formaliteiten en meer.",
    placeholder: "uw@email.com",
    ctaLabel: "Download gratis gids",
    closeLabel: "Nee, bedankt",
    confirmTitle: "Gids verzonden!",
    confirmText:
      "Controleer uw inbox. Als u het niet binnen een paar minuten ziet, controleer dan de spam.",
    disclaimer:
      "Geen spam. We sturen de gids en 1-2 vervolgmailtjes. U kunt zich altijd uitschrijven.",
  },
  de: {
    title: "Erwägen Sie einen Umzug nach Paraguay?",
    subtitle:
      "Laden Sie unseren vollständigen Leitfaden mit allem, was Sie wissen müssen: Kosten, Anforderungen, Formalitäten und mehr.",
    placeholder: "ihre@email.com",
    ctaLabel: "Kostenlosen Leitfaden herunterladen",
    closeLabel: "Nein, danke",
    confirmTitle: "Leitfaden gesendet!",
    confirmText:
      "Überprüfen Sie Ihren Posteingang. Wenn Sie ihn nicht innerhalb weniger Minuten sehen, überprüfen Sie den Spam-Ordner.",
    disclaimer:
      "Kein Spam. Wir senden den Leitfaden und 1-2 Folge-E-Mails. Sie können sich jederzeit abmelden.",
  },
}

// ── FeedbackSection Translations ──
export const FEEDBACK_SECTION: Record<string, Record<string, string>> = {
  es: {
    eyebrow: "TU OPINIÓN",
    title: "Compartí tu experiencia",
    namePlaceholder: "Tu nombre (opcional)",
    messagePlaceholder: "Escribí tu comentario o pregunta...",
    button: "Enviar",
    thanks: "¡Gracias por tu mensaje!",
    recent: "Comentarios recientes",
  },
  en: {
    eyebrow: "YOUR FEEDBACK",
    title: "Share your experience",
    namePlaceholder: "Your name (optional)",
    messagePlaceholder: "Write your comment or question...",
    button: "Submit",
    thanks: "Thanks for your message!",
    recent: "Recent comments",
  },
  nl: {
    eyebrow: "UW FEEDBACK",
    title: "Deel uw ervaring",
    namePlaceholder: "Uw naam (optioneel)",
    messagePlaceholder: "Schrijf uw opmerking of vraag...",
    button: "Verzenden",
    thanks: "Bedankt voor uw bericht!",
    recent: "Recente reacties",
  },
  de: {
    eyebrow: "IHR FEEDBACK",
    title: "Teilen Sie Ihre Erfahrung",
    namePlaceholder: "Ihr Name (optional)",
    messagePlaceholder:
      "Schreiben Sie Ihren Kommentar oder Ihre Frage...",
    button: "Senden",
    thanks: "Danke für Ihre Nachricht!",
    recent: "Aktuelle Kommentare",
  },
}

/**
 * Get a specific locale's strings from any string set.
 * Falls back to 'es' (default) if the requested locale is missing.
 */
export function getLocaleStrings(
  set: Record<string, Record<string, string>>,
  locale: string
): Record<string, string> {
  return set[locale] || set["es"] || {}
}

/**
 * Get a single key from a locale string set with fallback.
 */
export function t(
  set: Record<string, Record<string, string>>,
  locale: string,
  key: string,
  fallback?: string
): string {
  return getLocaleStrings(set, locale)[key] || fallback || ""
}
