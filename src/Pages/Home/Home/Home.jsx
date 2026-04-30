import React from 'react';
import Banner from '../Banner/Banner';
import ExaminoFeatures from '../ExaminoFeatures';
import HowItWorks from '../HowItWorks';
import ExaminoFAQ from '../ExaminoFAQ';
import ExaminoReviews from '../ExaminoReviews';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ExaminoFeatures></ExaminoFeatures>
            <HowItWorks></HowItWorks>
            <ExaminoReviews></ExaminoReviews>
            <ExaminoFAQ></ExaminoFAQ>
        </div>
    );
};

export default Home;