import { CodeBlock, nord } from "react-code-blocks";

export function P(props) {
  const { children, className } = props;
  return <p className={className + " mb-2"}>{children}</p>;
}

export function H1(props) {
  const { children, className } = props;
  return (
    <h1 className={className + " mt-10 text-4xl font-black"}>{children}</h1>
  );
}

export function H2({ children }) {
  return <h2 className="mt-6 text-3xl font-bold">{children}</h2>;
}

export function H3({ children }) {
  return <h3 className="mt-3 text-xl font-semibold text">{children}</h3>;
}

export function Table(props) {
  /**
   * todo: better fix
   * dirty fix for the missing css in global style
   **/
  return (
    <div className="pb-5 ui-border">
      <table className="w-full table-module">{props.children}</table>
    </div>
  );
}

export function TheCodeBlock(props) {
  const language = props?.className?.split("-")[1] || "";
  const isMultiline =
    props.children.split("\n").filter((line) => line !== "").length > 1;

  return (
    <div className="ui-border ui-code">
      <CodeBlock
        text={props.children}
        language={language}
        theme={nord}
        codeBlock
      />
    </div>
  );
}

export function MdLink(props) {
  const { children, href } = props;
  return (
    <a className="text-blue-500" href={href}>
      {children}
    </a>
  );
}

export function MdLi(props) {
  const { children } = props;
  return <li className="ml-6 list-disc list-outside list-item">{children}</li>;
}
