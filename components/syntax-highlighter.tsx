"use client"

import { useEffect } from "react"
import Prism from "prismjs"

// Import Prism core and languages
import "prismjs/components/prism-core"
import "prismjs/components/prism-rust"
import "prismjs/components/prism-toml"
import "prismjs/themes/prism-tomorrow.css"

interface SyntaxHighlighterProps {
  code: string
  language: string
}

const SyntaxHighlighter = ({ code, language }: SyntaxHighlighterProps) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [code, language])

  return (
    <pre className={`language-${language}`}>
      <code className={`language-${language}`}>{code}</code>
    </pre>
  )
}

export default SyntaxHighlighter
