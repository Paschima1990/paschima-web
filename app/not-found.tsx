import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-serif font-bold mb-4 text-[#0A0A0A]">404</h1>
        <h2 className="text-2xl font-serif font-semibold mb-4 text-[#0A0A0A]">
          ପୃଷ୍ଠା ମିଳିଲା ନାହିଁ
        </h2>
        <p className="text-gray-600 mb-8">
          ଆପଣ ଯେଉଁ ପୃଷ୍ଠା ଖୋଜୁଛନ୍ତି ତାହା ମିଳିଲା ନାହିଁ।
        </p>
        <Button asChild>
          <Link href="/">
            ମୁଖ୍ୟ ପୃଷ୍ଠାକୁ ଫେରନ୍ତୁ
          </Link>
        </Button>
      </div>
    </div>
  )
}

