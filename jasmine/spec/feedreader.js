/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/*All tests are placing within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is the first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is the first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has a name and url', function() {
            for (var feed in allFeeds) {
                expect(allFeeds[feed].name).toBeDefined();
                expect(allFeeds[feed].name).not.toBe(0);
                expect(allFeeds[feed].url).toBeDefined();
                expect(allFeeds[feed].url).not.toBe(0);
            }
        });
    });

    /* This is a new test suite named "The menu" */
    describe('the menu', function() {
        /* This is a test that ensures the menu element is
         * hidden by default.
         */
        it ('menu hidden by default', function() {
            expect($("body").attr("class")).toEqual("menu-hidden");
        });
         /* This is a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it ('menu changes when clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').attr('class')).toEqual("");

            $('.menu-icon-link').trigger('click');
            expect($('body').attr('class')).toEqual("menu-hidden");
        });
    });
        
    /* This is a new test suite named "Initial Entries" */
    describe ('Initial entries', function() {
        /* This is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0,done);
        });
        it ('at least one .entry element', function(done) {
            expect($('.feed').find('.entry').length).toBeGreaterThan(1);
            done();
        });
    });
    /* This is a new test suite named "New Feed Selection"*/
    describe ('New Feed Selection', function() {
        /* This is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        beforeEach(function (done) {
            loadFeed(0, function(){
                entry = $('.feed').html();

                loadFeed(1, function() {
                    difEntry = $('.feed').html();
                    done();
                });
            });          
        });
        it ('feed content changes', function() {
            expect(entry).not.toEqual(difEntry);
        });
    });

}());
