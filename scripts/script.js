(function() {
  $(function() {
    var animateIssueSummary, articleBody, articleBodyOffsetTop, isScrolling, issueNumber, issueSummary, issueSummaryOn, issueSummaryTitle, navbarEl, onScroll, pageHeader, resizeNavbar, shrinkIssueNumber, transformProps, _perc;
    navbarEl = document.querySelector(".navbar");
    articleBody = document.querySelector(".article-body");
    articleBodyOffsetTop = (articleBody ? articleBody.offsetTop : 0);
    isScrolling = false;
    issueSummaryTitle = document.querySelector(".issue-summary-title");
    issueNumber = document.querySelector(".issue-title");
    issueSummary = document.querySelector(".issue-summary");
    issueSummaryOn = false;
    pageHeader = document.querySelector('.cover');
    transformProps = ["webkitTransform", "MozTransform", "msTransform", "transform"];
    animateIssueSummary = function() {
      $(issueSummaryTitle).velocity("transition.slideDownIn", {
        duration: 1000
      });
      return $(issueSummary).find('li').velocity("transition.slideRightIn", {
        stagger: 75,
        duration: 750
      }).delay(100);
    };
    resizeNavbar = function() {
      if (!articleBodyOffsetTop) {
        return;
      }
      if (window.pageYOffset + 30 >= articleBodyOffsetTop) {
        if (!navbarEl.className.match(/sticky/)) {
          navbarEl.className += " sticky";
        }
      } else {
        if (navbarEl.className.match(/sticky/)) {
          navbarEl.className = navbarEl.className.replace(/(?:^|\s)sticky(?!\S)/g, "");
        }
      }
    };
    shrinkIssueNumber = function() {
      var opacity, scale, transform, translateY;
      if (!issueNumber) {
        return;
      }
      scale = 1 - _perc(window.pageYOffset / 3, window.innerHeight) / 100;
      opacity = _perc(window.pageYOffset, window.innerHeight) / 100;
      issueNumber.style["opacity"] = 1 - opacity;
      translateY = Math.floor(window.pageYOffset / 5);
      transform = "translate3d(0, " + translateY + "px,0)";
      issueNumber.style["transform"] = transform;
      if (window.pageYOffset >= window.innerHeight - (window.innerHeight / 2)) {
        if (issueSummaryOn) {
          return;
        }
        animateIssueSummary();
        return issueSummaryOn = true;
      }
    };
    _perc = function(val, max) {
      return (val / max) * 100;
    };
    onScroll = function() {
      if (isScrolling) {
        console.log("scrolling");
        resizeNavbar();
        shrinkIssueNumber();
        isScrolling = false;
      }
      setTimeout(onScroll, 60);
    };
    onScroll();
    window.onscroll = function() {
      isScrolling = true;
    };
    return $("a[href*=#]:not([href=#])").click(function() {
      var target;
      if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") && location.hostname === this.hostname) {
        target = $(this.hash);
        target = (target.length ? target : $("[name=" + this.hash.slice(1) + "]"));
        if (target.length) {
          $("html").velocity("scroll", {
            duration: 1500,
            easing: [40, 10],
            offset: target.offset().top
          });
        }
        return false;
      }
    });
  });

}).call(this);
