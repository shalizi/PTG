angular.module('controllers', [])


.controller('route2Controller', function($scope){


  

  //opening a new window
  //var result = '<table id="resultTable" class="table table-condensed">';

  function outputContacts(){
     window.open("http://www.privatetunnel.com:8080/#/route2");
     
     }

  //gmail contacts api call gets initialized here, the call is coming from appEvents.gmail method
     
  //var clientId = '49332469370-6q9k9cesoielc9o4ga0dlua1mlg8oop8.apps.googleusercontent.com';
  var clientId = '545655750949-vlmigkck3vbhhov659usg0vqqu1fvubv.apps.googleusercontent.com';
  //  clientId = "240967362557-olngusv4tbd89g88ka12dmbt3ujlgsf5.apps.googleusercontent.com"; //  LIVE privatetunnel.com
  //clientId = '240967362557-sns2094qjo0dol0l6ta1ii8p90ps9hma.apps.googleusercontent.com';   // dev4.privatetunnel.com

      
      //var apiKey = 'AIzaSyCS3KgpsKUfPjUuInPp6d75QQYgipNO45I';  
      var apiKey = 'AIzaSyAs8YNLWRczA_oaAh6ZEUER2fCvU9GlmHQ';
          apiKey = "AIzaSyAdjHPT5Pb7Nu56WJ_nlrMGOAgUAtKjiPM"; // FRANK


      var scopes = 'https://www.googleapis.com/auth/contacts.readonly';
      //var scopes = 'https://www.google.com/m8/feeds';

      //checking for local storage support

       
      //-------- beginning of google contacts api call ---------

      function start() {
        gapi.client.setApiKey(apiKey);
        //window.setTimeout(checkAuth,1);
      }

      function checkAuth(){
        gapi.auth.authorize({
          client_id: clientId, 
          scope: scopes, 
          immediate: true}, showToken);
      }


      function showToken(token){
        console.log(token);
        startApiCall(token);  
      }

      $scope.gmailContactsCallStartsHere = function(){
       gapi.auth.authorize({
        client_id: clientId, 
        scope: scopes, 
        immediate: false}, showToken);
      }

      function startApiCall(authResult){

       if (authResult && !authResult.error) {
        $.ajax({
          url: 'https://www.google.com/m8/feeds/contacts/default/full?alt=json&access_token='+authResult.access_token,
          dataType: 'jsonp'
        }).done(function(data) {      //when the call is successful, the response is passed to the callback function
       //data object is returned from api call
       //console.log('data', data);    

       //initializing my variables, setting up contacts object properties
        $scope.contactsArray = [];
        var checkboxID;
        var checkboxStatus;
        var checkboxName;
        var checkboxEmail;

       //I'm creating an array of name & email values.. here I'm using "status" to keep track of all checkboxes when I submit the form

       $scope.displayContacts=[];
       $scope.selectedAll = true;

      for(var i=0; i < data.feed.entry.length; i++){
        boxID = i;
        boxStatus= true;
        boxName = data.feed.entry[i].title.$t;
        boxEmail = data.feed.entry[i].gd$email[0].address;

        $scope.contactsArray.push({ID: boxID, status:boxStatus, name:boxName, email:boxEmail});
      }


      console.log($scope.contactsArray);
    
      $scope.totalContacts=$scope.contactsArray.length;
      $scope.checkedContacts = $scope.contactsArray.length;
      $scope.master=true;

      $scope.checkAll = function(master){
        if(master == true){
          angular.forEach($scope.contactsArray, function(v,i,o){
            v.status = true;
          });

          $scope.checkedContacts = $scope.contactsArray.length;
        }else{
          angular.forEach($scope.contactsArray, function(v,i,o){
            v.status = false;
          });
          $scope.checkedContacts = 0;
        }

       };


    //checking individual checkbox
    $scope.change = function(contact){
      if(contact.status){
        console.log($scope.checkedContacts++);
      }else{
        console.log($scope.checkedContacts--);
      }
    }



    $scope.sendInvite = function(){
      console.log('sendInvite button clicked for submission');
      angular.forEach($scope.contactsArray, function(v,i,o){

        //console.log('v'+v.status);
        if(v.status === true){
          console.log(v.name + " " + v.email);
        }
      
  

      })

    }




      
      });

    }else      
           
      alert("NO AUTH"); 
      }
 
})








