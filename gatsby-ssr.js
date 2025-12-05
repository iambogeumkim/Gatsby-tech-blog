/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

const React = require("react")

// 다크모드 초기화 스크립트 - 페이지 로드 시 깜빡임 방지
const DarkModeScript = () => {
  const codeToRunOnClient = `
    (function() {
      const saved = localStorage.getItem("darkMode");
      if (saved === "true") {
        document.body.classList.add("dark-mode");
      }
    })();
  `
  return React.createElement("script", {
    dangerouslySetInnerHTML: { __html: codeToRunOnClient },
  })
}

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
exports.onRenderBody = ({ setHtmlAttributes, setPreBodyComponents }) => {
  setHtmlAttributes({ lang: `ko` })
  setPreBodyComponents([React.createElement(DarkModeScript, { key: "dark-mode-script" })])
}
