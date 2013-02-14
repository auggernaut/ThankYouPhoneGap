remoteStorage.defineModule('semanticcurrency', function (privateClient, publicClient) {

    function getHash(object) {
        var shaObj = new jsSHA(JSON.stringify(object), "TEXT");
        return shaObj.getHash("SHA-384", "HEX");
    }

    function ThankYou(object) {
        this.thankee = object.thankee;
        this.thanker = object.thanker;
        this.reason = object.reason;
        this.tags = object.tags;
    }

    return {
        exports: {
            getThankYous: function () {
                console.log("in getThankYous, calling getAll");
                return privateClient.getAll("thankyous/");
            },
            addThankYou: function (object) {
                console.log("in addThankYou, calling storeObject");
                var ty = new ThankYou(object);
                privateClient.storeObject('thankyou', 'thankyous/' + getHash(ty), ty);
            }
        }
    }
});

remoteStorage.claimAccess('semanticcurrency', 'rw').then(function () {
    remoteStorage.displayWidget('remotestorage-connect');
});
//remoteStorage.getClaimedModuleList());






