import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/Logo/logoWhite.webp"
                alt="Paschima Publication"
                width={140}
                height={50}
                className="h-10 w-auto object-contain brightness-0"
              />
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              ଭୁବନେଶ୍ୱର, ଓଡ଼ିଶାରେ ଅବସ୍ଥିତ ଏକ ଅଗ୍ରଣୀ ଓଡ଼ିଆ ଭାଷା ପୁସ୍ତକ ପ୍ରକାଶକ, ଆକର୍ଷଣୀୟ କାହାଣୀ, ଗଭୀର କବିତା, ରୋଚକ ପ୍ରବନ୍ଧ ଏବଂ ବିଭିନ୍ନ ଅଣ-କାଳ୍ପନିକ ରଚନା ସହିତ ସାହିତ୍ୟିକ ପରିବେଶକୁ ସମୃଦ୍ଧ କରିବାରେ ନିୟୋଜିତ।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-semibold text-[#0A0A0A] mb-4">
              ଦ୍ରୁତ ଲିଙ୍କ୍
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/book"
                  className="text-sm text-gray-600 hover:text-[#635BFF] transition-colors"
                >
                  ପୁସ୍ତକ
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:text-[#635BFF] transition-colors"
                >
                  ଆମ ବିଷୟରେ
                </Link>
              </li>
              <li>
                <a
                  href="mailto:mail@paschima.in"
                  className="text-sm text-gray-600 hover:text-[#635BFF] transition-colors"
                >
                  ସମ୍ପର୍କ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-serif font-semibold text-[#0A0A0A] mb-4">
              ଆମ ସହିତ ସମ୍ପର୍କ କରନ୍ତୁ
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                <div className="text-sm text-gray-600">
                  <p>Plot No- 1822, Nayapalli</p>
                  <p>Bhubaneswar, Odisha 751012</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-400 shrink-0" />
                <a
                  href="tel:+917008221789"
                  className="text-sm text-gray-600 hover:text-[#635BFF] transition-colors"
                >
                  +91 70082 21789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400 shrink-0" />
                <a
                  href="mailto:mail@paschima.in"
                  className="text-sm text-gray-600 hover:text-[#635BFF] transition-colors"
                >
                  mail@paschima.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex items-center justify-center gap-6 mb-6">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#635BFF] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#635BFF] transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Paschima Publications. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

