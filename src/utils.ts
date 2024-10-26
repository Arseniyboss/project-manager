export const MOBILE_SIDEBAR_BREAKPOINT = 768

export const isMobileViewport = () => {
  return window.innerWidth <= MOBILE_SIDEBAR_BREAKPOINT
}
