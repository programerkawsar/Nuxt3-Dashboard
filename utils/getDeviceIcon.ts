export default (type: string): string => {
  switch (type) {
    case 'mobile':
      return 'smartphone'
    case 'computer':
      return 'laptop'
    case 'tablet':
      return 'tablet'
    default:
      return 'smartphone'
  }
}
