import ReactMarkdown from "react-markdown";
import RemarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight, atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useRef, useState } from "react";
import cn from "classnames";
import CopyButton from "./copy-button";
import { useGlobalStore } from "@/stores";

const capitalizationLanguageNameMap: Record<string, string> = {
  sql: "SQL",
  javascript: "JavaScript",
  java: "Java",
  typescript: "TypeScript",
  vbscript: "VBScript",
  css: "CSS",
  html: "HTML",
  xml: "XML",
  php: "PHP",
  python: "Python",
  yaml: "Yaml",
  mermaid: "Mermaid",
  markdown: "MarkDown",
  makefile: "MakeFile",
};

const getCorrectCapitalizationLanguageName = (language: string) => {
  if (!language) return "Plain";
  if (language in capitalizationLanguageNameMap) return capitalizationLanguageNameMap[language];

  return language.charAt(0).toUpperCase() + language.substring(1);
};

export function PreCode(props: { children: any }) {
  const ref = useRef<HTMLPreElement>(null);

  return (
    <pre ref={ref}>
      <span
        className="copy-code-button"
        onClick={() => {
          if (ref.current) {
            const code = ref.current.innerText;
            // copyToClipboard(code);
          }
        }}
      ></span>
      {props.children}
    </pre>
  );
}

export function Markdown(props: { content: string; className?: string }) {
  const { isDark } = useGlobalStore();
  const [isSVG, setIsSVG] = useState(false);
  return (
    <div className={cn(props.className, "markdown-body")}>
      <ReactMarkdown
        remarkPlugins={[[remarkMath, { singleDollarTextMath: false }], RemarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match?.[1] ?? "plaintext";
            const languageShowName = getCorrectCapitalizationLanguageName(language || "");
            return !inline ? (
              <div className="group">
                <div className="flex  justify-between h-8 items-center p-1 pl-3">
                  <div className="text-[13px] text-text-2 font-normal">{languageShowName}</div>
                  <div style={{ display: "flex" }}>
                    {/* {language === "mermaid" && (
                      <SVGBtn isSVG={isSVG} setIsSVG={setIsSVG} />
                    )}
                    <CopyBtn
                      className={cn(s.copyBtn, "mr-1")}
                      value={String(children).replace(/\n$/, "")}
                      isPlain
                    /> */}
                    <CopyButton value={String(children).replace(/\n$/, "")} isPlain />
                  </div>
                </div>
                {language === "mermaid" && isSVG ? (
                  // <Flowchart
                  //   PrimitiveCode={String(children).replace(/\n$/, "")}
                  // />
                  <></>
                ) : (
                  <SyntaxHighlighter
                    {...props}
                    style={isDark ? atomOneDark : atomOneLight}
                    customStyle={{
                      paddingLeft: 12,
                      backgroundColor: "var(--semi-color-default)",
                    }}
                    language={language}
                    showLineNumbers
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                )}
              </div>
            ) : (
              <code {...props} className={className}>
                {children}
              </code>
            );
          },
          img({ src, alt, ...props }) {
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={alt}
                width={250}
                height={250}
                className="max-w-full h-auto align-middle border-none rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out mt-2 mb-2"
                {...props}
              />
            );
          },
          p: (paragraph) => {
            const { node }: any = paragraph;
            if (node.children[0].tagName === "img") {
              const image = node.children[0];

              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image.properties.src}
                  width={250}
                  height={250}
                  className="max-w-full h-auto align-middle border-none rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out mt-2 mb-2"
                  alt={image.properties.alt}
                />
              );
            }
            return <p>{paragraph.children}</p>;
          },
          table: (table) => {
            return (
              <div className="overflow-x-auto">
                <table className="whitespace-nowrap">{table.children}</table>
              </div>
            );
          },
        }}
        linkTarget="_blank"
      >
        {/* Markdown detect has problem. */}
        {props.content}
      </ReactMarkdown>
    </div>
  );
}
