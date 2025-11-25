import Link from 'next/link'
import { Mail, Phone, MapPin, ExternalLink, MessageCircle } from 'lucide-react'

export const metadata = {
    title: 'Contact Us — Paschima Publications',
    description: 'Get in touch with Paschima Publications. Find our office address, phone numbers, email, and where to buy our books online.',
}

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white">
            <article className="max-w-4xl mx-auto px-6 py-12 sm:py-16 md:py-20">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-4 sm:mb-6 md:mb-8 text-[#0A0A0A] tracking-tight">
                    ଆମ ସହିତ ସମ୍ପର୍କ କରନ୍ତୁ
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-10 md:mb-12">
                    ଆମେ ଲେଖକ, ବୁକଷ୍ଟୋର୍ ଏବଂ ପାଠକମାନଙ୍କଠାରୁ ପ୍ରଶ୍ନ ଏବଂ ପ୍ରଶ୍ନଗୁଡ଼ିକୁ ସ୍ୱାଗତ କରୁଛୁ।
                </p>

                {/* Contact Information */}
                <section className="mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold mb-6 sm:mb-8 text-[#0A0A0A]">
                        କାର୍ଯ୍ୟାଳୟ ଠିକଣା
                    </h2>
                    <div className="flex items-start gap-3 sm:gap-4 mb-8">
                        <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-[#635BFF] mt-0.5 shrink-0" />
                        <div className="text-gray-700 leading-relaxed text-base sm:text-lg">
                            <p className="font-semibold text-[#0A0A0A] mb-1">Plot No- 1822, Nayapalli</p>
                            <p>Bhubaneswar, Odisha</p>
                            <p>India, 751012</p>
                        </div>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold mt-12 mb-6 sm:mb-8 text-[#0A0A0A]">
                        ସମ୍ପର୍କ କରନ୍ତୁ
                    </h2>
                    <ul className="space-y-4 sm:space-y-5">
                        <li className="flex items-center gap-3 sm:gap-4">
                            <div className="p-2 sm:p-3 bg-[#635BFF]/10 rounded-lg">
                                <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-[#635BFF] shrink-0" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-0.5">Phone</p>
                                <a
                                    href="tel:+917008221789"
                                    className="text-base sm:text-lg text-gray-700 hover:text-[#635BFF] transition-colors font-medium"
                                >
                                    +91 70082 21789
                                </a>
                            </div>
                        </li>
                        <li className="flex items-center gap-3 sm:gap-4">
                            <div className="p-2 sm:p-3 bg-[#635BFF]/10 rounded-lg">
                                <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-[#635BFF] shrink-0" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-0.5">WhatsApp (for orders)</p>
                                <a
                                    href="https://wa.me/918598076014"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-base sm:text-lg text-gray-700 hover:text-[#635BFF] transition-colors font-medium inline-flex items-center gap-1"
                                >
                                    +91 85980 76014
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </li>
                        <li className="flex items-center gap-3 sm:gap-4">
                            <div className="p-2 sm:p-3 bg-[#635BFF]/10 rounded-lg">
                                <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-[#635BFF] shrink-0" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-0.5">Email</p>
                                <a
                                    href="mailto:mail@paschima.in"
                                    className="text-base sm:text-lg text-gray-700 hover:text-[#635BFF] transition-colors font-medium"
                                >
                                    mail@paschima.in
                                </a>
                            </div>
                        </li>
                    </ul>

                    <div className="mt-8 sm:mt-10">
                        <p className="text-gray-700 leading-relaxed mb-4 text-base sm:text-lg">
                            ସାମାଜିକ ମାଧ୍ୟମରେ ଆମ ସହିତ ସଂଯୋଗ ହୋଇନିଅନ୍ତୁ ନବୀନତମ ଅପଡେଟ୍ ଏବଂ ନୂଆ ରିଲିଜ୍ ପାଇଁ:
                        </p>
                        <div className="flex items-center gap-4 sm:gap-6">
                            <a
                                href="https://www.instagram.com/paschimapublications"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#635BFF] hover:text-[#5548E5] transition-colors font-medium text-base sm:text-lg inline-flex items-center gap-2"
                            >
                                Instagram
                                <ExternalLink className="w-4 h-4" />
                            </a>
                            <span className="text-gray-300">|</span>
                            <a
                                href="https://www.facebook.com/Paschima"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#635BFF] hover:text-[#5548E5] transition-colors font-medium text-base sm:text-lg inline-flex items-center gap-2"
                            >
                                Facebook
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* Where to Buy */}
                <section className="mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold mb-4 sm:mb-6 text-[#0A0A0A]">
                        ଆମର ପୁସ୍ତକ କେଉଁଠାରେ କିଣିବେ
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-6 sm:mb-8 text-base sm:text-lg">
                        ଆମର ପୁସ୍ତକଗୁଡ଼ିକ ମୁଖ୍ୟ ବୁକଷ୍ଟୋର୍ ଏବଂ ବିଭିନ୍ନ ଅନଲାଇନ୍ ରିଟେଲର୍ ମାଧ୍ୟମରେ ଉପଲବ୍ଧ।
                    </p>
                    <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                        <li className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <ExternalLink className="h-5 w-5 text-[#635BFF] shrink-0" />
                            <Link
                                href="https://amzn.to/48uHRDX"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-base sm:text-lg text-gray-700 hover:text-[#635BFF] transition-colors font-medium flex-1"
                            >
                                Amazon.in
                            </Link>
                        </li>
                        <li className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <ExternalLink className="h-5 w-5 text-[#635BFF] shrink-0" />
                            <Link
                                href="https://www.odishaestore.com/paschima-publications"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-base sm:text-lg text-gray-700 hover:text-[#635BFF] transition-colors font-medium flex-1"
                            >
                                Odisha E Store
                            </Link>
                        </li>
                        <li className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <ExternalLink className="h-5 w-5 text-[#635BFF] shrink-0" />
                            <Link
                                href="https://ritikart.com/collections/books?sort_by=best-selling&filter.v.option.publisher=Paschima+Publications&filter.v.price.gte=&filter.v.price.lte="
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-base sm:text-lg text-gray-700 hover:text-[#635BFF] transition-colors font-medium flex-1"
                            >
                                Ritikart
                            </Link>
                        </li>
                        <li className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <ExternalLink className="h-5 w-5 text-[#635BFF] shrink-0" />
                            <Link
                                href="https://www.odiabookbazar.com/index.php?route=product/manufacturer/info&manufacturer_id=18"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-base sm:text-lg text-gray-700 hover:text-[#635BFF] transition-colors font-medium flex-1"
                            >
                                Odiabookbazar.com
                            </Link>
                        </li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                        ଆପଣ ଆମର କାର୍ଯ୍ୟାଳୟରୁ ସିଧାସଳଖ କିମ୍ବା ସ୍ପିଡ୍ ପୋଷ୍ଟ ଡିଲିଭେରି ପାଇଁ ୱାଟ୍ସଆପ୍ ମାଧ୍ୟମରେ ମଧ୍ୟ ପୁସ୍ତକ କିଣିପାରିବେ।
                    </p>
                </section>
            </article>
        </div>
    )
}

