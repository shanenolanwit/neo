import ajax from 'superagent';
var issueAPI = {
    load : function(iid){
        return  ajax.get('http://localhost:3004/issues/' + iid + "?_embed=comments")
    },
    updateDetail : function(iid,detail){
       return ajax.patch("http://localhost:3004/issues/" + iid)
            .send({"detail": detail})
            .set('Accept', 'application/json')
    },
    updateDescription : function(iid,description){
        return ajax.patch("http://localhost:3004/issues/" + iid)
            .send({"description": description})
            .set('Accept', 'application/json')
    },
    updatePriority : function(issue,inc){
        var newPriority = issue.priority;
        if(issue.priority === "Low"){
            newPriority = ( inc ) ? "Medium" : "Low"
        } else if(issue.priority === "Medium"){
            newPriority = ( inc ) ? "High" : "Low"
        } else if(issue.priority === "High"){
            newPriority = ( inc ) ? "High" : "Medium"
        } else {
            console.log("Unrecognised priority")
        }
        return ajax.patch("http://localhost:3004/issues/" + issue.id)
            .send({"priority": newPriority})
            .set('Accept', 'application/json')
    },
    updateWorkdays : function(issue,inc){
        var orig = parseInt(issue.workdays,10);
        var newWorkdays = inc ?
            orig < 11 ? orig +1 : orig
            : orig > 1 ? orig -1 : orig;

        return ajax.patch("http://localhost:3004/issues/" + issue.id)
            .send({"workdays": newWorkdays})
            .set('Accept', 'application/json')
    },
    updateStatus : function(issue,currentStatus){
        return ajax.patch("http://localhost:3004/issues/" + issue.id)
            .send({"complete": !currentStatus})
            .set('Accept', 'application/json')
    },
    loadComments : function(iid){
      return ajax.get('http://localhost:3004/issues/' + iid + "/comments")
    },
    postComment : function(iid,author,comment) {
        let timestamp = Date.now();
        return ajax.post("http://localhost:3004/issues/" + iid + "/comments")
            .send({ author: author, comment: comment, timestamp: timestamp, upvotes: 0})
            .set('Accept', 'application/json')
    },
    deleteComment : function(id){
        return ajax.delete("http://localhost:3004/comments/" + id)
    },
    upvote : function(iid,currentCount){
        let newCount = (parseInt(currentCount,10) + 1);
        console.log("Increasing upvote count for comment: " + iid + " from " + currentCount + " to " + newCount);
        return ajax.patch("http://localhost:3004/comments/" + iid)
            .send({"upvotes": newCount})
            .set('Accept', 'application/json')
    }
}
export default issueAPI ;
