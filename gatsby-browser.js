// custom typefaces
import "@fontsource-variable/montserrat"
import "@fontsource/merriweather"
import '@fontsource/permanent-marker';
import '@fontsource/ibm-plex-sans-kr';

// normalize CSS across browsers
import "./src/normalize.css"

// custom CSS styles
import "./src/styles/style.css"
import "./src/styles/global.css"

// Highlighting for code blocks
import "prismjs/themes/prism.css"

import React from "react"
import { SidebarProvider } from "./src/context/SidebarContext"

export const wrapRootElement = ({ element }) => (
  <SidebarProvider>{element}</SidebarProvider>
)
