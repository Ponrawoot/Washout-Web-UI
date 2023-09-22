import AdminTopBar from '@/component/AdminTopBar';

export default function ReservationLayout({children} : {children:React.ReactNode}) {
    return (
        <div >
            <AdminTopBar/>
            {children}
        </div>
    );
}