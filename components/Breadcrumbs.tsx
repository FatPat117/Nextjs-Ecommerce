import { Home } from "lucide-react";
import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb";
interface BreadcrumbsProps {
        items: {
                label: string;
                href: string;
                active?: boolean;
        }[];
}
const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
        return (
                <Breadcrumb className="mb-5">
                        <BreadcrumbList>
                                <BreadcrumbItem>
                                        <BreadcrumbLink href="/" className="flex items-center gap-2">
                                                <Home className="h-4 w-4" />
                                        </BreadcrumbLink>
                                </BreadcrumbItem>

                                {items.map((item, idx) => (
                                        <React.Fragment key={idx}>
                                                <BreadcrumbSeparator />
                                                <BreadcrumbItem>
                                                        <BreadcrumbLink
                                                                href={item.href}
                                                                className={`${item.active ? "text-primary" : ""}`}
                                                                aria-current={item.active ? "page" : undefined}
                                                        >
                                                                {item.label}
                                                        </BreadcrumbLink>
                                                </BreadcrumbItem>
                                        </React.Fragment>
                                ))}
                        </BreadcrumbList>
                </Breadcrumb>
        );
};

export default Breadcrumbs;
