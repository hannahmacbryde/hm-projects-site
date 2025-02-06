const dummyApiResponse = {
    showStarRating: true,
    showRandomColourGenerator: false,
    showAccordion: true,
    showLoadMoreData: false
}

function featureFlagsDataServiceCall() {

    return new Promise((resolve, reject) => {
        if (dummyApiResponse) setTimeout(resolve(dummyApiResponse), 500);
        else reject('Something went wrong! Please try again')
    })
}

export default featureFlagsDataServiceCall;