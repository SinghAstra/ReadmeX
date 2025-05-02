"use client";

import Copy from "@/components/markdown/copy";
import React, { JSXElementConstructor, ReactElement } from "react";

interface DocumentProps {
  documentName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parsedDocument: ReactElement<any, string | JSXElementConstructor<any>> | null;
  content: string;
}

const Document = ({ documentName, parsedDocument, content }: DocumentProps) => {
  return (
    <div className="w-full border bg-muted/20 flex flex-col rounded">
      <div className="p-2 border-b flex items-center justify-between">
        {documentName}
        <Copy content={content} fileName={documentName} />
      </div>
      <div className="py-2 px-4">{parsedDocument}</div>
    </div>
  );
};

export default Document;
