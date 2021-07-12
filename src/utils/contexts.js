import { createContext, useContext } from 'react';

const topicBtnLayouts = {
    column: {
        layout: 'column-view',
        btn: 'column-view-btn'
    },
    staggered: {
        layout: 'stagger-view',
        btn: 'stagger-view-btn'
    }
}

const TopicBtnLayoutContext = createContext(topicBtnLayouts.column);

const useTopicLayout = () => useContext(TopicBtnLayoutContext);

export { topicBtnLayouts, TopicBtnLayoutContext, useTopicLayout };
