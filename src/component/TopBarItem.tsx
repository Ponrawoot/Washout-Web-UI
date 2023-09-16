import Link from "next/link";
import { IoPeopleOutline,IoStorefrontOutline,IoLayersOutline} from "react-icons/io5";


export default function TopBarItem({ title, pageRef } : { title:string, pageRef:string}) {
    const titleToIconMapping = {
        'Staff': IoPeopleOutline,
        'Branch': IoStorefrontOutline,
        'Machine': IoLayersOutline
      };

    const IconComponent = titleToIconMapping[title] || IoPeopleOutline;

    return (
        
        <Link href={pageRef}>
            <IconComponent size="50px"/>
        </Link>

    );
}