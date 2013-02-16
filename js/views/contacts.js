window.ContactsView = Backbone.View.extend({

    events: {
        "keyup .search-key": "search"
    },

    initialize: function () {
        console.log('Initializing ContactsView');
        this.render();
    },

    render: function (data) {
        $(this.el).html(this.template());
        
        this.findContacts();

        return this;
    },

    findContacts: function(){
        var contactFields = ['*'];
        var findOptions = {
            filter: "",
            multiple: true
        };

        navigator.contacts.find(contactFields, this.findContactSuccess, this.findContactFailure, findOptions);
    },

    findContactSuccess: function (contacts) {
        if (contacts.length != 1) {

            _.each(contacts, function (contact) {
                $(this.el).append(new ContactItemView({ model: contact }).render().el);
            }, this);
        }
        else {
            //$('#thankee').val(contacts[0].displayName);
        }
    },

    findContactFailure: function (error) {
        alert("Cannot access the device contact database. " + error);
    },

    search: function (event) {
        var key = $('.search-key').val();
        var results = [];

        var thankyous = this.model.models;

        _.each(thankyous, function (thankyou) {
            if (thankyou.get("thankee").toLowerCase().indexOf(key.toLowerCase()) >= 0) {
                results.push(thankyou);
            }
        });

        $('#myList').html('');
        this.listView = new ThankYouListView({ el: $('#myList', this.el), model: results });
        this.listView.render();

    }

});


window.ContactItemView = Backbone.View.extend({

    render: function () {
        //console.log(this.model.toJSON());
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});


/*   pickContact: function () {
       console.log("chooseContact launched.")
       navigator.contacts.chooseContact(function (id) {
           if (id > 0) {
               var options = new ContactFindOptions();
               options.filter = "" + id;
               navigator.contacts.find(["id", "displayName"], this.findContactSuccess(), this.findContactFailure(), options);
           }
       }, null);
   },
   */
