import React from "react";
import DOMPurify from "isomorphic-dompurify";
import "react-quill/dist/quill.snow.css";

// DOMPurify sanitizes HTML and prevents XSS attacks

type PostContentProps = {
  text: string;
};

export default function PostContent({ text }: PostContentProps) {
  return (
    <div className="relative min-h-36 md:min-h-24">
      <div
        className="!px-0 !py-3
            text-sm md:text-base
            ql-editor prose prose-sm max-w-none
            prose-headings:font-bold prose-headings:mb-2
            prose-p:my-2 prose-ul:my-2 prose-ol:my-2
            prose-li:my-0 prose-blockquote:my-2
            prose-pre:my-2 prose-code:px-1 prose-code:py-0.5
            prose-code:bg-gray-100 prose-code:rounded
            prose-img:my-2 prose-hr:my-4"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(String(text)),
        }}
      />
    </div>
  );
}
