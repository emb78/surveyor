function Survey(pages, pageContainer, nextButton, reportUrl) {
    this.pages = pages;
    this.pageContainer = pageContainer;
    this.pageContainers = [];
    this.nextButton = nextButton;
    this.reportUrl = reportUrl;
    this.init();
}

Survey.prototype = {
    init: function () {
        this.currentPageIndex = 0;
        var scrollToTopOfPage = false;

        var page = window.location.hash.substring(1);
        if (page) {
            this.currentPageIndex = parseInt(page);
            scrollToTopOfPage = true;
        }

        this.checkAllPagesForNecessaryMethods();
        this.instantiatePagesToContainers();

        this.addNavigationHandlers();
//        this.enablePrevious();

        this.switchToPage(this.currentPageIndex, true);
        if (scrollToTopOfPage) {
            $('html, body').scrollTop($('.page-container').offset().top - 40);
        }

        window.onhashchange = this.proxy(function () {
            var page = parseInt(window.location.hash.substring(1));
            if (page == this.currentPageIndex) {
                return;
            }
            this.goToPage(page, page > this.currentPageIndex);
        });
    },

    checkObjectForMethod: function (object, method) {
        if (!(typeof object[method] === 'function')) {
            alert(object + " does not have a method named " + method);
        }
    },

    checkAllPagesForNecessaryMethods: function () {
        for (var i = 0; i < this.pages.length; i++) {
            var page = this.pages[i];

            this.checkObjectForMethod(page, 'elements');
            this.checkObjectForMethod(page, 'afterInit');
            this.checkObjectForMethod(page, 'containerClass');
            this.checkObjectForMethod(page, 'prepForDisplay');
            this.checkObjectForMethod(page, 'canAdvance');
            this.checkObjectForMethod(page, 'nextClicked');
        }
    },

    instantiatePagesToContainers: function () {
        for (var i = 0; i < this.pages.length; i++) {
            var page = this.pages[i];
            page.survey = this;

            var pageContainerDiv = $('<div></div>');
            pageContainerDiv.addClass(page.containerClass());
            pageContainerDiv.append(page.elements());
            pageContainerDiv.hide();

            this.pageContainer.append(pageContainerDiv);

            page.afterInit(pageContainerDiv, this);

            this.pageContainers.push(pageContainerDiv);
        }
    },

    currentPage: function () {
        return this.pages[this.currentPageIndex];
    },

    currentPageContainer: function () {
        return this.pageContainers[this.currentPageIndex];
    },

    isLastPage: function (page) {
        return this.pages.indexOf(page) == (this.pages.length - 1);
    },

    addNavigationHandlers: function () {
        $('body').on('click', '.next-button.active', $.proxy(this.nextStep, this))
                 .on('click', '.back-button.active', $.proxy(this.previousStep, this));
    },

    removeNavigationEvents: function () {
        $('body').off('click', '.next-button.active')
                 .off('click', '.back-button.active');
    },

    isValidPageIndex: function (index) {
      return index >= 0 && index < this.pages.length;
    },

    shouldLeaveSurvey: function (index) {
        return index >= this.pages.length;
    },

    scrollToTopOfPageContainer: function () {
        $('html, body').animate({
            scrollTop: $('.page-container').offset().top - 40
        }, 650);
    },

    goToReport: function () {
        window.location = this.reportUrl;
    },

    goToPage: function (index) {
        if (this.shouldLeaveSurvey(index)) {
            this.currentPage().nextClicked(this.proxy(function (){this.goToReport()} ));
        } else if (!this.isValidPageIndex(index)) {
            return;
        } else {
            this.currentPage().nextClicked(this.switchToPage(index));
        }
    },

    switchToPage: function (index, skipAnimations) {
        skipAnimations = skipAnimations || false;

        window.location.hash = index;

        var previousContainer = this.currentPageContainer();
        this.currentPageIndex = index;
        this.currentPage().prepForDisplay(this);

        if (skipAnimations) {
            previousContainer.hide();
            this.currentPageContainer().show();
//            this.presentBackButton();
        } else {
            this.scrollToTopOfPageContainer();
            var height = this.currentPageContainer().outerHeight(true);
            $('.page-container').animate({ height: height }, 600);

            previousContainer.fadeOut(300).promise().done(this.proxy(function () {
                this.currentPageContainer().fadeIn(300);
//                this.presentBackButton();
            }));
        }
    },

    nextStep: function () {
        if (!this.currentPage().canAdvance()) {
            return;
        }

        this.goToPage(this.currentPageIndex + 1);

        return false;
    },

    previousStep: function () {
        this.goToPage(this.currentPageIndex - 1);

        return false;
    },

    enableNextButton: function () {
        this.nextButton.removeClass('inactive').addClass('active');
    },

    disableNextButton: function () {
        this.nextButton.removeClass('active').addClass('inactive');
    },

    enablePrevious: function () {
        $('.back-button').removeClass('inactive').addClass('active');
    },

    disablePrevious: function () {
        $('.back-button').removeClass('active').addClass('inactive');
    },

    presentBackButton: function () {
        if (this.currentPageIndex != 0) {
            $('.back-button').show();
        } else {
            $('.back-button').hide();
        }
    },

    setNextLabelHtml: function (html) {
        this.nextButton.html(html);
    },

    proxy: function (proxied) {
        return $.proxy(proxied, this);
    }
};