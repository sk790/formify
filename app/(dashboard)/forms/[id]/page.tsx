import { GetFormById } from "@/actions/form";
import FormBuilder from "@/components/FormBuilder";
import FormLinkShare from "@/components/FormLinkShare";
import VisitBtn from "@/components/VisitBtn";
import React from "react";
import { StatsCard } from "../../page";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";

async function FormDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const form = await GetFormById(Number(id));
  if (!form) {
    throw new Error("Form not found");
  }
  const { visits, submissions } = form;
  let submissionRate = 0;
  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;
  return (
    <>
      <div className="py-10 border-b border-muted">
        <div className="flex justify-between container">
          <h1 className="text-4xl font-bold truncate">{form.name}</h1>
          <VisitBtn shareLink={form.shareURL} />
        </div>
      </div>
      <div className="py-4 border-b border-muted">
        <div className="container flex gap-2 items-center justify-between">
          <FormLinkShare shareLink={form.shareURL} />
        </div>
      </div>
      <div className="container w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Visits"
          icon={<LuView className="text-blue-600" />}
          helperText="All time form visits"
          value={visits.toLocaleString() || ""}
          loading={false}
          className="shadow-md shadow-blue-600"
        />
        <StatsCard
          title="Total Submission"
          icon={<FaWpforms className="text-yellow-600" />}
          helperText="All time form submissions"
          value={submissions.toLocaleString() || ""}
          loading={false}
          className="shadow-md shadow-yellow-600"
        />
        <StatsCard
          title="Submission Rate"
          icon={<HiCursorClick className="text-red-600" />}
          helperText="All time form  "
          value={submissionRate.toLocaleString() + "%" || ""}
          loading={false}
          className="shadow-md shadow-red-600"
        />
        <StatsCard
          title="Bounce Rate"
          icon={<TbArrowBounce className="text-green-600" />}
          helperText="All time form visits"
          value={bounceRate.toLocaleString() + "%" || ""}
          loading={false}
          className="shadow-md shadow-green-600"
        />
      </div>
      <div className="pt-8 container">
        <SubmissionTable formId={form.id} />
      </div>
    </>
  );
}

function SubmissionTable({ formId }: { formId: number }) {
  return (
    <>
      <h1 className="text-2xl font-bold">Submissions</h1>
    </>
  );
}
export default FormDetailPage;
