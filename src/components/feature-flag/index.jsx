import { useContext } from "react"
import Accordion from "../accordion"
import LoadMoreData from "../load-more-data"
import RandomColor from "../random-colour"
import StarRating from "../star-rating"
import { FeatureFlagsContext } from "./context"
import "./styles.css";


export default function FeatureFlags() {

    const {loading, enabledFlags} = useContext(FeatureFlagsContext)

    const componentsToRender = [
        {
            key : 'showStarRating',
            component : <StarRating />
        },
        {
            key : 'showRandomColourGenerator',
            component : <RandomColor />
        },
        {
            key : 'showAccordion',
            component : <Accordion />
        },
        {
            key : 'showLoadMoreData',
            component : <LoadMoreData />
        }
    ]

    function checkEnabledFlags(getCurrentKey) {
        return enabledFlags[getCurrentKey]
    }

    if (loading) return <h1>Loading data! Please wait...</h1>

    return (
        <div className="feature-section">
            <h1>Feature Flags</h1>
            {componentsToRender.map(componentItem => checkEnabledFlags(componentItem.key) ? componentItem.component : null )}
        </div>
    );
}


