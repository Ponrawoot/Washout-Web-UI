import TopBar from '@/component/TopBar';

export default function ReservationLayout({children} : {children:React.ReactNode}) {
    return (
        <div >
            <TopBar/>
            {children}
        </div>
    );
}