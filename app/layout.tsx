import './globals.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import AppShell from '../components/app-shell';
export const metadata={title:'DATOVA | World Data Intelligence',description:'Public global data, transparent sources and intelligence for Thailand.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="th"><body><AppShell>{children}</AppShell></body></html>}