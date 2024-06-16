"use client";

import { Check, Copy, Download } from "lucide-react";
import { FC, memo } from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
// import { Monakai } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";

interface Props {
    language: string;
    value: string;
    fileName: string;
}

interface languageMap {
    [key: string]: string | undefined;
}

export const programmingLanguages: languageMap = {
    python: ".py",
};

const CodeBlock: FC<Props> = memo(({ language, value, fileName }) => {
    const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

    const downloadAsFile = () => {
        if (typeof window === "undefined") {
            return;
        }

        const blob = new Blob([value], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = fileName;
        link.href = url;
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const onCopy = () => {
        if (isCopied) return;
        copyToClipboard(value);
    };

    return (
        <div className="codeblock relative w-full dark:bg-gray-800 font-sans shadow-md rounded-lg dark:text-white">
            <div className="flex w-full items-center justify-between pr-4 dark:dark:bg-gray-800 dark:text-white bg-gray-100 rounded-t-lg">
                <div className="lowercase h-full dark:bg-gray-800  flex items-center text-sm p-2 justify-between border-t px-3 gap-2.5 border-t-blue-500">
                    <div className="gap-1 flex">{fileName} </div>
                </div>{" "}
                <span className="rounded-full bg-gray-700 dark:bg-gray-800  h-2 w-2 mt-[.15rem]"></span>
                <div className="flex items-center gap-1">
                    <button onClick={downloadAsFile}>
                        <Download height={15} />
                        <span className="sr-only">Download</span>
                    </button>
                    <button onClick={onCopy}>
                        {isCopied ? <Check height={15} /> : <Copy height={15} />}
                        <span className="sr-only">Copy Code</span>
                    </button>
                </div>
            </div>
            <SyntaxHighlighter
                language={language}
                style={dracula}
                PreTag={"div"}
                customStyle={{
                    margin: 0,
                    width: "100%",
                    // background: 'var(--code-bg)',
                    // color: 'var(--code-color)',
                    lineHeight: "1.2",


                }}
                codeTagProps={{
                    style: {
                        lineHeight: "inherit",
                        fontSize: "0.85rem",
                        fontFamily: "var(--font-mono)",

                    },
                }}
            >
                {value}
            </SyntaxHighlighter>
        </div >
    );
});

CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
