"use server"

// One-time migration script: push all existing content/es.json to Supabase
// Run with: npx ts-node --compiler-options '{"module":"commonjs"}' scripts/migrate-content.ts

import { createClient } from "@supabase/supabase-js"
import * as fs from "fs"
import * as path from "path"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE env vars")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// All client sites and their content file paths
const sites = [
  { id: "elviajero", path: "/root/elviajero/content/es.json" },
  { id: "fun4me", path: "/root/fun4me/content/es.json" },
  { id: "superspuma", path: "/root/superspuma/content/es.json" },
  { id: "dayah-litworks", path: "/root/dayah-litworks/content/es.json" },
  { id: "granja-cabral", path: "/root/granja-cabral/content/es.json" },
  { id: "3md-website", path: "/root/3md-website/content/es.json" },
  { id: "depiflash", path: "/root/depiflash/content/es.json" },
  { id: "de-abasto-a-casa", path: "/root/de-abasto-a-casa/content/es.json" },
  { id: "polki-squad", path: "/root/polki-squad/content/es.json" },
  { id: "bufete-mendez", path: "/root/bufete-mendez/content/es.json" },
  { id: "ozmontania-website", path: "/root/ozmontania-website/content/es.json" },
  { id: "villamayor-asociados", path: "/root/villamayor-asociados/content/es.json" },
  { id: "maiyu-atelier", path: "/root/maiyu-atelier/content/es.json" },
  { id: "nexa-paraguay", path: "/root/nexa-paraguay/content/es.json" },
  { id: "stroopwafel-huis", path: "/root/stroopwafel-huis/src/content/es.json" },
  { id: "golden-visa-advisory", path: "/root/golden-visa-advisory/content/es.json" },
]

async function migrate() {
  for (const site of sites) {
    if (!fs.existsSync(site.path)) {
      console.log(`✗ ${site.id}: file not found at ${site.path}`)
      continue
    }
    const content = JSON.parse(fs.readFileSync(site.path, "utf-8"))
    const { error } = await supabase
      .from("site_content")
      .upsert({ site_id: site.id, content }, { onConflict: "site_id" })
    if (error) {
      console.log(`✗ ${site.id}: ${error.message}`)
    } else {
      console.log(`✓ ${site.id}: ${Object.keys(content).length} fields`)
    }
  }
  console.log("\nMigration complete!")
}

migrate().catch(console.error)
