"use client";

import { useEffect, useState } from "react";

import DataViewer from "@/components/data-viewer";
import Loading from "./loading";
import ReqFail from "./requestFail";
import ReqProgress from "./requestProgress";
import ShareUrl from "@/components/share-url";

export default function Page({ params }: { params: { call_id: string } }) {
    const [data, setData] = useState<any | undefined>();
    const [status, setStatus] = useState<number>();

    if (data) {
        return (
            <>
                <div className="container flex flex-col items-center gap-8 max-w-3xl">
                    <DataViewer data={data} />
                    <div className="flex items-center text-lg gap-4 w-full">
                        <div className="opacity-70 font-mono text-base font-medium">
                            Share
                        </div>
                        <ShareUrl
                            host={
                                window.location.protocol +
                                "//" +
                                window.location.host +
                                "/tryit"
                            }
                            call_id={params.call_id}
                        />
                    </div>

                </div>
            </>
        );
    }
}
