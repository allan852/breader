import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { addFeedsAction, setFeedsAction, setMenuKeyAction, InterfaceFeedsAction } from '../actions'
import AppMenu from '../components/AppMenu'
import InterfaceFeed from '../schemas/InterfaceFeed'

const mapStateToProps = (store: any, props: any) => {
    return {
        feeds: store.feeds,
        selectedKey: store.menuKey,
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
    addFeeds: (feeds: InterfaceFeed[]) => dispatch(addFeedsAction(feeds)),
    setFeeds: (feeds: InterfaceFeed[]) => dispatch(setFeedsAction(feeds)),
    setMenuKey: (key: string) => dispatch(setMenuKeyAction(key)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppMenu)
