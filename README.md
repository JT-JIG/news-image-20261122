# news-image-20261122

[![make.fun · news-image-20261122](https://make.fun/badge/news-image-20261122.svg)](https://make.fun/bounty/news-image-20261122)
[![rank](https://make.fun/badge/news-image-20261122/JT-JIG/news-image-20261122/rank.svg)](https://make.fun/bounty/news-image-20261122/leaderboard)
[![reward](https://make.fun/badge/news-image-20261122/JT-JIG/news-image-20261122/reward.svg)](https://make.fun/bounty/news-image-20261122)

One image that sums up Sunday 22 November 2026's world news — the day's eight biggest stories, laid out as a newspaper front page.

## The stories

- COP31 collapses in Antalya with no deal — the first climate summit to end without one since Copenhagen 2009
- Saudi Arabia intercepts a missile aimed at Makkah as Iran strikes a Bahrain industrial site
- A Russian drone strike on the Kyiv region leaves at least 14 people missing
- A factory fire near Jakarta kills 24
- The FBI's National Crime Information Centre is hacked, Trump confirms
- More than 1,000 Delta flights delayed after a Microsoft outage and FAA ground stops
- The US approved nearly 900,000 AI chips for China in six months

## How it runs

`main.ts` checks that `entry.png` is a real PNG or JPEG under 1 MiB and no bigger than 1024×1024, then copies it to the output folder and verifies the copy byte-for-byte:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```
