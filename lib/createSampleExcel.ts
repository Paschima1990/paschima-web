import * as XLSX from 'xlsx'
import * as fs from 'fs'
import * as path from 'path'

// Sample data matching the expected format
const sampleData = [
  {
    'Book Name': 'ସାହିତ୍ୟ ଓ ସମାଜ',
    'Author Name': 'ଡ. ରାମଚନ୍ଦ୍ର ବେହେରା',
    'Book ISBN': '978-81-234-5678-9',
    'Type': 'ପ୍ରବନ୍ଧ'
  },
  {
    'Book Name': 'କବିତା ସଂଗ୍ରହ',
    'Author Name': 'ସୀତାକାନ୍ତ ମହାପାତ୍ର',
    'Book ISBN': '978-81-234-5679-0',
    'Type': 'କବିତା / କାବ୍ୟ'
  },
  {
    'Book Name': 'ମହାନଦୀ',
    'Author Name': 'କାଳିନ୍ଦୀ ଚରଣ ପାଣିଗ୍ରାହୀ',
    'Book ISBN': '',
    'Type': 'ଉପନ୍ୟାସ'
  },
  {
    'Book Name': 'ଗଳ୍ପ ସଂଗ୍ରହ',
    'Author Name': 'ଫକୀର ମୋହନ ସେନାପତି',
    'Book ISBN': '978-81-234-5680-1',
    'Type': 'ଗଳ୍ପ'
  },
  {
    'Book Name': 'ଜୀବନ କାହାଣୀ',
    'Author Name': 'ମନୋଜ ଦାସ',
    'Book ISBN': '',
    'Type': 'ଜୀବନ'
  }
]

function createSampleExcel() {
  // Create a new workbook
  const workbook = XLSX.utils.book_new()
  
  // Convert data to worksheet
  const worksheet = XLSX.utils.json_to_sheet(sampleData)
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Books')
  
  // Write to file
  const publicDir = path.join(process.cwd(), 'public')
  const filePath = path.join(publicDir, 'sample-books-upload.xlsx')
  
  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }
  
  XLSX.writeFile(workbook, filePath)
  
  console.log(`Sample Excel file created at: ${filePath}`)
}

createSampleExcel()

