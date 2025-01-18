import { appCacheDir } from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/core";
import { BaseDirectory, readDir, readFile, writeFile} from "@tauri-apps/plugin-fs";
import JSZip from "jszip";
import { coverData } from "../types";

//spent way too long on this function
export default async function fetchBooks(){
    let libraryInfoArray:coverData[]=[];
    try {
      const allFiles = await readDir("Books", { baseDir: BaseDirectory.Home });
      const onlyEpubFiles = allFiles.filter((entry) => entry.name?.endsWith(".epub"));

      for(const book of onlyEpubFiles){
        console.log("Current Book: ",book.name);
        const bookData = await readFile(`Books/${book.name}`, {baseDir:  BaseDirectory.Home});
        const zip = await JSZip.loadAsync(bookData);
        const containerXml = await zip.file("META-INF/container.xml")?.async("text");
        if (!containerXml) throw new Error("container.xml not found in EPUB. Fix your epub mate.");

        const parser = new DOMParser();
        const containerDoc = parser.parseFromString(containerXml, "application/xml");

        const opfPath = containerDoc
        .querySelector("rootfile")
        ?.getAttribute("full-path");
        if (!opfPath) throw new Error("OPF file path not found. Fix your epub mate.");

        const opfXml = await zip.file(opfPath)?.async("text");
        if (!opfXml) throw new Error("OPF file not found in EPUB. What???? but there is a path?????");

        const opfDoc = parser.parseFromString(opfXml, "application/xml");
        const title = opfDoc.querySelector("metadata > title")?.textContent || "Untitled";
        const author = opfDoc.querySelector("metadata > creator")?.textContent || "Unknown";
        const manifest = Array.from(opfDoc.querySelectorAll("manifest > item"));
        const coverItem = manifest.find((item) =>
          item.getAttribute("properties")?.includes("cover")
        );

        console.log("title: ",title," author: ",author," coverItem::::: ", coverItem);
        

        let coverUrl:string | undefined= undefined;
        if (coverItem) {
          const coverHref = coverItem.getAttribute("href");
          console.log("coverHref: ",coverHref);
          const basePath = opfPath.substring(0, opfPath.lastIndexOf("/") + 1);
          const coverFilePath = basePath + coverHref;

          // Caching the cover into com.fern.app
          const coverBinary = await zip.file(coverFilePath)?.async("uint8array");
          
          if (coverBinary) {
            const coverName = book.name.replace(/\.epub$/i, "") + coverItem.getAttribute("href");
            writeFile(coverName, coverBinary, {
              baseDir: BaseDirectory.AppCache,
            });

            //get the path
            const appCacheDirPath = await appCacheDir();
            console.log("Cache points to: ", appCacheDirPath);
            
            const fullPath = `${appCacheDirPath}/${coverName}`;
            console.log("Cover is being saved at:", fullPath);
            const assetUrl = convertFileSrc(fullPath);
            coverUrl = assetUrl;
          }
        }
        libraryInfoArray.push({title, author, coverUrl});

      }

    } catch (error) {
      console.error("Failed to fetch:", error);
    }
    return libraryInfoArray;
}
 
