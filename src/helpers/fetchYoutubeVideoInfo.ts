import { checkCache, saveCache } from "./cache";
import { gmFetchJson } from "./gmFetchHelpers";
import { log } from "./log";

export interface YoutubePlayableRejection {
  status: string;
  reason: string;
  message: string;
}

export interface YoutubeCaption {
  baseUrl: string;
  name: {
    simpleText: string;
  };
  vssId: string;
  languageCode: string;
  isTranslatable: boolean;
  kind?: string;
}

export interface YoutubeItem {
  id: string;
  title: string;
  lengthSeconds: number;
  viewCount: number;
  playable: boolean;
  channelId: string;
  captions: YoutubeCaption[];
  rejection?: YoutubePlayableRejection;
}

export async function fetchYoutubeVideoInfo(
  youtubeId: string
): Promise<YoutubeItem> {
  const key = `youtube_item_${youtubeId}`;
  const cached = checkCache(key, 1000 * 60 * 60 * 24 * 7); // 1 week
  if (cached !== undefined && cached.id === youtubeId) {
    return cached;
  }

  const res = await gmFetchJson(
    {
      method: "POST",
      url: "https://youtubei.googleapis.com/youtubei/v1/player",
    },
    {
      context: {
        client: {
          clientName: "WEB",
          clientScreen: "EMBED",
          clientVersion: "2.20210721.00.00",
        },
      },
      videoId: youtubeId,
    }
  );

  if (
    !res.videoDetails ||
    res.videoDetails.videoId !== youtubeId ||
    !res.playabilityStatus
  ) {
    log("youtube res", res);
    throw new Error("Invalid response from YouTube");
  }

  const item: YoutubeItem = {
    id: youtubeId,
    title: res.videoDetails.title,
    lengthSeconds: parseInt(res.videoDetails.lengthSeconds),
    viewCount: parseInt(res.videoDetails.viewCount),
    playable: res.playabilityStatus.status === "OK",
    channelId: res.videoDetails.channelId,
    captions:
      res.captions?.playerCaptionsTracklistRenderer?.captionTracks || [],
    rejection:
      res.playabilityStatus.status !== "OK"
        ? {
            status: res.playabilityStatus.status,
            reason: res.playabilityStatus.reason,
            message:
              res.playabilityStatus.errorScreen?.playerErrorMessageRenderer
                ?.subreason?.runs[0]?.text || "",
          }
        : undefined,
  };

  saveCache(key, item);
  return item;
}
