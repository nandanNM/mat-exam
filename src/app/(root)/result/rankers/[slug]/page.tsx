import { prisma } from "@/lib/prisma";
import { TopRankerResult } from "@/types/prisma.types";
import { ArrowLeft } from "lucide-react";
import { unstable_cache } from "next/cache";
import Link from "next/link";

export default async function TopRankerResultPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: className } = await params;
  
  const getCachedTopRankers = unstable_cache(
    async (className: string) => {
      const rankers = await prisma.$queryRaw<TopRankerResult[]>`
        WITH RankedResults AS (
          SELECT 
            s.id,
            s."fullName" as name,
            s."rollNumber" as roll_number,
            s.class,
            r.total_score,
            r.correct_attempt,
            r.total_attempt,
            -- Calculate accuracy as percentage
            CASE 
              WHEN r.total_attempt > 0 THEN (r.correct_attempt::DECIMAL / r.total_attempt::DECIMAL) * 100
              ELSE 0
            END as accuracy,
            sc.school_name,
            sc.school_code,
            c.center_name,
            c.center_code,
            DENSE_RANK() OVER (
              ORDER BY 
                r.total_score DESC,
                -- Accuracy as tie-breaker (higher accuracy = better rank)
                CASE 
                  WHEN r.total_attempt > 0 THEN (r.correct_attempt::DECIMAL / r.total_attempt::DECIMAL)
                  ELSE 0
                END DESC
            ) as rank
          FROM 
            students s
          JOIN 
            results r ON s.id = r."studentId"
          JOIN 
            schools sc ON s."schoolId" = sc.id
          JOIN 
            centers c ON s."centerId" = c.id
          WHERE
            s.class = ${className}
        )
        SELECT *
        FROM RankedResults
        WHERE rank <= 10
        ORDER BY rank, total_score DESC, accuracy DESC, name;
      `;
      
      const data = rankers.map((result) => ({
        ...result,
        rank: result.rank.toString(), // Convert BigInt safely
        accuracy: Number(result.accuracy).toFixed(2), // Format accuracy to 2 decimals
      }));

      return data;
    },
    [className],
    {
      tags: ["getTopRankers", `rankers-${className}`],
      revalidate: 3 * 60 * 60,
    },
  );

  const getRankSuffix = (rank: number): string => {
    if (rank > 3) return "th";
    return ["st", "nd", "rd"][rank - 1] || "th";
  };

  const data = await getCachedTopRankers(className);

  if (!data || data.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-destructive">
            Rankers not found for class {className}
          </h1>
          <p className="mb-6 text-gray-600">
            No results have been published yet for this class.
          </p>
          <Link
            href="/result/rankers"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-500 px-6 py-2 text-white transition-colors duration-300 hover:bg-blue-600"
          >
            <ArrowLeft className="size-5" />
            Back to Class List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800 md:text-4xl">
        Top Rankers - Class {className}
      </h1>
      <div className="mb-4 text-center text-sm text-gray-600">
        Ranking based on: Total Score (primary) → Accuracy % (tie-breaker)
      </div>
      <div className="w-full max-w-full overflow-hidden rounded-lg bg-white shadow-lg md:max-w-5xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <caption className="sr-only">
              Top 10 students in Class {className}
            </caption>
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-3 text-left">Rank</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="hidden px-4 py-3 text-left md:table-cell">Class</th>
                <th className="hidden px-4 py-3 text-left sm:table-cell">Center</th>
                <th className="px-4 py-3 text-center">Roll Number</th>
                <th className="px-4 py-3 text-center">Score</th>
                <th className="hidden px-4 py-3 text-center lg:table-cell">Accuracy</th>
                <th className="hidden px-4 py-3 text-center lg:table-cell">Attempts</th>
              </tr>
            </thead>
            <tbody>
              {data.map((ranker, index) => (
                <tr
                  key={`${ranker.id}-${index}`}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50 transition-colors`}
                >
                  <td className="px-4 py-3 font-medium">
                    <span className={`inline-flex items-center justify-center ${
                      Number(ranker.rank) === 1 ? "text-yellow-600 font-bold text-lg" :
                      Number(ranker.rank) === 2 ? "text-gray-500 font-bold text-lg" :
                      Number(ranker.rank) === 3 ? "text-orange-600 font-bold text-lg" :
                      ""
                    }`}>
                      {Number(ranker.rank) === 1 && "🥇 "}
                      {Number(ranker.rank) === 2 && "🥈 "}
                      {Number(ranker.rank) === 3 && "🥉 "}
                      {`${ranker.rank}${getRankSuffix(Number(ranker.rank))}`}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium">{ranker.name.toUpperCase()}</td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    {ranker.class}
                  </td>
                  <td className="hidden px-4 py-3 text-sm sm:table-cell">
                    <div>{ranker.center_name}</div>
                    <div className="text-xs text-gray-500">{ranker.center_code}</div>
                  </td>
                  <td className="px-4 py-3 text-center font-mono text-sm">
                    {ranker.roll_number.toUpperCase()}
                  </td>
                  <td className="px-4 py-3 text-center font-bold text-blue-600">
                    {ranker.total_score}
                  </td>
                  <td className="hidden px-4 py-3 text-center text-green-600 font-semibold lg:table-cell">
                    {ranker.accuracy}%
                  </td>
                  <td className="hidden px-4 py-3 text-center text-gray-600 lg:table-cell">
                    {ranker.correct_attempt}/{ranker.total_attempt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Mobile-friendly stats summary for hidden columns */}
      <div className="mt-4 w-full max-w-full md:max-w-5xl lg:hidden">
        <div className="rounded-lg bg-blue-50 p-4">
          <p className="text-xs text-gray-600 text-center">
            💡 View on larger screen to see Accuracy % and Attempts
          </p>
        </div>
      </div>

      <Link
        href="/result/rankers"
        className="mt-8 flex items-center justify-center gap-2 rounded-md bg-blue-500 px-6 py-3 text-white transition-colors duration-300 hover:bg-blue-600"
      >
        <ArrowLeft className="size-5" />
        Back to Class List
      </Link>
    </div>
  );
}
