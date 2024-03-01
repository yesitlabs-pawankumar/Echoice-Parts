import React from "react";
import parse from "html-react-parser";

interface HtmlRendererProps {
  htmlContent: string;
}

const HtmlRenderer: React.FC<HtmlRendererProps> = ({ htmlContent }) => {
  return <div>{parse(htmlContent)}</div>;
};

export default HtmlRenderer;
