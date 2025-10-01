// scripts/export-content.js
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { load } from "js-yaml"

// Needed for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const contentDir = path.join(__dirname, "../content")   // Nuxt Content folder
const outputDir = path.join(__dirname, "../public/api") // Where JSON will be written

// Parse frontmatter + markdown body
function parseMarkdown(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8")

  const match = /^---\n([\s\S]+?)\n---\n([\s\S]*)$/m.exec(raw)

  if (!match) {
    return { frontmatter: {}, body: raw }
  }

  const [, yamlContent, body] = match
  const frontmatter = load(yamlContent)
  return { frontmatter, body }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function exportContent() {
  ensureDir(outputDir)

  const sections = fs.readdirSync(contentDir)

  sections.forEach((section) => {
    const sectionPath = path.join(contentDir, section)
    if (!fs.statSync(sectionPath).isDirectory()) return

    const files = fs.readdirSync(sectionPath)
    const jsonItems = []

    files.forEach((file) => {
      if (!file.endsWith(".md")) return
      const filePath = path.join(sectionPath, file)
      const slug = file.replace(/\.md$/, "")
      const { frontmatter, body } = parseMarkdown(filePath)

      const item = {
        slug,
        ...frontmatter,
        body,
      }

      jsonItems.push(item)

      // Write per-item JSON
      ensureDir(path.join(outputDir, section))
      fs.writeFileSync(
        path.join(outputDir, section, slug + ".json"),
        JSON.stringify(item, null, 2)
      )
    })

    // Write section JSON (all items)
    fs.writeFileSync(
      path.join(outputDir, section + ".json"),
      JSON.stringify(jsonItems, null, 2)
    )
  })

  console.log("✅ Content exported to /public/api/")
}

exportContent()
