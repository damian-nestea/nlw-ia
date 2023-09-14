import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) =>
  new Promise((resolve, refect) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoId
    console.log("Downloading video " + videoId)

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000

        if (seconds > 60) {
          throw new Error("A duração desse vídeo é maior do que 1 minuto!")
        }
      })
      .on("end", () => {
        console.log("Download complete!")
        resolve()
      })
      .on("error", () => {
        console.log(
          "Não foi possível fazer o download. Detalhes do erro:" + error
        )
        reject(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
