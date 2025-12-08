import React, { useEffect, useRef } from "react"

const Giscus = () => {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return

    const isDark = document.body.classList.contains("dark-mode")
    const initialTheme = isDark ? "dark" : "light"

    const script = document.createElement("script")
    script.src = "https://giscus.app/client.js"
    script.async = true
    script.crossOrigin = "anonymous"

    script.setAttribute("data-repo", "iambogeumkim/Gatsby-tech-blog")
    script.setAttribute("data-repo-id", "R_kgDOOsE0Sg")
    script.setAttribute("data-category", "Announcements")
    script.setAttribute("data-category-id", "DIC_kwDOOsE0Ss4CzbwE")
    script.setAttribute("data-mapping", "pathname")
    script.setAttribute("data-strict", "0")
    script.setAttribute("data-reactions-enabled", "1")
    script.setAttribute("data-emit-metadata", "0")
    script.setAttribute("data-input-position", "bottom")
    script.setAttribute("data-theme", initialTheme)
    script.setAttribute("data-lang", "ko")
    script.setAttribute("data-loading", "lazy")

    ref.current.appendChild(script)
  }, [])

  // 다크모드 변경 감지하여 테마 업데이트
  useEffect(() => {
    const handleThemeChange = () => {
      const iframe = document.querySelector("iframe.giscus-frame")
      if (!iframe) return

      const isDark = document.body.classList.contains("dark-mode")
      const theme = isDark ? "dark" : "light"

      iframe.contentWindow.postMessage(
        { giscus: { setConfig: { theme } } },
        "https://giscus.app"
      )
    }

    // MutationObserver로 body 클래스 변경 감지
    const observer = new MutationObserver(handleThemeChange)
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className="giscus-wrapper" />
}

export default Giscus

