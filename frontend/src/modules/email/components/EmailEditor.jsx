import React from "react";

const replaceVariables = (content = "", values = {}) => {
  return content.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_, variable) => {
    const key = variable.trim();

    return values[key] !== undefined && values[key] !== ""
      ? values[key]
      : `{{${key}}}`;
  });
};

const EmailEditor = ({
  htmlContent = "",
  cssContent = "",
  variableValues = {},
}) => {
  const renderedHtml = replaceVariables(htmlContent, variableValues);

  const documentContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body {
            margin: 0;
            padding: 24px;
            background: #f5f5f4;
            font-family: Arial, sans-serif;
          }

          ${cssContent || ""}
        </style>
      </head>

      <body>
        ${renderedHtml}
      </body>
    </html>
  `;

  return (
    <iframe
      title="Email content"
      srcDoc={documentContent}
      className="h-full min-h-[420px] w-full rounded-xl border border-stone-800 bg-white"
      sandbox="allow-same-origin"
    />
  );
};

export default EmailEditor;