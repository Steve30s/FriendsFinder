

var friendsData = require("../data/friendsData");



module.exports = function(app) {
  
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });
  
  app.post("/api/friends", function(req, res) {
    var newFriend = req.body;
    
  	friendsData.push(newFriend); 
  	
  	res.json(friendsData);
  });
};
