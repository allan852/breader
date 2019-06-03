import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import SearchArticleModal from '../components/SearchArticleModal'
import { asyncFilterArticlesAction, asyncSetAllArticlesReadAction, IAction } from '../redux/actions'

const mapStateToProps = (store: any, props: any) => {
    return {
        articles: store.articles.get('list'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<IAction>, props: any) => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchArticleModal)
