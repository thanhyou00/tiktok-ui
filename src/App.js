import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes/routes';
import DefaultLayout from '~/layouts';

function App() {
    function updateTitle() {
        var videoID = '8rTKxkS5Vss';

        var part = 'snippet,statistics';
        var params = { id: videoID };

        var response = YouTube.Videos.list(part, params);
        var video = response.items[0];
        var videoViewsCount = video.statistics.viewCount;
        var videoLikeCount = video.statistics.likeCount;
        var videoDislikeCount = video.statistics.dislikeCount;
        var videoCommentCount = video.statistics.commentCount;
        var videoTitle =
            'Stacks IT || This video has ' +
            videoViewsCount +
            ' views and ' +
            videoLikeCount +
            ' likes and ' +
            videoDislikeCount +
            ' dislikes and ' +
            videoCommentCount +
            ' comments !';

        video.snippet.title = videoTitle;

        try {
            YouTube.Videos.update(video, part);
        } catch (e) {}
    }
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
