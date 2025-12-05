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
      <Link to="/" className="header-title-link">
        <span ref={ref}></span>
      </Link>
    </span>
  );
};

// 정적 헤더 (타이핑 효과 없음)
const BlogHeaderStatic = () => {
  return (
    <span className="search-header-title">
      <Link to="/" className="header-title-link">
        Gold Vibes Only
      </Link>
    </span>
  );
};

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  const isAboutPage = location.pathname === "/about/" || location.pathname === "/about"

  // About 페이지면 정적 헤더, 아니면 타이핑 애니메이션
  const headerLogo = isAboutPage ? <BlogHeaderStatic /> : <BlogHeaderTyping />

  return (
    <div className="page-wrapper">
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <header className={`blog-header-as-search ${isAboutPage ? 'header-sticky' : ''}`}>
          <div className="search-header-bar">
            {/* 좌측: 타이틀 */}
            {headerLogo}

            {/* 우측: About 페이지면 X 아이콘 (메인으로), 아니면 돋보기 (About으로) */}
            {isAboutPage ? (
              <Link to="/" className="search-icon-btn close-btn" aria-label="Close">
                <svg viewBox="0 0 24 24" className="search-icon" aria-hidden="true">
                  <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </Link>
            ) : (
              <Link to="/about/" className="search-icon-btn" aria-label="About me">
                <svg viewBox="0 0 24 24" className="search-icon" aria-hidden="true">
                  <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </Link>
            )}
          </div>
        </header>

        <main className="global-main">{children}</main>
      </div>

      {/* About 페이지에서는 footer 숨김 - wrapper 밖에 배치 */}
      {!isAboutPage && (
        <footer className="blog-footer">
          <div className="footer-main">
            <span className="footer-title">Gold Vibes Only</span>
          </div>
          <div className="footer-links-row">
            © 2025 Bogeum Kim All rights reserved.
          </div>
        </footer>
      )}

      {/* 우하단 고정 다크모드 토글 버튼 */}
      <div className="fixed-theme-toggle">
        <ThemeToggle />
      </div>
    </div>
  )
}

export default Layout