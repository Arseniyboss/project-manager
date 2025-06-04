export const MOBILE_SIDEBAR_BREAKPOINT = 768

export const isMobileViewport = () => {
  return window.innerWidth <= MOBILE_SIDEBAR_BREAKPOINT
}

export const parseDueDate = (dueDate: string) => {
  const [day, month, year] = dueDate.split('.')
  return new Date(`${year}-${month}-${day}`)
}

export const formatDueDate = (dueDate: Date) => {
  return dueDate.toLocaleDateString('ru-RU')
}
