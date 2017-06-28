import * as constants from './constants';
const newsStore = constants.ref.child('news');

var newsAPI = {
    postNews : function(author,message,link,linkText) {
        var newKey = newsStore.push().key
        newsStore.push({
            id: newKey,
            author: author,
            message: message,
            link: link,
            link_text: linkText,
            timestamp: constants.timestamp
        })
    }
}
export default newsAPI ;
