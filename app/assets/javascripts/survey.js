function Survey(pages, pageContainer, nextButton, reportUrl, finishSurveyUrl) {
    this.pages = pages;
    this.pageContainer = pageContainer;

    this.pageContainers = [];

    this.nextButton = nextButton;
    this.nextButtonLabel = this.nextButton.find('label');

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
        this.nextButtonHoverEvents();

        this.enablePrevious();

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


            var pageContainerDiv = $('<div></div>')
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

    nextButtonHoverEvents: function () {
        $('body').on('mouseenter', '.nextButton.active', function () {
            $(this).find('label').hide();
        });
        $('body').on('mouseleave', '.nextButton.active', function () {
            $(this).find('label').show();
        });
    },

    addNavigationHandlers: function () {
        $('body').on('click', '.nextButton.active', $.proxy(this.nextStep, this));
        $('body').on('click', '.back-button.active', $.proxy(this.previousStep, this));
    },

    removeNavigationEvents: function () {
        $('body').off('click', '.nextButton.active');
        $('body').off('click', '.back-button.active');
    },

    isValidPageIndex: function (index) {
        if (index < 0) {
            return false;
        }
        if (index >= this.pages.length) {
            return false;
        }
        return true;
    },

    shouldLeaveSurvey: function (index) {
        return index >= this.pages.length;
    },

    scrollToTopOfPageContainer: function () {
        $('html, body').animate({
            scrollTop: $('.page-container').offset().top - 40
        }, 650);
    },

    goToPage: function (index, next) {
        $(this).trigger('surveyPageVisit', {page: index});

        this.currentPage().leavePage(this.shouldLeaveSurvey(index), next);

        if (!this.isValidPageIndex(index)) {
            return;
        }

        this.switchToPage(index);
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
            this.presentBackButton(skipAnimations);
        } else {
            this.scrollToTopOfPageContainer();
            var height = this.currentPageContainer().outerHeight(true);
            $('.page-container').animate({ height: height }, 600);

            previousContainer.fadeOut(300).promise().done(this.proxy(function () {
                this.currentPageContainer().fadeIn(300);
                this.presentBackButton(skipAnimations);
            }));
        }
    },

    nextStep: function () {
        if (!this.currentPage().canAdvance()) {
            return;
        }

        this.goToPage(this.currentPageIndex + 1, true);

        return false;
    },

    previousStep: function () {
        this.goToPage(this.currentPageIndex - 1, false);

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

    presentBackButton: function (skipAnimations) {
        if (skipAnimations) {
            if (this.currentPageIndex != 0) {
                $('.back-button').show();
            } else {
                $('.back-button').hide();
            }
        } else {
            if (this.currentPageIndex != 0) {
                $('.back-button').fadeIn();
            } else {
                $('.back-button').fadeOut();
            }
        }
    },

    setNextLabelHtml: function (html) {
        this.nextButtonLabel.html(html);
    },

    proxy: function (proxied) {
        return $.proxy(proxied, this);
    }
};