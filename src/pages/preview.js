import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const PreviewPage = ({ location }) => {
  // Parse query param
  const params = new URLSearchParams(location.search);
  const file = params.get("file");
  const fileName = file ? file.split('/').pop() : "Unknown File";

  // If no file, standard 404-ish message or redirect
  if (!file) {
      return (
          <Layout location={location} title="Preview">
              <div style={{padding: 20}}>No file specified.</div>
          </Layout>
      )
  }

  // Handle image source path: if it starts with /, use as is, otherwise prepend /
  const imgSrc = file.startsWith('/') ? file : `/${file}`;

  return (
    <Layout location={location} title="Preview" currentFileName={fileName}>
      <Seo title={`Preview - ${fileName}`} />
      <div style={{
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100%', 
          padding: '20px',
          backgroundColor: 'var(--vscode-bg)'
      }}>
        <img 
            src={imgSrc} 
            alt={fileName}
            style={{
                maxWidth: '100%', 
                maxHeight: '80vh', 
                objectFit: 'contain',
                border: '1px solid var(--vscode-border)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }} 
        />
      </div>
    </Layout>
  )
}

export default PreviewPage

export const Head = ({ location }) => {
    const params = new URLSearchParams(location.search);
    const file = params.get("file");
    const fileName = file ? file.split('/').pop() : "Preview";
    return <Seo title={fileName} />
}
