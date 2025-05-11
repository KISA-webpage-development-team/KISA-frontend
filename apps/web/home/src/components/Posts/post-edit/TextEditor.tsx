import React, { useMemo, useRef, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { postPresignedURL, getPresignedURL } from "@/apis/images/queries";
import { putImageToS3 } from "@/apis/images/mutations";

type TextEditorProps = {
  token: string | undefined;
  text: string;
  setText: (e: string) => void;
};

export default function TextEditor({ token, text, setText }: TextEditorProps) {
  // Refers to the ReactQuill component when passed to the ref prop
  const reactQuillRef: any = useRef(null);

  // Add event listener to the quill container for image drop
  useEffect(() => {
    const quillContainer = document.querySelector(".quill");
    if (quillContainer) {
      quillContainer.addEventListener("drop", imageDropHandler);
      quillContainer.addEventListener("paste", imagePasteHandler);
    }

    // Cleanup: remove event listener from DOM when dismounted
    return () => {
      quillContainer.removeEventListener("drop", imageDropHandler);
      quillContainer.removeEventListener("paste", imagePasteHandler);
    };
  }, []);

  const uploadImage = async (file: File, quill: any) => {
    // Make api call to get presigned URL
    let fileKey = `temp/${new Date().toISOString()}-${file.name}`;
    let fileType = file.type;
    const postRes = await postPresignedURL(token, { fileKey, fileType });

    // Upload file to S3 using presigned URL
    await putImageToS3(postRes?.presignedURL, file);
    const getRes = await getPresignedURL(token, { fileKey, fileType });

    // Insert image into editor
    const cursorPosition = quill.getSelection()?.index || 0;
    quill.insertEmbed(cursorPosition, "image", getRes?.fileURL);
    quill.setSelection(cursorPosition + 1);
  };

  // Custom toolbar image input handler
  const imageToolbarHandler = async () => {
    const quill = reactQuillRef?.current?.getEditor();

    if (!quill) return;

    // Create file holder
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.setAttribute("multiple", "multiple");
    input.click();

    // When file selection is submitted
    input.onchange = async () => {
      if (input.files) {
        for (const file of Array.from(input.files)) {
          // Upload image to S3
          await uploadImage(file, quill);
        }
      }
    };
  };

  const imagePasteHandler = async (event: ClipboardEvent) => {
    const quill = reactQuillRef.current?.getEditor();
    if (!quill || !event.clipboardData) return;

    const items = event.clipboardData.items;
    let isImagePasted = false;

    for (const item of items) {
      if (item.type.startsWith("image/")) {
        // Prevent Quill from inserting base64 image
        event.preventDefault();

        // Upload image to S3
        isImagePasted = true;
        const file = item.getAsFile();
        if (file) {
          await uploadImage(file, quill);
        }
      }
    }

    // Allow non-image clipboard data to be pasted using default behavior
    if (!isImagePasted) {
      return;
    }
  };

  // Custom editor drop handler
  const imageDropHandler = async (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const quill = reactQuillRef.current?.getEditor();
    if (!quill || !event.dataTransfer?.files) return;

    for (const file of Array.from(event.dataTransfer.files)) {
      if (!file.type.startsWith("image/")) continue;

      // Upload image to S3
      await uploadImage(file, quill);
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["image", "link"],
          [{ size: ["small", false, "large", "huge"] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["bold", "underline", "italic"],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
        ],
        handlers: {
          image: imageToolbarHandler,
        },
      },
      // clipboard: {
      //   matchers: [["img", imagePasteHandler]],
      // },
    }),
    []
  );

  return (
    <div className="quill-wrapper">
      <style jsx global>{`
        /* Increase default font size in the editor */
        .quill-wrapper .ql-container {
          font-size: 16px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, sans-serif;
        }

        /* Match the toolbar font size */
        .quill-wrapper .ql-toolbar {
          font-size: 16px;
        }

        /* Custom size classes */
        .quill-wrapper
          .ql-snow
          .ql-picker.ql-size
          .ql-picker-item[data-value="small"]::before {
          font-size: 14px;
          content: "Small";
        }

        .quill-wrapper
          .ql-snow
          .ql-picker.ql-size
          .ql-picker-item:not([data-value])::before {
          font-size: 16px;
          content: "Normal";
        }

        .quill-wrapper
          .ql-snow
          .ql-picker.ql-size
          .ql-picker-item[data-value="large"]::before {
          font-size: 20px;
          content: "Large";
        }

        .quill-wrapper
          .ql-snow
          .ql-picker.ql-size
          .ql-picker-item[data-value="huge"]::before {
          font-size: 24px;
          content: "Huge";
        }

        /* Size classes for the editor and rendered content */
        .ql-editor p,
        .ql-editor ol,
        .ql-editor ul,
        .ql-editor pre,
        .ql-editor blockquote {
          margin-bottom: 1em;
        }

        .ql-size-small {
          font-size: 14px;
        }

        .ql-size-normal {
          font-size: 16px;
        }

        .ql-size-large {
          font-size: 20px;
        }

        .ql-size-huge {
          font-size: 24px;
        }

        .image-upload-wrapper {
          position: relative;
          display: inline-block;
        }
      `}</style>
      <ReactQuill
        ref={reactQuillRef}
        theme="snow"
        style={{ minHeight: 400, maxHeight: 800, height: "100%" }}
        modules={modules}
        value={text}
        onChange={(e: any) => setText(e)}
      />
    </div>
  );
}
