import StaffTopBar from "@/component/StaffTopBar";

export default function ReservationLayout({children} : {children:React.ReactNode}) {
    return (
        <div >
            <StaffTopBar/>
            {children}
        </div>
    );
}