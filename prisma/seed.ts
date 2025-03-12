import { PrismaClient } from '@prisma/client'
// import { prisma } from '@/utils/db'
import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// Read the JSON file
const seedData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'seedData.json'), 'utf-8')
)

async function main() {
  // Ensure that model is one of the valid Prisma models
  for (const entry of seedData) {
    const { model, data } = entry

    // Type assertion to ensure we are dealing with a valid Prisma model name
    if (model in prisma) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (prisma[model] as any).createMany({
        data,
        skipDuplicates: true,
      })
    } else {
      console.log(`Model ${model} does not exist on PrismaClient`)
    }
  }

  console.log('Data seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
