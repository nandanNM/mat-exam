"use client";
import { Button } from "./ui/button";
import React from "react";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";
import { PrinterIcon } from "lucide-react";
import { StudentResultWithRank } from "@/types/prisma.types";

export default function ResultCard({ student }: { student: StudentResultWithRank }) {

  const printRef = React.useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${student.fullName}-rank-card.pdf`,
  });
  // const handleDownload = async () => {
  //   // Implement download logic here

  //   const printElement = printRef.current;
  //   if (!printElement || !printRef) return;

  //   const canvas = await html2canvas(printElement, {
  //     scale: 2,
  //     logging: false,
  //     useCORS: true,
  //     scrollY: -window.scrollY,
  //   });
  //   const data = canvas.toDataURL("image/png");
  //   const pdf = new jsPDF({
  //     orientation: "portrait",
  //     unit: "px",
  //     format: [canvas.width, canvas.height],
  //   });
  //   // const imgProperties = pdf.getImageProperties(data);
  //   // const pdfWidth = pdf.internal.pageSize.getWidth();
  //   // const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
  //   pdf.addImage(data, "PNG", 0, 0, canvas.width, canvas.height);
  //   pdf.save(`${student.name}-rank-card.pdf`);
  // };
  // console.log(student);

  return (
    <div className="">
      <div ref={printRef} className="mx-auto rounded-lg bg-white p-4 shadow-md">
        <section className="mb-4 flex flex-col items-center justify-between border-b pb-2 md:flex-row">
          <div className="flex flex-col items-center space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
            <h2 className="font-title text-center text-lg font-bold md:text-left">
              24RD MATHEMATICS APTITUDE TEST - 2026
            </h2>
          </div>
          <Image
            src="/kalyani-university-kalyani-logo.png"
            width={100}
            height={100}
            alt="Logo 2"
            className="mt-2 object-contain md:mt-0"
          />
          <h2 className="font-title font-bold">UNIVERSITY OF KALYANI</h2>
        </section>

        <section className="flex flex-col md:flex-row">
          <div className="mb-4 flex-1 md:mb-0 md:pr-4">
            <div className="mb-2">
              <span className="font-semibold">Candidate&apos;s Name: </span>
              <span>{student.fullName.toUpperCase()}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Center: </span>
              <span>{student.center.center_name.toUpperCase()}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Date of Exam: </span>
              <span>12-01-2026</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Class: </span>{" "}
              <span>{student.class}</span>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="mb-4">
              <div className="font-semibold">Roll Number</div>
              <div className="text-sm font-bold">{student.rollNumber}</div>
            </div>
            <div>
              <div className="font-semibold">Centre Code</div>
              <div>{student.center.center_code}</div>
            </div>
          </div>
        </section>
        <table className="mt-4 w-full table-auto border text-xs sm:text-sm md:text-base">
          <thead>
            <tr className="border bg-neutral-100 text-left">
              <th className="px-2 py-2 sm:px-4">Name</th>
              <th className="px-2 py-2 sm:px-4">Total Score</th>
              <th className="px-2 py-2 sm:px-4">Rank</th>
              <th className="px-2 py-2 sm:px-4">Total Attempts</th>
              <th className="px-2 py-2 sm:px-4">Correct Attempts</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border">
              <td className="px-2 py-2 sm:px-4">{student.fullName.toUpperCase()}</td>
              <td className="px-2 py-2 sm:px-4">{student.result?.total_score}</td>
              <td className="px-2 py-2 sm:px-4">
                {student.result.rank}{" "}
                {student.result.rank === 1
                  ? "st"
                  : student.result.rank === 2
                    ? "nd"
                    : student.result.rank === 3
                      ? "rd"
                      : "th"}{" "}
              </td>
              <td className="px-2 py-2 sm:px-4">{student.result?.total_attempt}</td>
              <td className="px-2 py-2 sm:px-4">{student.result?.correct_attempt}</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-4 border-t pt-4">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="text-xs sm:text-sm">
              <b>Rank in Figure:</b> {student.result.rank}{" "}
              {student.result.rank === 1
                ? "st"
                : student.result.rank === 2
                  ? "nd"
                  : student.result.rank === 3
                    ? "rd"
                    : "th"}
            </div>
          </div>
        </div>

        <div className="mb-4 mt-8 text-left">
          <Image width={90} height={70} src={"/mat-convenor-2026-signature.png"} alt="signature" />
          <strong className="ml-3 text-xs sm:text-sm">Convener</strong>
        </div>
      </div>
      <div className="mt-4 text-right">
        <Button onClick={() => handlePrint()} className="rounded-md px-4 py-2">
          <PrinterIcon className="mr-2 size-5" />
          Print
        </Button>
      </div>
    </div>
  );
}
