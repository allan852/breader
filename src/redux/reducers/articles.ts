import Immutable, { List } from 'immutable'
import InterfaceArticle from '../../schemas/InterfaceArticle'
import { ArticlesActionTypes, IAction } from '../actions'

export interface IArticlesState {
    allReadAt: number
    filter: string
    list: Immutable.List<InterfaceArticle>
    selectedContent: string,
    selectedId: number,
    selectedIndex: number,
}

const initialArticlesState = Immutable.Record<IArticlesState>({
    allReadAt: 0,
    filter: 'ALL',
    list: Immutable.List<InterfaceArticle>([]),
    selectedContent: '',
    selectedId: 0,
    selectedIndex: -1,
})()

let lastDateStr = ''
const articles = (state = initialArticlesState, action: IAction) => {
    switch (action.type) {
        case ArticlesActionTypes.SET_ALL_ARTICLES_READ_AT:
            return state.set('allReadAt', action.payload.allReadAt)
        case ArticlesActionTypes.SET_SELECTED_ARTICLE:
            return state.set('selectedId', action.payload.articleId).set('selectedIndex', action.payload.articleIndex)
        case ArticlesActionTypes.SET_ARTICLES_FILTER:
            return state.set('filter', action.payload.filter)
        case ArticlesActionTypes.SET_SELECTED_ARTICLE_CONTENT:
            return state.set('selectedContent', action.payload.articleContent)
        case ArticlesActionTypes.SET_ARTICLES:
            lastDateStr = ''
            action.payload.articles.forEach((article: InterfaceArticle) => {
                if (lastDateStr !== article.date) {
                    lastDateStr = article.date
                    article.is_dayfirst = true
                }
            })
            return state.set('list', List<InterfaceArticle>(action.payload.articles))
                .set('selectedId', 0)
                .set('selectedIndex', -1)
                .set('selectedContent', '')
        default:
            return state
    }
}

export default articles
