import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

type Props = {
    label: string;
    btnClass?: string;
    btnVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    onClick?: () => void;
}

export default function LoadingButton({label, btnClass, btnVariant, onClick}: Props) {
  return (
    <Button type="button" onClick={onClick} variant={btnVariant} className={cn(btnClass, "flex justify-center items-center gap-4")} disabled>
        <Loader2 size={20} className={"my-10 animate-spin"} />
        <span>
            {label}
        </span>
    </Button>
  )
}
