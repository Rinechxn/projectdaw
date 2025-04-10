// main/root.tsx
import TransportPanel from "../components/transport";
import FileBrowser from "../components/filebrowser";
import TrackLayout from "@app/components/track/layout";

function RootPage() {
    return (
        <div className="fixed inset-0 flex flex-col text-white bg-[#181818]">
            {/* @ts-expect-error */}
            <TransportPanel className="flex-shrink-0" /> {/* Add flex-shrink-0 to prevent shrinking */}
            <div className="flex flex-1 min-h-0"> {/* min-h-0 is important for nested flex containers */}
                {/* @ts-expect-error */}
                <FileBrowser className="flex-shrink-0" /> {/* Prevent FileBrowser from shrinking */}
                <main className="flex-1 overflow-auto">
                    <TrackLayout />
                </main>
            </div>
        </div>
    );
}

export default RootPage;