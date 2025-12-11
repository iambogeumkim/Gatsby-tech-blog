/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

const React = require("react")
// Since gatsby-ssr runs in Node, we might need to handle the import differently if it wasn't transpiled,
// but usually Gatsby handles ES6 imports in gatsby-ssr.js if the project is set up for it.
// However, the existing file uses `const React = require("react")` style.
// Let's stick to CommonJS or verify if I can mix. 
// Safest is to require the compiled file or just use standard import if Gatsby handles it.
// Most Gatsby v2+ projects support ES6 in gatsby-ssr.js.
// Let's try imports. If it fails, I'll revert to require.
// Actually, I need to point to the file.
// Let's check how SidebarContext is exported. It uses `export const ...`.
// So I should use `import` or `require(...).SidebarProvider`.

import { SidebarProvider } from "./src/context/SidebarContext"

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
export const onRenderBody = ({ setHtmlAttributes, setPreBodyComponents, setHeadComponents }) => {
  setHtmlAttributes({ lang: `ko` })
  setPreBodyComponents([React.createElement(DarkModeScript, { key: "dark-mode-script" })])
  
  // Pacifico 폰트 (헤더 타이틀용)
  setHeadComponents([
    React.createElement("link", {
      key: "google-fonts-preconnect",
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    }),
    React.createElement("link", {
      key: "google-fonts-preconnect-static",
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    }),
    React.createElement("link", {
      key: "pacifico-font",
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Pacifico&display=swap",
    }),
  ])
}

export const wrapRootElement = ({ element }) => (
  <SidebarProvider>{element}</SidebarProvider>
)
