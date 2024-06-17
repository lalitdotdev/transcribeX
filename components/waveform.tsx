import { Loader2, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import WaveSurfer from "wavesurfer.js";
import clsx from "clsx";

type Props = {
    file: File;
};

type TrackMetadata = {
    duration: number;
    name: string;
    size: number;
};

const Waveform = ({ file }: Props) => {
    const waveform = useRef<HTMLDivElement | null>(null); // ref to the waveform container
    const track = useRef<WaveSurfer | null>(null); // ref to the wavesurfer instance
    const [mounted, setMounted] = useState(false); // state to check if the waveform is mounted
    const [metadata, setMetadata] = useState<TrackMetadata>({ // state to store the metadata of the track
        duration: 0,
        name: "",
        size: 0,
    });

    const [currentTime, setCurrentTime] = useState(0); // state to store the current time of the track
    const [play, setPlay] = useState(false); // state to store the play/pause state of the track

    useEffect(() => { // effect to create the wavesurfer instance and load the file into it when the file changes and destroy the instance when the component unmounts or the file changes
        if (waveform.current) {
            track.current = WaveSurfer.create({
                container: waveform.current,
                waveColor: "rgb(74,222,128)",
                progressColor: "#f3f4f6",
                url: URL.createObjectURL(file),
                barGap: 1,
                barWidth: 3,
                barRadius: 3,
                cursorColor: "rgb(72,85,99)",
                cursorWidth: 3,
            });
            track.current.on("ready", () => {
                setMounted(true);
                setMetadata((metadata) => {
                    metadata.duration = track.current?.getDuration() || 0;
                    metadata.name = file.name;
                    metadata.size = file.size;
                    return metadata;
                });
            });

            track.current.on("finish", () => {
                setPlay(false);
            });

            // cleanup function to destroy the wavesurfer instance when the component unmounts or the file changes
            return () => {
                if (track.current) {
                    track.current.destroy();
                    setMounted(false);
                }
            };
        }
    }, [file]);



    return (
        <>
            <div className="flex justify-center h-48">
                <div
                    className={clsx(
                        "h-36 bg-gray-100 flex items-center justify-center w-full rounded-lg",
                        !mounted ? "block" : "hidden"
                    )}
                >
                    <div className="animate-spin items-center m-auto">
                        <Loader2 opacity={0.5} size={30} />
                    </div>
                </div>
                <div
                    className={clsx(
                        "flex flex-col w-full gap-2 text-gray-600",
                        mounted ? "block" : "hidden"
                    )}
                >
                    <div className="flex justify-between font-mono tracking-tight text-sm text-opacity-70 w-full gap-24">
                        <div className="text-ellipsis overflow-hidden w-fit whitespace-nowrap">
                            {file.name}
                        </div>
                        <div className="whitespace-nowrap w-fit">
                            {(metadata.size / 1000).toFixed(2)} kb
                        </div>
                    </div>
                    <div className="w-full" ref={waveform} id="waveform"></div>
                    <div className="flex justify-between font-mono tracking-tight text-sm text-opacity-70 items-center">
                        <div>{currentTime.toFixed(2)}s</div>
                        <button
                            onClick={() => {
                                track.current?.playPause(), setPlay(!play);
                            }}
                        >
                            {play ? (
                                <Pause fill="black" size={15} />
                            ) : (
                                <Play fill="black" size={15} />
                            )}
                        </button>
                        <div className="tabular-nums w-2/5 text-right">
                            {metadata.duration.toFixed(2)}s
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Waveform;
