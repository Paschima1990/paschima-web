'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-[#0A0A0A] tracking-tight">
            ଆମର ପୁସ୍ତକ କେଉଁଠାରେ କିଣିବେ
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            ଆମର ପୁସ୍ତକଗୁଡ଼ିକ ମୁଖ୍ୟ ବୁକଷ୍ଟୋର୍ ଏବଂ ବିଭିନ୍ନ ଅନଲାଇନ୍ ରିଟେଲର୍ ମାଧ୍ୟମରେ ଉପଲବ୍ଧ। ଆପଣ ଆମର କାର୍ଯ୍ୟାଳୟରୁ ସିଧାସଳଖ କିମ୍ବା ସ୍ପିଡ୍ ପୋଷ୍ଟ ଡିଲିଭେରି ପାଇଁ ୱାଟ୍ସଆପ୍ ମାଧ୍ୟମରେ ମଧ୍ୟ ପୁସ୍ତକ କିଣିପାରିବେ।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="border-[#635BFF] text-[#635BFF] hover:bg-[#635BFF] hover:text-white text-base px-8 py-6"
            >
              <Link href="/contact">
                ସମସ୍ତ ରିଟେଲର୍ ଦେଖନ୍ତୁ
              </Link>
            </Button>
            <Button 
              asChild
              size="lg"
              className="bg-[#635BFF] hover:bg-[#5548E5] text-white text-base px-8 py-6"
            >
              <Link href="/contact">
                ଆମ ସହିତ ସମ୍ପର୍କ କରନ୍ତୁ
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

