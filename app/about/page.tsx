import Link from 'next/link'

export const metadata = {
  title: 'ଆମ ବିଷୟରେ — Paschima Publications',
  description: 'ପଶ୍ଚିମା ପବ୍ଲିକେଶନସ୍ ବିଷୟରେ ଜାଣନ୍ତୁ, ଭୁବନେଶ୍ୱର, ଓଡ଼ିଶାରେ ଅବସ୍ଥିତ ଏକ ଅଗ୍ରଣୀ ଓଡ଼ିଆ ଭାଷା ପୁସ୍ତକ ପ୍ରକାଶକ।',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-6 sm:mb-8 text-[#0A0A0A] tracking-tight">
          ଆମ ବିଷୟରେ
        </h1>

        <section className="mb-10 sm:mb-12">

          <p className="text-gray-700 leading-relaxed mb-4 text-base sm:text-lg">
            ପଶ୍ଚିମା ପବ୍ଲିକେଶନସ୍ ହେଉଛି ଭୁବନେଶ୍ୱର, ଓଡ଼ିଶାରେ ଅବସ୍ଥିତ ଏକ{' '}
            <strong className="text-[#0A0A0A] font-semibold">ଅଗ୍ରଣୀ ଓଡ଼ିଆ ଭାଷା ପୁସ୍ତକ ପ୍ରକାଶକ</strong>, ଯାହା ଆକର୍ଷଣୀୟ କାହାଣୀ, ଗଭୀର କବିତା, ରୋଚକ ପ୍ରବନ୍ଧ ଏବଂ ବିଭିନ୍ନ ଅଣ-କାଳ୍ପନିକ ରଚନା ସହିତ ସାହିତ୍ୟିକ ପରିବେଶକୁ ସମୃଦ୍ଧ କରିବାରେ ନିୟୋଜିତ।
          </p>
          <p className="text-gray-700 leading-relaxed mb-4 text-base sm:text-lg">
            ଆମର ଉଦ୍ଦେଶ୍ୟ ହେଉଛି ପ୍ରତିଭାଶାଳୀ ଲେଖକମାନଙ୍କୁ ସଶକ୍ତ କରିବା ଏବଂ ସେମାନଙ୍କୁ ବିଚିତ୍ର କାହାଣୀ ଏବଂ ଗଭୀର ଅନୁଭବ ଖୋଜୁଥିବା ପାଠକମାନଙ୍କ ସହିତ ସଂଯୋଗ କରିବା, ଯାହା ନିଶ୍ଚିତ କରେ ଯେ ପ୍ରତ୍ୟେକ ପ୍ରକାଶନା ପାଠକ ସନ୍ତୁଷ୍ଟିର ସର୍ବୋଚ୍ଚ ମାନକକୁ ପୂରଣ କରେ। ଆମେ ଓଡ଼ିଶାର ସମୃଦ୍ଧ ସାହିତ୍ୟିକ ପରମ୍ପରାକୁ ପ୍ରଚାର ଏବଂ ସଂରକ୍ଷଣ କରିବାରେ ଗର୍ବିତ।
          </p>
        </section>

        <section className="mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold mt-8 sm:mt-12 mb-4 sm:mb-6 text-[#0A0A0A]">
            ଆମର ସଂଗ୍ରହ ଅନୁସନ୍ଧାନ କରନ୍ତୁ
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 text-base sm:text-lg">
            ବିଭିନ୍ନ ଶ୍ରେଣୀରେ ଆମର ବିସ୍ତୃତ ସଂଗ୍ରହ ଆବିଷ୍କାର କରନ୍ତୁ। ସାମ୍ପ୍ରତିକ ଗଳ୍ପ ଏବଂ ଶାସ୍ତ୍ରୀୟ ସାହିତ୍ୟରୁ ଶିକ୍ଷାମୂଳକ ବିଷୟବସ୍ତୁ ଏବଂ ବାର୍ଷିକ ବିଶେଷ ସଂସ୍କରଣ ପର୍ଯ୍ୟନ୍ତ, ପ୍ରତ୍ୟେକ ପାଠକଙ୍କ ପାଇଁ ଆମର କିଛି ଅଛି।
          </p>

          <h3 className="text-xl sm:text-xl md:text-2xl font-serif font-semibold mt-6 sm:mt-8 mb-3 sm:mb-4 text-[#0A0A0A]">
            ବିଶେଷ ଶ୍ରେଣୀଗୁଡ଼ିକ
          </h3>
          <ul className="list-disc pl-6 my-4 space-y-2 sm:space-y-3">
            <li className="text-gray-700 leading-relaxed text-base sm:text-lg">
              <strong className="text-[#0A0A0A] font-semibold">ଗଳ୍ପ ଓ ଉପନ୍ୟାସ</strong>: ପ୍ରଶଂସିତ ଏବଂ ଉଦୟମାନ ଓଡ଼ିଆ ଲେଖକମାନଙ୍କର ରୋଚକ କାହାଣୀ।
            </li>
            <li className="text-gray-700 leading-relaxed text-base sm:text-lg">
              <strong className="text-[#0A0A0A] font-semibold">କବିତା ସଂକଳନ</strong>: ମନକୁ ଚିନ୍ତାକୁ ପ୍ରେରଣା ଦେଉଥିବା ପଦ୍ୟଗୁଡ଼ିକ ଯାହା ଆତ୍ମାକୁ ସ୍ପର୍ଶ କରେ।
            </li>
            <li className="text-gray-700 leading-relaxed text-base sm:text-lg">
              <strong className="text-[#0A0A0A] font-semibold">ପ୍ରବନ୍ଧ ଓ ଆଲୋଚନା</strong>: ବିଭିନ୍ନ ବିଷୟରେ ଗଭୀର ବିଶ୍ଳେଷଣ ଏବଂ ଟିପ୍ପଣୀ।
            </li>
            <li className="text-gray-700 leading-relaxed text-base sm:text-lg">
              <strong className="text-[#0A0A0A] font-semibold">ବାର୍ଷିକ ପବ୍ଲିକେଶନ୍ସ</strong>: ଆମର ଲୋକପ୍ରିୟ "ପଶ୍ଚିମ ମହାପୁଜା" ଶ୍ରେଣୀ ସହିତ।
            </li>
            <li className="text-gray-700 leading-relaxed text-base sm:text-lg">
              <strong className="text-[#0A0A0A] font-semibold">କ୍ଷେତ୍ରୀୟ ଆଗ୍ରହ</strong>: ପଶ୍ଚିମ ଓଡ଼ିଶାର ସଂସ୍କୃତି, ଭ୍ରମଣ ଏବଂ ଇତିହାସ ଉପରେ ପୁସ୍ତକ।
            </li>
          </ul>
        </section>

        <section className="mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold mt-8 sm:mt-12 mb-4 sm:mb-6 text-[#0A0A0A]">
            ସର୍ବାଧିକ ବିକ୍ରୟ
          </h2>
          <ul className="list-disc pl-6 my-4 space-y-2 sm:space-y-3">
            <li className="text-gray-700 leading-relaxed italic text-base sm:text-lg">ତୁମ ପରେ - ସ୍ନିଗ୍ଧା ତ୍ରିପାଠୀ</li>
            <li className="text-gray-700 leading-relaxed italic text-base sm:text-lg">ଜମ୍ବୁଲୋକ - ଭୀମ ପ୍ରୁସ୍ତି</li>
            <li className="text-gray-700 leading-relaxed italic text-base sm:text-lg">ଅବଧା ପାଦଚିହ୍ନ - ଆର୍ ବାଳକୃଷ୍ଣ</li>
            <li className="text-gray-700 leading-relaxed italic text-base sm:text-lg">ବାଟିଘର - ସ୍ନିଗ୍ଧା ତ୍ରିପାଠୀ</li>
            <li className="text-gray-700 leading-relaxed italic text-base sm:text-lg">ଦାଦନ - କ୍ଷେତ୍ରବାସୀ ନାୟକ</li>
          </ul>
        </section>

      </article>
    </div>
  )
}
