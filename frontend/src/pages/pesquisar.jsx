import { SearchEnquetes } from "@/components/sections/searchEnquetes";

export function Pesquisar() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
            <SearchEnquetes />
        </div>
    );
}