[![DeepScan grade](https://deepscan.io/api/teams/5752/projects/7618/branches/80372/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5752&pid=7618&bid=80372)
[![Dependency Status](https://david-dm.org/promise/ytdl-discord-bot.svg)](https://david-dm.org/promise/ytdl-discord-bot)
[![GitHub Issues](https://img.shields.io/github/issues-raw/promise/ytdl-discord-bot.svg)](https://github.com/promise/ytdl-discord-bot/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr-raw/promise/ytdl-discord-bot.svg)](https://github.com/promise/ytdl-discord-bot/pulls)
[![License](https://img.shields.io/github/license/promise/ytdl-discord-bot.svg)](https://github.com/promise/ytdl-discord-bot/blob/master/LICENSE)
[![Discord Support Server](https://img.shields.io/discord/484464227067887645.svg)](https://discord.gg/V3vSCs7)

# ytdl-discord-bot

An example of how you can implement [ytdl-core](https://github.com/fent/node-ytdl-core) into Discord using [discord.js](https://github.com/discordjs/discord.js). [Screenshots](https://imgur.com/a/RUOAuVj)

## Commands

Without changing anything, you have access to the following commands:

- `play <url, playlist or search>`
- `queue`, `np`, `volume [new volume]`
- `skip`, `stop`, `pause`, `resume`
- `ping`

The default prefix is `Y!`

## How to host yourself

You need to have:
- Node - confirmed working on v10.16.3
- npm - comes with Node, doesn't really matter what version iirc
- A Discord Bot token, and having the bot in your server

One-time setup:
- Rename `config.example.json` to `config.json`, and fill in new values.
- Do `npm i`, wait for it to finish

Start the bot with `node app.js`.

### npm i -g windows-build-tools

Some packages in the code use the npm-package windows-build-tools. For this to be properly installed, you will have to open an administrative command prompt- or powershell-window and type `npm i -g windows-build-tools` and wait a good while until it finishes. If you are new to Node, just know this package is used in more than this code and you should install it regardless.

## Suggestions, bugs, feature requests

Want to contribute? Great, we love that! Please take your time on [opening a new issue](https://github.com/promise/ytdl-discord-bot/issues/new).

## Contributrs

You can see all contributors and their GitHub-profiles [here](https://github.com/promise/ytdl-discord-bot/graphs/contributors).

## License

We use the MIT-license.

> A short, permissive software license. Basically, you can do whatever you want as long as you include the original copyright and license notice in any copy of the software/source.  There are many variations of this license in use.

Fetched from [TLDRLegal](https://tldrlegal.com/license/mit-license), please also read the [license](https://github.com/promise/ytdl-discord-bot/blob/master/LICENSE) if you plan on using the source code. This is only a short summary. Please also take note of that we are not forced to help you, but you can get help in the [support server](https://discord.gg/V3vSCs7) regardless.