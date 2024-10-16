import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    return (
        <nav className="mt-4 text-center">
            {links.map(link => (
                <Link 
                preserveScroll
                    href={link.url || "#"} 
                    key={link.label}
                    className={
                        "inline-block py-2 px-3 rounded-lg text-xs " +
                        (link.active ? "bg-gray-950 text-gray-200" : "text-gray-500 hover:bg-gray-950") +
                        (link.url ? "" : " cursor-not-allowed")
                    }
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    disabled={!link.url} 
                ></Link>
            ))}
        </nav>
    );
}