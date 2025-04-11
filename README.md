# youtube-music-ts-lib

- This YOUTUBE API is designed for YouTube Music (distinct from YouTube's music videos), providing proper type definitions for seamless integration into your development tools.
- This library is a modified version of some scraping from the existing library, [youtube-music-apis](https://github.com/iamamritpalrandhawa/youtube-music-apis).


## What Features Changed?

- Fixed for the phenomenon where listMusicFromAlbum no longer returns videoId.
- Also adjusted the position of videoId and adjusted and modified the code and some return codes of parser.ts accordingly.

## How to use it?

- Before using this feature, You need to take your own scraper api key, you can get api key from [here](https://www.scraperapi.com/), you can get free key, it can be 1000 queries per month.

``` javascript
   const listOfMusicsFromAlbum = await listMusicFromAlbum('/*albumId what you want to parse*/', '/*api key from scraper api*/');
   const listOfMusicsFromPlaylist = await listMusicFromPlaylist('/*playlist id what you want to parse*/', '/*api key from scraper api*/');

```
