// Content Editor — embed this component in /admin/content page
// Full JSON editor with schema-aware form for non-devs
// Place at app/admin/content/page.tsx

"use client"

import { useState, useEffect, useCallback } from "react"

const EDITOR_STYLES = `
.editor-container { max-width: 1200px; margin: 0 auto; padding: 2rem; font-family: system-ui, sans-serif; }
.editor-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.editor-header h1 { margin: 0; font-size: 1.5rem; font-weight: 600; }
.editor-sidebar { display: flex; gap: 2rem; }
.editor-nav { width: 250px; flex-shrink: 0; }
.editor-nav button { display: block; width: 100%; text-align: left; padding: 0.5rem 1rem; border: none; background: none; cursor: pointer; border-radius: 4px; font-size: 0.875rem; }
.editor-nav button:hover { background: #f0f0f0; }
.editor-nav button.active { background: #e0e7ff; color: #4338ca; font-weight: 500; }
.editor-main { flex: 1; }
.editor-panel { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem; }
.editor-panel h2 { margin: 0 0 1rem; font-size: 1.25rem; }
.editor-field { margin-bottom: 1rem; }
.editor-field label { display: block; font-size: 0.75rem; font-weight: 500; color: #6b7280; margin-bottom: 0.25rem; text-transform: uppercase; }
.editor-field input, .editor-field textarea { width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 4px; font-size: 0.875rem; box-sizing: border-box; }
.editor-field textarea { min-height: 80px; resize: vertical; }
.editor-field textarea.code { min-height: 300px; font-family: monospace; font-size: 0.8125rem; }
.editor-actions { display: flex; gap: 0.5rem; margin-top: 1rem; }
.editor-actions button { padding: 0.5rem 1rem; border-radius: 4px; font-size: 0.875rem; cursor: pointer; border: 1px solid #d1d5db; background: #fff; }
.editor-actions button.primary { background: #4338ca; color: white; border-color: #4338ca; }
.editor-actions button.primary:hover { background: #3730a3; }
.editor-actions button:disabled { opacity: 0.5; cursor: not-allowed; }
.editor-toast { position: fixed; bottom: 1rem; right: 1rem; padding: 0.75rem 1.5rem; border-radius: 8px; color: white; font-size: 0.875rem; animation: fadeIn 0.2s; z-index: 1000; }
.editor-toast.success { background: #059669; }
.editor-toast.error { background: #dc2626; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
`

interface Toast { message: string; type: "success" | "error" }

export default function ContentEditor() {
  const [content, setContent] = useState<Record<string, unknown>>({})
  const [siteId, setSiteId] = useState("default")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<Toast | null>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [rawJson, setRawJson] = useState(false)

  const showToast = useCallback((message: string, type: "success" | "error") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  useEffect(() => {
    async function load() {
      try {
        const params = new URLSearchParams(window.location.search)
        const sid = params.get("site") || "default"
        setSiteId(sid)
        const res = await fetch(`/api/admin/content?site=${sid}`)
        const data = await res.json()
        if (data.content) setContent(data.content)
        if (data.content) {
          const keys = Object.keys(data.content)
          if (keys.length > 0 && !activeSection) setActiveSection(keys[0])
        }
      } catch (e) {
        showToast("Failed to load content", "error")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId, content }),
      })
      const data = await res.json()
      if (data.ok) showToast("Content saved!", "success")
      else showToast(data.error || "Save failed", "error")
    } catch {
      showToast("Network error", "error")
    } finally {
      setSaving(false)
    }
  }

  function updateField(section: string, field: string, value: string) {
    setContent((prev) => {
      const updated = { ...prev }
      const sec = (updated[section] as Record<string, unknown>) || {}
      if (Array.isArray(sec)) {
        // Array section — don't edit inline
        return prev
      }
      updated[section] = { ...sec, [field]: value }
      return updated
    })
  }

  function renderField(key: string, value: unknown, path: string) {
    if (typeof value === "string") {
      const isLong = value.length > 100
      return (
        <div className="editor-field" key={path}>
          <label>{key}</label>
          {isLong ? (
            <textarea value={value} onChange={(e) => updateField(activeSection!, key, e.target.value)} />
          ) : (
            <input value={value} onChange={(e) => updateField(activeSection!, key, e.target.value)} />
          )}
        </div>
      )
    }
    if (typeof value === "number") {
      return (
        <div className="editor-field" key={path}>
          <label>{key}</label>
          <input type="number" value={value} onChange={(e) => updateField(activeSection!, key, e.target.value)} />
        </div>
      )
    }
    // Objects and arrays — skip for inline editing, shown in raw JSON view
    return null
  }

  const sections = Object.keys(content)
  const currentSection = activeSection && content[activeSection]

  if (loading) return <div className="editor-container"><p>Loading editor...</p></div>

  return (
    <>
      <style>{EDITOR_STYLES}</style>
      <div className="editor-container">
        <div className="editor-header">
          <h1>Content Editor — {siteId}</h1>
          <div>
            <button onClick={() => setRawJson(!rawJson)} className={rawJson ? "primary" : ""}>
              {rawJson ? "Form View" : "Raw JSON"}
            </button>
            <button className="primary" onClick={handleSave} disabled={saving} style={{ marginLeft: 8 }}>
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        <div className="editor-sidebar">
          <div className="editor-nav">
            <h3>Sections</h3>
            {sections.map((sec) => (
              <button key={sec} className={activeSection === sec ? "active" : ""} onClick={() => setActiveSection(sec)}>
                {sec}
              </button>
            ))}
          </div>

          <div className="editor-main">
            {rawJson ? (
              <div className="editor-panel">
                <textarea
                  className="code"
                  value={JSON.stringify(content, null, 2)}
                  onChange={(e) => {
                    try {
                      setContent(JSON.parse(e.target.value))
                    } catch { /* allow typing */ }
                  }}
                />
              </div>
            ) : activeSection && currentSection ? (
              <div className="editor-panel">
                <h2>{activeSection}</h2>
                {typeof currentSection === "object" && !Array.isArray(currentSection)
                  ? Object.entries(currentSection as Record<string, unknown>).map(([k, v]) => renderField(k, v, `${activeSection}.${k}`))
                  : <p>Array data — use Raw JSON view to edit</p>}
              </div>
            ) : (
              <div className="editor-panel">
                <p>Select a section from the sidebar to edit</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && <div className={`editor-toast ${toast.type}`}>{toast.message}</div>}
    </>
  )
}
