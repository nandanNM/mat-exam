 "use client";
import ResultCard from "@/components/ResultCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  StudentResultWithRank } from "@/types/prisma.types";
import { SearchIcon } from "lucide-react";
import { useState, useTransition, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function Result() {
  const [searchResults, setSearchResults] = useState<StudentResultWithRank | null>(
    null,
  );
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  useEffect(() => {
    const rollParam = searchParams.get("roll");
    if (rollParam) {
      // Replace - with / to convert KU-26-VII-123 to KU/26/VII/123
      const rollNumber = rollParam.replace(/-/g, "/");
      fetchResult(rollNumber);
    }
  }, [searchParams]);

  function fetchResult(rollNumber: string) {
    if (!rollNumber) {
      toast.error("Please enter a valid roll number.");
      return;
    }

    startTransition(async () => {
      try {
        const { data } = await axios.post<StudentResultWithRank>("/api/student/result", {
          rollNumber,
        });
        setSearchResults(data);
        toast.success("Result found successfully!");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data?.error || "Failed to fetch result"
          );
        } else {
          toast.error("An unexpected error occurred");
        }
        setSearchResults(null);
      }
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearchResults(null);
    const form = e.currentTarget;
    const rollNumber = (form.rollNumber as HTMLInputElement).value.trim();
    
    if (!rollNumber) {
      toast.error("Please enter a valid roll number.");
      return;
    }

    fetchResult(rollNumber);
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <h1 className="font-title mb-6 text-2xl text-neutral-950">
        Search Your Result-2025
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="rollNumber" className="mb-1 text-sm text-neutral-700">
            Roll Number
          </label>
          <Input
            type="text"
            id="rollNumber"
            name="rollNumber"
            defaultValue={searchParams.get("roll")?.replace(/-/g, "/") || ""}
            placeholder="Enter your roll number eg. KU/26/VII/123"
            className="focus:ring-primary-500 rounded-md border border-neutral-300 px-4 py-2 text-neutral-950 focus:outline-none focus:ring"
          />
        </div>
        <Button
          disabled={isPending}
          type="submit"
          className="rounded-md px-4 py-2"
        >
          {isPending ? (
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 animate-bounce rounded-full bg-[#ffff] [animation-delay:-0.3s]"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-[#ffff] [animation-delay:-0.15s]"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-[#ffff]"></div>
            </div>
          ) : (
            <>
              <SearchIcon className="mr-2 h-5 w-5" />
              Search
            </>
          )}
        </Button>
      </form>
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-neutral-950">
          Search Results
        </h2>
        {!searchResults ? (
          <ul className="mt-4 space-y-2">
            <li className="rounded-md border border-neutral-300 px-4 py-2 text-neutral-950">
              Please verify your roll number. If you are sure it is correct, and
              still not able to find your result, please contact us at
              <a
                href="tel:+919382553880"
                className="ml-1 text-blue-600 hover:underline"
              >
                +91-9382553880
              </a>
              .
            </li>
          </ul>
        ) : (
          <ResultCard student={searchResults} />
        )}
      </div>
    </div>
  );
}

