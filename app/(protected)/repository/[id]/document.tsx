"use client";

import Copy from "@/components/markdown/copy";
import { Typography } from "@/components/ui/typography";
import { Markdown } from "@/lib/markdown";

interface DocumentProps {
  documentName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: string;
}

const Document = ({ documentName, content }: DocumentProps) => {
  return (
    <div className="w-full border bg-muted/20 flex flex-col rounded">
      <div className="p-2 border-b flex items-center justify-between">
        {documentName}
        <Copy content={content} fileName={documentName} />
      </div>
      <div className="py-2 px-4">
        <Typography>
          <Markdown>{content}</Markdown>
        </Typography>
      </div>
    </div>
  );
};

export default Document;
