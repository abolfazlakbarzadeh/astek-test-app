import {Spinner} from "@/components/ui/spinner.tsx";

export const LoadingOverlay = () => {
    return (
        <div className="absolute z-40 w-full h-full inset-0 flex items-center justify-center bg-white/[.8]">
            <Spinner size="lg" className="bg-black" />
        </div>
    );
};
