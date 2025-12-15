import React from 'react';
import HomeCard from '../../Component/Home card/HomeCard';
import Banner from '../Banner/Banner';
import WhyLearningMatters from '../../Component/why learning/WhyLearningMatters';
const Home = () => {
    return (
        <div>
            <div className='my-5'>
                <Banner></Banner>
            </div>
          <div  className='my-5'>
             <HomeCard></HomeCard>
          </div>
          <div  className='my-5'>
            <WhyLearningMatters></WhyLearningMatters>
          </div>
        </div>
    );
};

export default Home;