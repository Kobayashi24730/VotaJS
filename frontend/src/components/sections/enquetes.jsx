import { Button } from "@/components/ui/button";

export function Enquetes(){
    return(
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4 p-4">
                <h2>Enquetes</h2>
            </div>

            <div>
                <Button>Criar Enquete</Button>
            </div>
        </div>
    );
}