import StaffTopBar from "@/component/StaffTopBar";

export default function RootLayout({children} : {children:React.ReactNode}) {
    return (
        <div >
            <StaffTopBar/>
            {children}
        </div>
    );
}