import AdminTopBar from '@/component/AdminTopBar';

export default function RootLayout({children} : {children:React.ReactNode}) {
    return (
        <div >
            <AdminTopBar/>
            {children}
        </div>
    );
}