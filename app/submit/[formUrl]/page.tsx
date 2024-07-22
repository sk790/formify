import React from "react";
import { GetFormContentByUrl } from "../../../actions/form";

async function SubmitePage({ params }: { params: { formUrl: string } }) {
  const form = await GetFormContentByUrl(params.formUrl);
  return <div>Sumit Page</div>;
}

export default SubmitePage;
