import ajax from 'superagent';
var sprintAPI = {
    list : function(){
        return ajax.get('http://localhost:3004/sprints' )
    },
    load : function(sid){
      return ajax.get('http://localhost:3004/sprints/' + sid + '?_embed=issues')
    },
    create : function(name,description,start_date,end_date){
        return ajax.post("http://localhost:3004/sprints/")
            .send({name: name, description: description, start_date: start_date, end_date: end_date })
            .set('Accept', 'application/json')
    },
    delete : function(id){
       return ajax.delete("http://localhost:3004/sprints/" + id)
    },
    patchName : function(sid,name){
      return ajax.patch("http://localhost:3004/sprints/" + sid)
          .send({name: name})
          .set('Accept', 'application/json')
    },
    patchDescription : function(sid,description){
        return  ajax.patch("http://localhost:3004/sprints/" + sid)
            .send({description: description})
            .set('Accept', 'application/json')
    },
    listIssues : function(id){
        console.log("http://localhost:3004/issues?sprintId=" + id);
      return ajax.get("http://localhost:3004/issues?sprintId=" + id)
    },
    filterIssues : function(sid,search_term){
       let url = 'http://localhost:3004/issues?sprint=' + sid;
       if(search_term !== ''){
          url += '&q=' + search_term;
       }
       return ajax.get(url)
    },
    addIssue : function(sid,description,priority,workdays){
      return ajax.post("http://localhost:3004/sprints/" + sid + "/issues")
          .send({description: description, priority: priority, workdays: workdays, complete: false})
          .set('Accept', 'application/json')
    },
    deleteIssue : function(iid){
        return ajax.delete("http://localhost:3004/issues/" + iid)
    }
}
export default sprintAPI ;