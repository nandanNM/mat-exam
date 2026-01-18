import Link from "next/link";
import Image from "next/image";
import ContactPage from "@/components/ContactUs";
import { NotepadTextIcon, ScrollTextIcon } from "lucide-react";

import AnimatedButton from "@/components/AnimatedButton";

export default async function Home() {
  return (
    <>
      <section className="flex flex-col items-center gap-6 bg-sky-50 px-4 py-20 dark:bg-sky-900 md:px-10 lg:flex-row">
        <div className="flex flex-col gap-6">
          <h2 className="text-center text-4xl font-extrabold text-slate-900 dark:text-white md:text-5xl lg:text-left lg:text-7xl">
            MATHEMATICS APTITUTE TEST 2026
          </h2>
          <p className="max-w-prose text-center md:text-lg lg:text-left lg:text-xl">
            MAT-2026 is a mathematics entrance test focused on enhancing
            problem-solving and analytical skills. It covers key topics like
            algebra, calculus, geometry, and logical reasoning. The exam aims to
            boost mathematical aptitude for academic and professional growth.
          </p>
          <div className="flex w-full flex-col gap-4">
            <Link
              href="/questions"
              className="rounded-xl bg-sky-500 p-3 text-center font-semibold text-white hover:bg-sky-600 active:bg-sky-700 dark:bg-sky-400 dark:text-sky-950 dark:hover:bg-sky-300 dark:active:bg-sky-500"
            >
              Explore Past Questions
            </Link>
            {/* <Link
              href="/admit"
              className={cn(
                "rounded-xl p-3 text-center font-semibold",
                buttonVariants({ variant: "outline" }),
              )}
            >
              Download Admit Card
            </Link> */}
            <Link href="/result">
              <AnimatedButton>
                <span className="flex items-center justify-center gap-2">
                  Check Result
                  <ScrollTextIcon className="h-6 w-6 text-pretty" />
                </span>
              </AnimatedButton>
            </Link>
            {/* top rankers button */}
            <Link href="/result/rankers">
              <button
                className="group relative isolation-auto z-10 mx-auto flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border-2 bg-[#0A0D2D] px-4 py-2 font-sans text-lg text-gray-50 shadow-xl backdrop-blur-md before:absolute before:-left-full before:-z-10 before:aspect-square before:w-full before:rounded-full before:bg-emerald-500 before:transition-all before:duration-700 hover:text-gray-50 before:hover:left-0 before:hover:w-full before:hover:scale-150 before:hover:duration-700 lg:font-semibold"
                type="submit"
              >
                Check Top Rankers
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 19"
                  className="h-8 w-8 rotate-45 justify-end rounded-full border border-gray-700 bg-gray-50 p-2 text-gray-50 duration-300 ease-linear group-hover:rotate-90 group-hover:border-none group-hover:bg-gray-50"
                >
                  <path
                    className="fill-gray-800 group-hover:fill-gray-800"
                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                  ></path>
                </svg>
              </button>
            </Link>
          </div>
        </div>
        <Image
          src="/math1.png"
          alt="A girl holding a book in her hands while surrounded by other books, looking at a spaceship flying into the air"
          width={1664}
          height={1117}
          priority
          className="lg:w-6/12"
        />
      </section>

      <section>
        {/* notice */}
        <div id="notice">
          <div className="mx-auto w-full max-w-full rounded-lg p-6 shadow">
            <div className="mb-3 flex items-center justify-start">
              <NotepadTextIcon className="mr-2 size-9 text-primary" />
              <strong className="font-title text-2xl text-neutral-950">
                Notice Board
              </strong>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-md border bg-primary p-4 text-secondary">
                <strong className="text-lg font-semibold">
                  Result Notice 👍
                </strong>
                <p className="text-sm">
                  Great news! 🎉 MAT-2026 results are live as of <b>18/01/26</b>
                </p>
                <Link
                className=" underline"
                href="/result">
                click hare
                </Link>
              </div>
              <div className="rounded-md border bg-primary p-4 text-secondary">
                <strong className="text-lg font-semibold">
                  Exam Notice 👍 🎉
                </strong>
                <p className="text-sm">
                  The exam for MAT-2026 will be held on{" "}
                  <span className="font-semibold">11 January</span>. Click the
                  link below for more details.
                  <Link className="ml-2 underline" href="#faqs">
                    Click here
                  </Link>
                </p>
              </div>
              <div className="rounded-md border bg-primary p-4 text-secondary">
                <h2 className="text-lg font-semibold">
                  🎓 MAT-2026 Exam Form Fill-Up Has Started! 🎉
                </h2>
                <p className="text-sm">
                  The exam form fill-up for MAT-2026 has officially started!
                  👍🎉
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="discover-examshare"
        className="flex flex-col items-center gap-7 px-4 py-14 md:px-10 lg:flex-row"
      >
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Discover MAT
          </h2>
          <div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                {/* <FaRegCompass size={25} /> */}
                <h3 className="text-xl">Past Goldmines</h3>
              </div>
              <p className="ml-3 max-w-prose border-l border-sky-200 px-5 pb-6 pt-2 dark:border-sky-700">
                There is nothing new under the sun. Explore questions from
                earlier years and beyond, Officially provided by the exam
                authorities to help you to enhance your exam preparation with
                authentic and reliable resources.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                {/* <LiaUsersSolid size={25} /> */}
                <h3 className="text-xl">Boost Learning</h3>
              </div>
              <p className="ml-3 max-w-prose border-l border-sky-200 px-5 pb-6 pt-2 dark:border-sky-700">
                Unlock the potential of collaborative learning. Share, discuss,
                and learn from others answers to these past examination
                questions.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                {/* <BsGlobe size={25} /> */}
                <h3 className="text-xl">Help The Future</h3>
              </div>
              <p className="ml-3 max-w-prose px-5 pb-6 pt-2">
                Invest in your own bright future by dedicating time to learning
                and growth. Every effort you make today brings you one step
                closer to achieving your dreams and unlocking your true
                potential.
              </p>
            </div>
          </div>
        </div>
        <Image
          src="/math3.avif"
          alt="A young man sitting and extending his hands to assist a young girl who is falling on the ground and reaching out for help"
          width={1664}
          height={1117}
          priority
          className="lg:w-5/12"
        />
      </section>
      <section className="flex flex-col gap-6 bg-sky-50 px-4 py-14 dark:bg-sky-900 md:px-10">
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sky-400 to-sky-600 p-12 text-white dark:from-sky-300 dark:to-sky-500 dark:text-sky-950">
          <h3 className="text-4xl font-extrabold">100+</h3>
          <p className="text-3xl font-medium">Institutions</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sky-400 to-sky-600 p-12 text-white dark:from-sky-300 dark:to-sky-500 dark:text-sky-950">
          <h3 className="text-4xl font-extrabold">2000+</h3>
          <p className="text-3xl font-medium">Students</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sky-400 to-sky-600 p-12 text-white dark:from-sky-300 dark:to-sky-500 dark:text-sky-950">
          <h3 className="text-4xl font-extrabold">10+</h3>
          <p className="text-3xl font-medium">Centers</p>
        </div>
      </section>
      <section
        id="faqs"
        className="flex flex-col items-center gap-7 px-4 py-14 md:px-10 lg:flex-row"
      >
        <Image
          src="/faq.svg"
          alt=""
          width={1000}
          height={659}
          className="lg:w-5/12"
        />
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="mb-2 max-w-prose font-medium text-slate-900 dark:text-white">
                How can I view the past exam questions for my school?
              </h3>
              <p className="max-w-prose text-sm">
                To access past exam questions for your class, go to the
                <Link
                  href="/questions"
                  className="font-bold text-sky-500 hover:text-slate-400 hover:underline hover:decoration-sky-500 hover:underline-offset-4"
                >
                  {" "}
                  past questions archive page{" "}
                </Link>
                and locate your class and click a year ,you will be directed to
                a dedicated section displaying the <strong>
                  available
                </strong>{" "}
                past questions for your class. If there are no past questions
                available for your class, you will be redirected to a 404 error
                page.
              </p>
            </div>
            <div>
              <h3 className="mb-2 max-w-prose font-medium text-slate-900 dark:text-white">
                How can I check result?
              </h3>
              <p className="max-w-prose text-sm">
                To check your result, go to the
                <Link
                  href="/"
                  className="font-bold text-sky-500 hover:text-slate-400 hover:underline hover:decoration-sky-500 hover:underline-offset-4"
                >
                  {" "}
                  result page{" "}
                </Link>
                and input your Roll Number and click the check button. You will
                be redirected to a dedicated section displaying your result.
              </p>
            </div>
            <div>
              <h3 className="mb-2 max-w-prose font-medium text-slate-900 dark:text-white">
                When are the results usually released?
              </h3>
              <p className="max-w-prose text-sm">
                The results are usually released within 7 days after the
                examination. You can check the result page to see if your result
                has been released.
              </p>
            </div>
            <div>
              <h3 className="mb-2 max-w-prose font-medium text-slate-900 dark:text-white">
                How many questions are available for each class?
              </h3>
              <p className="max-w-prose text-sm">
                <strong>25</strong> questions are available for each class.
              </p>
            </div>
            <div>
              <h3 className="mb-2 max-w-prose font-medium text-slate-900 dark:text-white">
                Will extra time be given for reading questions and filling the
                roll number and name...?
              </h3>
              <p className="max-w-prose text-sm">Yes</p>
            </div>
          </div>
        </div>
      </section>
      <ContactPage />
    </>
  );
}
