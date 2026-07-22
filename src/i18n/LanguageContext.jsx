import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import translations from '../i18n/translations'

const LanguageContext = createContext()

function getLangFromURL() {
  const path = window.location.pathname
  if (path.startsWith('/ar')) return 'ar'
  return 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getLangFromURL)

  const toggle = useCallback(() => {
    setLang(prev => {
      const next = prev === 'en' ? 'ar' : 'en'
      const path = window.location.pathname
      if (next === 'ar') {
        if (!path.startsWith('/ar')) {
          window.history.pushState({}, '', '/ar' + path)
        }
      } else {
        if (path.startsWith('/ar')) {
          window.history.pushState({}, '', path.replace('/ar', '') || '/')
        }
      }
      return next
    })
  }, [])

  useEffect(() => {
    const handlePop = () => {
      setLang(getLangFromURL())
    }
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [])

  const t = translations[lang]

  useEffect(() => {
    document.documentElement.setAttribute('dir', t.dir)
    document.documentElement.setAttribute('lang', lang)
  }, [lang, t.dir])

  return (
    <LanguageContext.Provider value={{ lang, t, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
