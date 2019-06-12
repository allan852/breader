import IFeed from '../schemas/IFeed'
import FeedParser from './feedparser'
import DB from './sqlite3'

const Logic = {
    createFeed: async (feedUrl: string) => {
        try {
            const isExists: any = await DB.isFeedExists(feedUrl, true)
            if (isExists && !isExists.deleted_at) {
                return 'EXISTS'
            }
            const feedNarticles = await FeedParser.parseFeed(feedUrl, '')
            if (!feedNarticles) {
                return
            }
            const feed = (feedNarticles as any).feed
            const articles = (feedNarticles as any).articles
            let feedId: any = 0
            let lastDateTime = 0
            if (isExists) {
                const date = new Date(isExists.date_time)
                lastDateTime = ~~(date.getTime() / 1000)
                feedId = isExists.id
                feed.deleted_at = null
                await DB.updateFeed(feedId, feed)
            } else {
                feedId = await DB.createFeed(feed)
            }
            // const faviconUrl = feed.favicon || FeedParser.makeFaviconUrl(feed.link)
            // Logic.saveFeedFavicon(feedId as number, faviconUrl)
            if (articles.length > 0) {
                DB.saveArticles(articles, feedId, lastDateTime)
            }

            feed.id = feedId
            return feed
        } catch (err) {
            console.error(err)
        }
    },
    deleteFeeds: async (feedIds: number[]) => {
        if (feedIds.length === 0) {
            return 0
        }
        try {
            const changes = await DB.deleteFeeds(feedIds)
            return changes
        } catch (err) {
            console.error(err)
        }
    },
    getAllFeeds: async () => {
        try {
            const feeds = await DB.getAllFeeds()
            return feeds
        } catch (err) {
            console.error(err)
        }
    },
    getArticleContent: async (articleId: number) => {
        try {
            const articleContent = await DB.getArticleContent(articleId)
            return articleContent
        } catch (err) {
            console.error(err)
        }
    },
    getArticles: async (query: any, offset: number = 0, limit: number = 9999) => {
        try {
            const articles = await DB.getArticles(query, offset, limit)
            return articles
        } catch (err) {
            console.error(err)
        }
    },
    saveFeedFavicon: async (feedId: number, faviconUrl: string) => {
        try {
            const faviconData = await FeedParser.fetchFavicon(faviconUrl)
            // await DB.setFeedFavicon(feedId as number, 'data:image/x-icon;base64,' + faviconData)
            await DB.setFeedFavicon(feedId, 'data:image/gif;base64,' + faviconData)
        } catch (err) {
            console.error(err)
        }
    },
    setAllAriclesIsRead: async () => {
        try {
            const changes = await DB.setAllAriclesIsRead()
            return changes
        } catch (err) {
            console.error(err)
        }
    },
    setArticleIsRead: async (articleId: number) => {
        try {
            const changes = await DB.setArticleIsRead(articleId)
            return changes
        } catch (err) {
            console.error(err)
        }
    },
    setArticleIsStarred: async (articleId: number, isStarred: boolean) => {
        try {
            const changes = await DB.setArticleIsStarred(articleId, isStarred)
            return changes
        } catch (err) {
            console.error(err)
        }
    },
    updateFeedArticles: async (feed: IFeed) => {
        try {
            const feedNarticles: any = await FeedParser.parseFeed(feed.url, feed.etag || '')
            if (!feedNarticles) {
                return
            }
            if (feed.id && feedNarticles.feed && feedNarticles.articles) {
                DB.updateFeed(feed.id, feedNarticles.feed)
                const lastDateTime = ~~((new Date(feed.date_time || 0)).getTime() / 1000)
                const articles = (feedNarticles as any).articles
                const changes = DB.saveArticles(articles, feed.id, lastDateTime)
                return changes
            }
        } catch (err) {
            console.error(err)
        }
    },
}

export default Logic
