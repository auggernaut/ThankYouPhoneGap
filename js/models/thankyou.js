window.ThankYou = Backbone.Model.extend({
    urlRoot: "/thank-yous",
    defaults: {
        id: null,
        thanker: "thanker",
        thankee: "thankee",
        reason: "some reason",
        tags: "tags"
    }
});

window.ThankYouCollection = Backbone.Collection.extend({
    model: ThankYou,
    url: "/thank-yous"
});

window.Profile = Backbone.Model.extend({
    urlRoot: "http://badasses.herokuapp.com/users",
    defaults: {
        id: null,
        username: "betaTester",
        name: "Beta Tester",
        email: "beta@tester.com"
    }
});