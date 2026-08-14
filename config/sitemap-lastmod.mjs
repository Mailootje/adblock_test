import fs from 'fs'
import path from 'path'
import config from './config.js'

const file = path.join(config.build, 'sitemap.xml')
const today = new Date().toISOString().slice(0, 10)
const sitemap = fs
	.readFileSync(file, 'utf8')
	.replace(/<lastmod>[\d-]+<\/lastmod>/g, `<lastmod>${today}</lastmod>`)
fs.writeFileSync(file, sitemap)
console.log(`sitemap.xml lastmod set to ${today}`)
