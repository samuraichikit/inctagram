declare module 'react-timeago/lib/formatters/buildFormatter' {
    const buildFormatter: (strings: Record<string, string>) => import('react-timeago').Formatter;
    export default buildFormatter;
}
  
declare module 'react-timeago/lib/language-strings/en' {
    const enStrings: Record<string, string> 
    export default enStrings;
}
  
declare module 'react-timeago/lib/language-strings/ru' {
    const ruStrings: Record<string, string>
    export default ruStrings;
}
  