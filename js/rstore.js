remoteStorage.defineModule('thankyous', function(privateClient, publicClient){

	function nameToKey(name) {
    return name.replace(/\s/, '-');
  }

  return {
    exports: {

      addThankYou: function(name) {
        privateClient.storeObject('thankyous', nameToKey(name), {
          name: name
         });
      },

      publishThankYou: function(name) {
        var key = nameToKey(name);
        var thankyou = privateClient.getObject(key);
        publicClient.storeObject('thankyous', key, thankyou);
      }
    }
  }
});

        remoteStorage.claimAccess('thankyous', 'rw').then(function(){
        	remoteStorage.displayWidget('remotestorage-connect');
        });
        //remoteStorage.getClaimedModuleList());
        





