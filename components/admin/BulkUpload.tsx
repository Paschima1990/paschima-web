'use client'
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Upload, FileSpreadsheet, X, CheckCircle2, AlertCircle, Loader2, Download } from 'lucide-react'

interface UploadResult {
  success: number
  errors: Array<{ row: number; message: string }>
  duplicates: number
  skipped: number
}

export function BulkUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<UploadResult | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFile = (selectedFile: File) => {
    // Validate file type
    if (!selectedFile.name.endsWith('.xlsx') && !selectedFile.name.endsWith('.xls')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload an Excel file (.xlsx or .xls)',
        variant: 'destructive',
      })
      return
    }

    setFile(selectedFile)
    setResult(null)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/books/bulk', {
        method: 'POST',
        body: formData,
      })

      let data
      try {
        data = await response.json()
      } catch (error) {
        throw new Error('Invalid response from server')
      }

      if (response.ok) {
        setResult(data.result)
        toast({
          title: 'Upload successful',
          description: data.message,
        })
        // Clear file after successful upload
        setFile(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      } else {
        toast({
          title: 'Upload failed',
          description: data.error || 'Failed to upload file',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      toast({
        title: 'Error',
        description: 'An error occurred while uploading the file',
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-serif font-semibold text-[#0A0A0A]">
            Upload Excel File
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              try {
                const link = document.createElement('a')
                link.href = '/sample-books-upload.xlsx'
                link.download = 'sample-books-upload.xlsx'
                document.body.appendChild(link)
                link.click()
                // Use setTimeout to ensure click completes before removal
                setTimeout(() => {
                  if (document.body.contains(link)) {
                    document.body.removeChild(link)
                  }
                }, 100)
              } catch (error) {
                console.error('Error downloading sample file:', error)
                toast({
                  title: 'Download error',
                  description: 'Failed to download sample file. Please try again.',
                  variant: 'destructive',
                })
              }
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Download Sample
          </Button>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Upload an Excel file (.xlsx) with columns: <strong>Book Name</strong>, <strong>Author Name</strong>, <strong>Book ISBN</strong> (optional), and <strong>Type</strong> (optional).
          <span className="ml-2 text-[#635BFF] font-medium">Download the sample file above to see the correct format.</span>
        </p>

        {/* File Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center transition-colors
            ${
              dragActive
                ? 'border-[#635BFF] bg-[#635BFF]/5'
                : 'border-gray-300 hover:border-gray-400'
            }
          `}
        >
          {file ? (
            <div className="flex items-center justify-center gap-4">
              <FileSpreadsheet className="h-12 w-12 text-[#635BFF]" />
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {file.size ? `${(file.size / 1024).toFixed(2)} KB` : 'Unknown size'}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemoveFile}
                disabled={uploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div>
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                Drag and drop your Excel file here, or
              </p>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                Browse Files
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          )}
        </div>

        {/* Upload Button */}
        {file && (
          <div className="mt-4 flex justify-end">
            <Button
              onClick={handleUpload}
              disabled={uploading}
              className="min-w-[120px]"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Results */}
      {result && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-serif font-semibold mb-4 text-[#0A0A0A]">
            Upload Results
          </h3>

          {/* Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-900">Success</span>
              </div>
              <p className="text-2xl font-bold text-green-600">{result.success}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-900">Duplicates</span>
              </div>
              <p className="text-2xl font-bold text-yellow-600">{result.duplicates}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span className="text-sm font-medium text-red-900">Errors</span>
              </div>
              <p className="text-2xl font-bold text-red-600">{result.errors.length}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">Skipped</span>
              </div>
              <p className="text-2xl font-bold text-gray-600">{result.skipped}</p>
            </div>
          </div>

          {/* Error Details */}
          {result.errors.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Error Details</h4>
              <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                        Row
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                        Message
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {result.errors.map((error, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-2 font-mono text-gray-600">{error.row}</td>
                        <td className="px-4 py-2 text-gray-900">{error.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-serif font-semibold text-[#0A0A0A]">
            Excel File Format
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              try {
                const link = document.createElement('a')
                link.href = '/sample-books-upload.xlsx'
                link.download = 'sample-books-upload.xlsx'
                document.body.appendChild(link)
                link.click()
                // Use setTimeout to ensure click completes before removal
                setTimeout(() => {
                  if (document.body.contains(link)) {
                    document.body.removeChild(link)
                  }
                }, 100)
              } catch (error) {
                console.error('Error downloading sample file:', error)
                toast({
                  title: 'Download error',
                  description: 'Failed to download sample file. Please try again.',
                  variant: 'destructive',
                })
              }
            }}
            className="text-blue-700 border-blue-300 hover:bg-blue-100"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Sample
          </Button>
        </div>
        <div className="space-y-2 text-sm text-gray-700">
          <p className="mb-3 p-3 bg-white rounded border border-blue-200">
            <strong className="text-blue-900">💡 Tip:</strong> Download the sample Excel file above to see the correct format with example data.
          </p>
          <p>
            <strong>Required columns:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Book Name</strong> - The title of the book</li>
            <li><strong>Author Name</strong> - The author of the book</li>
          </ul>
          <p className="mt-3">
            <strong>Optional columns:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Book ISBN</strong> - ISBN number (10 or 13 digits)</li>
            <li><strong>Type</strong> - Book category (e.g., ଗଳ୍ପ, କବିତା, ଉପନ୍ୟାସ, etc.)</li>
          </ul>
          <p className="mt-3 text-xs text-gray-600">
            Missing required fields (cover, description, colors) will be auto-generated.
            Duplicate books (same title) will be skipped.
          </p>
        </div>
      </div>
    </div>
  )
}

