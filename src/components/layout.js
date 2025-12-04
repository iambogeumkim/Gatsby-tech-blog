import * as React from "react"
import { Link } from "gatsby"
import ThemeToggle from "./theme/theme-toggle"
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";

deckDeckGoHighlightElement();

const BlogHeaderTyping = () => {
  // 타이핑 애니메이션 구현
  const ref = React.useRef();
  React.useEffect(() => {
    const title = "Gold Vibes Only";
    let i = 0;
    const timer = setInterval(() => {
      if (ref.current) {
        ref.current.textContent = title.substring(0, i);
        i++;
        if (i > title.length) clearInterval(timer);
      }
    }, 110);
    return () => clearInterval(timer);
  }, []);
  return (
    <span className="search-header-title typing-animate">
      <Link to="/" style={{ textDecoration: "none", color: "#2563FF" }}>
        <span ref={ref}></span>
      </Link>
    </span>
  );
};

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  // 헤더 로고 영역 (타이핑 애니메이션 컴포넌트로 대체)
  const headerLogo = <BlogHeaderTyping />

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="blog-header-as-search">
        <div className="search-header-bar">
          {/* 중앙: 타이핑 타이틀 (이전 headerLogo 자리에) */}
          {headerLogo}

          {/* 우측: 소셜 아이콘 및 다크모드 토글 */}
          <div className="search-header-socials">
            <a
              href="https://github.com/iambogeumkim"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link icon-square-btn"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" className="social-icon github" aria-hidden="true">
                <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/po6eumkim"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link icon-square-btn"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" className="social-icon linkedin" aria-hidden="true">
                <path fill="currentColor" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="global-main">{children}</main>

      <footer className="blog-footer">
        <div className="footer-main">
          <span className="footer-title">Gold Vibes Only</span>
        </div>
        <div className="footer-links-row">
          © 2025 Bogeum Kim All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Layout