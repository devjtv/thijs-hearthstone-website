import { Tooltip } from "react-tippy";
import { IconBrandTwitch, IconBrandTwitter, IconBrandTwitterFilled, IconBrandX, IconBrandXFilled, IconBrandYoutube, IconBrandYoutubeFilled } from "@tabler/icons-react";

export default function Footer() {
    return (
        <footer className="flex absolute bottom-0 w-full justify-between items-center py-4 px-8 border-b-highlight border-b-[48px] mt-24 bg-backgroundLight">
            <div className="container mx-auto">
                <div className="flex h-full gap-6 justify-between items-center">
                    <div className="flex gap-4 items-center">
                        <img src="/images/thijs-portrait.png" alt="Logo" className="w-12 h-12 rounded-full" />
                        <p className="text-3xl">THIJS<span className="text-highlight">HS</span></p>
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                        <a href="https://twitter.com/G2Thijs" target="_blank">
                            <Tooltip title="X (Formally Twitter)">
                                <IconBrandX className="hover:text-highlight transition-all duration-300" size={28} strokeWidth={1} />
                            </Tooltip>
                        </a>

                        <a href="https://www.youtube.com/channel/UC9GenoUeEqbMrWMysALYR1Q" target="_blank">
                            <Tooltip title="YouTube">
                                <IconBrandYoutube className="hover:text-highlight transition-all duration-300" size={28} strokeWidth={1} />
                            </Tooltip>
                        </a>

                        <a href="https://www.twitch.tv/thijs" target="_blank">
                            <Tooltip title="Twitch">
                                <IconBrandTwitch className="hover:text-highlight transition-all duration-300" size={28} strokeWidth={1} />
                            </Tooltip>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}