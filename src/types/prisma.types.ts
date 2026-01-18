import { Prisma } from "@prisma/client";

export type TopRankerResult = {
  id: string;
  name: string;
  roll_number: string;
  class: string;
  total_score: number;
  correct_attempt: number;
  total_attempt: number;
  rank: bigint | string;
  school_name: string;
  school_code: string;
  center_name: string;
  center_code: string;
  accuracy: string;
};

export interface Center {
  id: number;
  code: string;
  name: string;
}

export interface School {
  id: number;
  name: string;
  code: string;
}

export interface Result {
  id: string;
  name: string;
  roll_number: string;
  class: string;
  total_attempt: number;
  correct_attempt: number;
  total_score: number;
  centerId: number;
  schoolId: number;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentResult extends Result {
  rank: number;
  school: School;
  center: Center;
}

export type StudentWithSchoolCenter = Prisma.StudentGetPayload<{
  include: {
    school: true;
    center: true;
  };
}>;
export type StudentWithSchoolCenterResult = Prisma.StudentGetPayload<{
  include: {
    result: true;
    school: true;
    center: true;
  };
}>;

// Extended type for result page with rank
export type StudentResultWithRank = StudentWithSchoolCenterResult & {
  result: StudentWithSchoolCenterResult['result'] & {
    rank: number;
    totalStudents: number;
  };
};
